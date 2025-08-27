import React, { useState } from 'react';

const ArticleList = ({ articles, loading, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading articles...</p>
      </div>
    );
  }

  // Filter and sort articles
  const filteredArticles = articles
    .filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (article.tags && article.tags.some(tag => 
                             tag.toLowerCase().includes(searchTerm.toLowerCase())
                           ));
      
      const matchesStatus = filterStatus === 'all' || 
                           (filterStatus === 'published' && article.isPublished) ||
                           (filterStatus === 'draft' && !article.isPublished);
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  if (articles.length === 0) {
    return (
      <div className="no-articles">
        <div className="empty-state-icon">📝</div>
        <h2>No Articles Yet</h2>
        <p>Create your first article to get started sharing knowledge about handloom!</p>
        <div className="empty-state-tips">
          <h4>Article Ideas:</h4>
          <ul>
            <li>Basic weaving techniques</li>
            <li>Traditional patterns and their meanings</li>
            <li>Sustainable practices in handloom</li>
            <li>Tools and equipment guide</li>
          </ul>
        </div>
      </div>
    );
  }

  const publishedCount = articles.filter(a => a.isPublished).length;
  const draftCount = articles.filter(a => !a.isPublished).length;

  return (
    <div className="articles-management">
      <div className="articles-header">
        <h2>Manage Articles</h2>
        <div className="articles-stats">
          <span className="stat-item">
            <strong>{articles.length}</strong> Total
          </span>
          <span className="stat-item published">
            <strong>{publishedCount}</strong> Published
          </span>
          <span className="stat-item draft">
            <strong>{draftCount}</strong> Drafts
          </span>
        </div>
      </div>

      <div className="articles-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search articles by title, content, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-controls">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Articles</option>
            <option value="published">Published Only</option>
            <option value="draft">Drafts Only</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>
      </div>

      {filteredArticles.length === 0 ? (
        <div className="no-results">
          <p>No articles match your search criteria.</p>
        </div>
      ) : (
        <div className="articles-table">
          <table>
            <thead>
              <tr>
                <th>Article Details</th>
                <th>Category</th>
                <th>Words</th>
                <th>Created</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map((article) => (
                <tr key={article._id}>
                  <td>
                    <div className="article-details">
                      <div className="article-title">{article.title}</div>
                      {article.summary && (
                        <div className="article-summary">{article.summary}</div>
                      )}
                      {article.tags && article.tags.length > 0 && (
                        <div className="article-tags">
                          {article.tags.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="category-badge">
                      {article.category || 'General'}
                    </span>
                  </td>
                  <td>
                    <span className="word-count-badge">
                      {article.wordCount || article.content?.split(/\s+/).filter(word => word).length || 0}
                    </span>
                  </td>
                  <td>
                    <div className="date-info">
                      <div className="date-primary">
                        {new Date(article.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="date-time">
                        {new Date(article.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`status ${article.isPublished ? 'published' : 'draft'}`}>
                      {article.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>
                    <div className="article-actions">
                      <button 
                        onClick={() => onEdit(article)}
                        className="btn btn-sm btn-outline"
                        title="Edit article"
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        onClick={() => onDelete(article._id)}
                        className="btn btn-sm btn-danger"
                        title="Delete article"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="articles-footer">
        <p className="results-info">
          Showing {filteredArticles.length} of {articles.length} articles
        </p>
      </div>
    </div>
  );
};

export default ArticleList;
