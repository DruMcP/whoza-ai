import { useState, useEffect } from 'react';
import { taskGenerationService } from '../services/taskGenerationService';

export default function TaskTemplateManager() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState(null);

  const categories = [
    'all',
    'foundational',
    'website',
    'content',
    'citations',
    'reviews',
    'social',
    'technical',
    'listings',
  ];

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const data = await taskGenerationService.getAllTemplates();
      setTemplates(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load templates' });
    } finally {
      setLoading(false);
    }
  };

  const toggleTemplateActive = async (templateId, currentStatus) => {
    try {
      await taskGenerationService.updateTemplate(templateId, {
        is_active: !currentStatus,
      });
      await loadTemplates();
      setMessage({
        type: 'success',
        text: `Template ${!currentStatus ? 'activated' : 'deactivated'}`,
      });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update template' });
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesCategory =
      selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch =
      searchTerm === '' ||
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyBadgeClass = (difficulty) => {
    const map = {
      beginner: 'difficulty-beginner',
      intermediate: 'difficulty-intermediate',
      advanced: 'difficulty-advanced',
    };
    return map[difficulty] || '';
  };

  const getCategoryColor = (category) => {
    const colors = {
      foundational: '#059669',
      website: '#0891b2',
      content: '#7c3aed',
      citations: '#ea580c',
      reviews: '#dc2626',
      social: '#db2777',
      technical: '#4f46e5',
      listings: '#059669',
    };
    return colors[category] || '#6b7280';
  };

  if (loading) {
    return (
      <div className="template-manager-loading">
        <div className="loading-spinner"></div>
        <p>Loading templates...</p>
      </div>
    );
  }

  return (
    <div className="template-manager">
      <div className="template-manager-header">
        <h2>Task Template Library</h2>
        <p className="subtitle">
          Manage AI-powered task templates for personalized user journeys
        </p>
      </div>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
          <button onClick={() => setMessage(null)} className="message-close">
            ×
          </button>
        </div>
      )}

      <div className="template-filters">
        <div className="filter-search">
          <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-categories">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-filter ${
                selectedCategory === category ? 'active' : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="template-stats">
        <div className="stat-card">
          <span className="stat-value">{templates.length}</span>
          <span className="stat-label">Total Templates</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">
            {templates.filter((t) => t.is_active).length}
          </span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">
            {new Set(templates.map((t) => t.category)).size}
          </span>
          <span className="stat-label">Categories</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{filteredTemplates.length}</span>
          <span className="stat-label">Showing</span>
        </div>
      </div>

      <div className="template-list">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="template-card">
            <div className="template-card-header">
              <div className="template-title-section">
                <h3>{template.title}</h3>
                <div className="template-badges">
                  <span
                    className="category-badge"
                    style={{ backgroundColor: getCategoryColor(template.category) }}
                  >
                    {template.category}
                  </span>
                  <span
                    className={`difficulty-badge ${getDifficultyBadgeClass(
                      template.difficulty_level
                    )}`}
                  >
                    {template.difficulty_level}
                  </span>
                  <span className="priority-badge">
                    Priority: {template.priority_score}
                  </span>
                </div>
              </div>
              <div className="template-actions">
                <button
                  className={`toggle-button ${
                    template.is_active ? 'active' : 'inactive'
                  }`}
                  onClick={() =>
                    toggleTemplateActive(template.id, template.is_active)
                  }
                >
                  {template.is_active ? 'Active' : 'Inactive'}
                </button>
              </div>
            </div>

            <p className="template-description">{template.description}</p>

            <div className="template-meta">
              <div className="meta-item">
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{template.estimated_time_minutes} min</span>
              </div>

              {template.prerequisites?.categories?.length > 0 && (
                <div className="meta-item">
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Requires: {template.prerequisites.categories.join(', ')}</span>
                </div>
              )}

              {Object.keys(template.impact_areas || {}).length > 0 && (
                <div className="meta-item">
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  <span>
                    Impact: {Object.keys(template.impact_areas).slice(0, 3).join(', ')}
                  </span>
                </div>
              )}
            </div>

            <details className="template-details">
              <summary>View Template Content</summary>
              <pre className="template-content">{template.template_text}</pre>
            </details>
          </div>
        ))}

        {filteredTemplates.length === 0 && (
          <div className="template-empty">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="48"
              height="48"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p>No templates found</p>
            <span>Try adjusting your filters or search term</span>
          </div>
        )}
      </div>
    </div>
  );
}
