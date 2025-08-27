import React, { useState, useEffect } from 'react';

const ArticleForm = ({ article, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    isPublished: true,
    category: 'handloom',
    summary: '',
  });
  const [loading, setLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'handloom', label: 'Handloom Techniques' },
    { value: 'traditional', label: 'Traditional Weaving' },
    { value: 'modern', label: 'Modern Applications' },
    { value: 'cultural', label: 'Cultural Heritage' },
    { value: 'sustainable', label: 'Sustainable Fashion' },
    { value: 'tutorial', label: 'Tutorial & Tips' },
  ];

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || '',
        content: article.content || '',
        tags: article.tags ? article.tags.join(', ') : '',
        isPublished: article.isPublished !== undefined ? article.isPublished : true,
        category: article.category || 'handloom',
        summary: article.summary || '',
      });
      setWordCount(article.content ? article.content.split(/\s+/).filter(word => word).length : 0);
    }
  }, [article]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue,
    });

    // Update word count for content
    if (name === 'content') {
      const words = value.split(/\s+/).filter(word => word);
      setWordCount(words.length);
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters long';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (wordCount < 10) {
      newErrors.content = 'Content must be at least 10 words long';
    } else if (wordCount > 500) {
      newErrors.content = 'Content should be under 500 words for short articles';
    }

    if (!formData.summary.trim()) {
      newErrors.summary = 'Summary is required';
    } else if (formData.summary.length < 20) {
      newErrors.summary = 'Summary must be at least 20 characters long';
    } else if (formData.summary.length > 200) {
      newErrors.summary = 'Summary must be under 200 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const submitData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      wordCount: wordCount,
    };

    try {
      await onSubmit(submitData);
      if (!article) {
        setFormData({ 
          title: '', 
          content: '', 
          tags: '', 
          isPublished: true, 
          category: 'handloom',
          summary: '',
        });
        setWordCount(0);
      }
    } finally {
      setLoading(false);
    }
  };

  const generateSummary = () => {
    if (formData.content.length > 0) {
      const sentences = formData.content.split('.').filter(sentence => sentence.trim());
      const firstSentence = sentences[0] ? sentences[0].trim() + '.' : '';
      const summary = firstSentence.length > 200 ? 
        firstSentence.substring(0, 197) + '...' : 
        firstSentence;
      
      setFormData({
        ...formData,
        summary: summary,
      });
    }
  };

  return (
    <div className="article-form-section">
      <div className="form-header">
        <h2>{article ? 'Edit Article' : 'Create New Short Article'}</h2>
        <p className="form-subtitle">
          {article ? 'Update your article content' : 'Share knowledge about handloom and traditional weaving'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="article-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Article Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter an engaging title"
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="summary">
            Article Summary * 
            <span className="char-count">({formData.summary.length}/200)</span>
          </label>
          <div className="summary-input-group">
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              required
              placeholder="Write a brief summary that will appear in article previews..."
              rows="3"
              maxLength="200"
              className={errors.summary ? 'error' : ''}
            ></textarea>
            <button 
              type="button" 
              className="btn btn-sm btn-outline auto-summary-btn"
              onClick={generateSummary}
              disabled={!formData.content}
            >
              Auto-generate
            </button>
          </div>
          {errors.summary && <span className="error-message">{errors.summary}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="content">
            Article Content * 
            <span className="word-count">
              ({wordCount} words - ideal: 50-300 words)
            </span>
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            placeholder="Write your article content here. Keep it concise and informative for better engagement..."
            rows="12"
            className={errors.content ? 'error' : ''}
          ></textarea>
          {errors.content && <span className="error-message">{errors.content}</span>}
          <div className="content-tips">
            <small>
              💡 <strong>Tips:</strong> Use short paragraphs, include specific examples, 
              and focus on practical insights about handloom techniques.
            </small>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g., handloom, weaving, traditional, cotton"
            />
            <small className="help-text">
              Add relevant tags to help readers discover your article
            </small>
          </div>

          <div className="form-group">
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                />
                <span className="checkbox-label">
                  {formData.isPublished ? 'Publish immediately' : 'Save as draft'}
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                {article ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              article ? 'Update Article' : 'Create Article'
            )}
          </button>
          
          {onCancel && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;
