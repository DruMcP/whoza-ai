import { supabase } from '../lib/supabase';
import { notificationService } from './notificationService';
import { analyticsService } from './analyticsService';
import { ECE_PILLAR_IDS } from '../constants/ecePillars';

export const taskGenerationService = {
  async analyzeBusinessProfile(userId) {
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    const { data: profile } = await supabase
      .from('business_profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    const completenessScore = this.calculateProfileCompleteness(user, profile);
    const skillLevel = this.determineSkillLevel(completenessScore, profile);

    return {
      user,
      profile,
      completenessScore,
      skillLevel,
    };
  },

  calculateProfileCompleteness(user, profile) {
    let score = 0;
    const maxScore = 100;
    const fields = [
      { value: user?.business_name, weight: 10 },
      { value: user?.trade_type, weight: 10 },
      { value: user?.postcode, weight: 5 },
      { value: user?.service_area, weight: 10 },
      { value: user?.email, weight: 5 },
      { value: user?.whatsapp_number, weight: 5 },
      { value: profile?.website_url, weight: 15 },
      { value: profile?.google_business_url, weight: 15 },
      { value: profile?.key_services?.length > 0, weight: 10 },
      { value: profile?.credentials, weight: 10 },
      { value: profile?.competitors?.length > 0, weight: 5 },
    ];

    fields.forEach(field => {
      if (field.value) {
        score += field.weight;
      }
    });

    return Math.min(score, maxScore);
  },

  determineSkillLevel(completenessScore, profile) {
    if (completenessScore < 50 || !profile?.baseline_created) {
      return 'beginner';
    }
    if (completenessScore < 80) {
      return 'intermediate';
    }
    return 'advanced';
  },

  async getOrCreateGenerationState(userId, businessId) {
    let { data: state } = await supabase
      .from('task_generation_state')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (!state) {
      const analysis = await this.analyzeBusinessProfile(userId);

      const { data: newState, error } = await supabase
        .from('task_generation_state')
        .insert({
          user_id: userId,
          business_id: businessId,
          skill_level: analysis.skillLevel,
          profile_completeness_score: analysis.completenessScore,
          completed_categories: {},
          completed_templates: [],
        })
        .select()
        .single();

      if (error) throw error;
      state = newState;
    }

    return state;
  },

  async getCompletedTaskTemplates(userId) {
    const { data: tasks } = await supabase
      .from('tasks')
      .select('id, recommended_action')
      .eq('business_id', (
        await supabase
          .from('business_profiles')
          .select('id')
          .eq('user_id', userId)
          .single()
      ).data?.id)
      .in('status', ['Completed', 'Approved']);

    return tasks || [];
  },

  async selectNextTask(userId) {
    const analysis = await this.analyzeBusinessProfile(userId);
    const state = await this.getOrCreateGenerationState(userId, analysis.profile?.id);
    const completedTemplates = state.completed_templates || [];

    let { data: eligibleTemplates } = await supabase
      .from('task_templates')
      .select('*')
      .eq('is_active', true)
      .order('priority_score', { ascending: false });

    if (!eligibleTemplates || eligibleTemplates.length === 0) {
      return null;
    }

    eligibleTemplates = eligibleTemplates.filter(template => {
      if (completedTemplates.includes(template.id)) {
        return false;
      }

      if (template.difficulty_level === 'advanced' && state.skill_level === 'beginner') {
        return false;
      }

      if (template.difficulty_level === 'intermediate' && state.skill_level === 'beginner') {
        const hasFoundational = completedTemplates.some(id => {
          const t = eligibleTemplates.find(et => et.id === id);
          return t?.category === 'foundational';
        });
        if (!hasFoundational) return false;
      }

      const prereqs = template.prerequisites || { categories: [], templates: [] };
      if (prereqs.categories && prereqs.categories.length > 0) {
        const completedCategories = Object.keys(state.completed_categories || {});
        const hasAllCategoryPrereqs = prereqs.categories.every(cat =>
          completedCategories.includes(cat)
        );
        if (!hasAllCategoryPrereqs) return false;
      }

      return true;
    });

    if (eligibleTemplates.length === 0) {
      return null;
    }

    let selectedTemplate = eligibleTemplates[0];

    const foundationalTasks = eligibleTemplates.filter(t => t.category === 'foundational');
    if (foundationalTasks.length > 0 && state.profile_completeness_score < 70) {
      selectedTemplate = foundationalTasks[0];
    }

    return selectedTemplate;
  },

  customizeTaskContent(template, user, profile) {
    let customizedText = template.template_text;
    let customizedTitle = template.title;

    const placeholders = {
      '{business_name}': user?.business_name || '[Your Business Name]',
      '{trade_type}': user?.trade_type || '[Your Trade Type]',
      '{service_area}': user?.service_area || '[Your Service Area]',
      '{postcode}': user?.postcode || '[Your Postcode]',
      '{website_url}': profile?.website_url || '[Your Website]',
      '{phone}': user?.whatsapp_number || '[Your Phone]',
      '{google_business_url}': profile?.google_business_url || '[Your Google Business URL]',
    };

    Object.entries(placeholders).forEach(([placeholder, value]) => {
      customizedText = customizedText.replaceAll(placeholder, value);
      customizedTitle = customizedTitle.replaceAll(placeholder, value);
    });

    return {
      ...template,
      title: customizedTitle,
      recommended_action: customizedTitle,
      copy_paste_text: customizedText,
    };
  },

  async generateNextTask(userId) {
    const analysis = await this.analyzeBusinessProfile(userId);

    if (!analysis.profile) {
      throw new Error('Business profile not found');
    }

    const template = await this.selectNextTask(userId);

    if (!template) {
      return null;
    }

    const customizedTask = this.customizeTaskContent(template, analysis.user, analysis.profile);

    const { data: newTask, error } = await supabase
      .from('tasks')
      .insert({
        business_id: analysis.profile.id,
        status: 'Sent',
        delivery_channel: analysis.user.whatsapp_number ? 'WhatsApp' : 'Email',
        recommended_action: customizedTask.recommended_action,
        copy_paste_text: customizedTask.copy_paste_text,
        ece_pillar: template.ece_pillar,
        sent_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    await supabase
      .from('task_generation_log')
      .insert({
        user_id: userId,
        task_id: newTask.id,
        template_id: template.id,
        generation_reason: `Selected based on ${analysis.skillLevel} skill level and ${analysis.completenessScore}% profile completeness`,
        priority_score: template.priority_score,
      });

    const state = await this.getOrCreateGenerationState(userId, analysis.profile.id);
    await supabase
      .from('task_generation_state')
      .update({
        last_task_generated_at: new Date().toISOString(),
        next_task_priority: template.category,
      })
      .eq('id', state.id);

    try {
      await notificationService.sendWeeklyTask({
        userId,
        taskId: newTask.id,
        taskTitle: customizedTask.recommended_action,
        taskDescription: template.description || customizedTask.recommended_action,
        recommendedAction: customizedTask.recommended_action,
        copyPasteText: customizedTask.copy_paste_text,
      });
    } catch (notificationError) {
      // TODO: Review error handling: console.error('Failed to send task notification:', notificationError)
    }

    return newTask;
  },

  async markTaskCompleted(taskId, userId) {
    const { data: task } = await supabase
      .from('tasks')
      .select('*, business_id')
      .eq('id', taskId)
      .single();

    if (!task) {
      throw new Error('Task not found');
    }

    const { data: log } = await supabase
      .from('task_generation_log')
      .select('template_id')
      .eq('task_id', taskId)
      .maybeSingle();

    if (log?.template_id) {
      const state = await this.getOrCreateGenerationState(userId, task.business_id);

      const updatedTemplates = [...(state.completed_templates || []), log.template_id];

      const { data: template } = await supabase
        .from('task_templates')
        .select('category')
        .eq('id', log.template_id)
        .single();

      const completedCategories = state.completed_categories || {};
      if (template?.category) {
        completedCategories[template.category] = (completedCategories[template.category] || 0) + 1;
      }

      await supabase
        .from('task_generation_state')
        .update({
          completed_templates: updatedTemplates,
          completed_categories: completedCategories,
        })
        .eq('id', state.id);
    }

    await supabase
      .from('tasks')
      .update({
        status: 'Completed',
        completed_at: new Date().toISOString(),
      })
      .eq('id', taskId);

    try {
      await analyticsService.trackTaskCompleted(userId, task.business_id, {
        task_id: taskId,
        template_id: log?.template_id,
        completion_time: new Date().toISOString(),
      });
    } catch (error) {
      // TODO: Review error handling: console.error('Failed to track task completion:', error)
    }

    return task;
  },

  async getAllTemplates() {
    const { data, error } = await supabase
      .from('task_templates')
      .select('*')
      .order('category')
      .order('priority_score', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async updateTemplate(templateId, updates) {
    const { data, error } = await supabase
      .from('task_templates')
      .update(updates)
      .eq('id', templateId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async createTemplate(template) {
    const { data, error } = await supabase
      .from('task_templates')
      .insert(template)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteTemplate(templateId) {
    const { error } = await supabase
      .from('task_templates')
      .delete()
      .eq('id', templateId);

    if (error) throw error;
    return true;
  },

  getCategoryPillarMapping(category) {
    const categoryToPillar = {
      'foundational': ECE_PILLAR_IDS.CLARITY,
      'website': ECE_PILLAR_IDS.CLARITY,
      'content': ECE_PILLAR_IDS.ANSWERABILITY,
      'citations': ECE_PILLAR_IDS.CONSENSUS,
      'reviews': ECE_PILLAR_IDS.CONSENSUS,
      'social': ECE_PILLAR_IDS.CONTEXT,
      'technical': ECE_PILLAR_IDS.SAFETY,
      'listings': ECE_PILLAR_IDS.CONSENSUS,
    };

    return categoryToPillar[category] || null;
  },
};
