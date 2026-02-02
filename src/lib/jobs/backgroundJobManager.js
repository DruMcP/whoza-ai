import { supabase } from '../supabase';

export const JOB_TYPES = {
  VISIBILITY_CHECK: 'visibility_check',
  TASK_GENERATION: 'task_generation',
  DATA_SYNC: 'data_sync',
  SCORE_CALCULATION: 'score_calculation',
};

export const JOB_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

export async function createJob({
  jobType,
  userId,
  businessId,
  params = {},
  priority = 5,
  scheduledAt = null,
}) {
  try {
    const { data, error } = await supabase
      .from('background_jobs')
      .insert({
        job_type: jobType,
        user_id: userId,
        business_id: businessId,
        params,
        priority,
        scheduled_at: scheduledAt || new Date().toISOString(),
        status: JOB_STATUS.PENDING,
      })
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function scheduleVisibilityCheck(businessId, userId, queryType = 'general', delayMinutes = 0) {
  const scheduledAt = new Date();
  scheduledAt.setMinutes(scheduledAt.getMinutes() + delayMinutes);

  return createJob({
    jobType: JOB_TYPES.VISIBILITY_CHECK,
    userId,
    businessId,
    params: { queryType },
    priority: 7,
    scheduledAt: scheduledAt.toISOString(),
  });
}

export async function updateJobStatus(jobId, status, result = null, error = null) {
  try {
    const updates = {
      status,
    };

    if (status === JOB_STATUS.PROCESSING) {
      updates.started_at = new Date().toISOString();
    }

    if (status === JOB_STATUS.COMPLETED) {
      updates.completed_at = new Date().toISOString();
      if (result) {
        updates.result = result;
      }
    }

    if (status === JOB_STATUS.FAILED) {
      updates.completed_at = new Date().toISOString();
      if (error) {
        updates.error = typeof error === 'string' ? error : error.message;
      }
    }

    const { data, updateError } = await supabase
      .from('background_jobs')
      .update(updates)
      .eq('id', jobId)
      .select()
      .single();

    if (updateError) throw updateError;

    return data;
  } catch (error) {
    throw error;
  }
}
