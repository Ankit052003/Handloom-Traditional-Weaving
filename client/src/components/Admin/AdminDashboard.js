import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { articlesAPI, contactAPI } from '../../services/api';
import { useAlert } from '../../context/AlertContext';
import ArticleForm from './ArticleForm';
import ArticleList from './ArticleList';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('articles');
  const [articles, setArticles] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const adminUsername = localStorage.getItem('adminUsername') || 'Admin';

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminUsername');
    navigate('/');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  useEffect(() => {
    if (activeTab === 'articles') {
      fetchArticles();
    } else if (activeTab === 'contacts') {
      fetchContacts();
    }
  }, [activeTab]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await articlesAPI.getAllAdmin();
      setArticles(response.data);
    } catch (error) {
      showAlert('Failed to fetch articles', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await contactAPI.getAll();
      setContacts(response.data);
    } catch (error) {
      showAlert('Failed to fetch contacts', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleArticleCreate = async (articleData) => {
    try {
      await articlesAPI.create(articleData);
      showAlert('Article created successfully!', 'success');
      fetchArticles();
    } catch (error) {
      showAlert('Failed to create article', 'error');
    }
  };

  const handleArticleUpdate = async (id, articleData) => {
    try {
      await articlesAPI.update(id, articleData);
      showAlert('Article updated successfully!', 'success');
      setEditingArticle(null);
      fetchArticles();
    } catch (error) {
      showAlert('Failed to update article', 'error');
    }
  };

  const handleArticleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await articlesAPI.delete(id);
        showAlert('Article deleted successfully!', 'success');
        fetchArticles();
      } catch (error) {
        showAlert('Failed to delete article', 'error');
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div className="header-content">
            <div>
              <h1>Admin Dashboard</h1>
              <p>Manage your handloom website content</p>
            </div>
            <div className="admin-info">
              <span>Welcome, {adminUsername}!</span>
              <button onClick={handleGoHome} className="btn btn-primary home-btn">
                🏠 Home
              </button>
              <button onClick={handleLogout} className="btn btn-secondary logout-btn">
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="dashboard-tabs">
          <button 
            className={`tab ${activeTab === 'articles' ? 'active' : ''}`}
            onClick={() => setActiveTab('articles')}
          >
            Articles ({articles.length})
          </button>
          <button 
            className={`tab ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            Contact Messages ({contacts.length})
          </button>
          <button 
            className={`tab ${activeTab === 'new-article' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('new-article');
              setEditingArticle(null);
            }}
          >
            New Article
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === 'articles' && (
            <ArticleList
              articles={articles}
              loading={loading}
              onEdit={(article) => {
                setEditingArticle(article);
                setActiveTab('new-article');
              }}
              onDelete={handleArticleDelete}
            />
          )}

          {activeTab === 'contacts' && (
            <div className="contacts-section">
              <h2>Contact Messages</h2>
              {loading ? (
                <div>Loading contacts...</div>
              ) : contacts.length === 0 ? (
                <p>No contact messages yet.</p>
              ) : (
                <div className="contacts-list">
                  {contacts.map((contact) => (
                    <div key={contact._id} className="contact-card">
                      <div className="contact-header">
                        <h3>{contact.name}</h3>
                        <span className="contact-date">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="contact-email">{contact.email}</p>
                      <div className="contact-message">{contact.message}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'new-article' && (
            <ArticleForm
              article={editingArticle}
              onSubmit={editingArticle ? 
                (data) => handleArticleUpdate(editingArticle._id, data) :
                handleArticleCreate
              }
              onCancel={() => {
                setEditingArticle(null);
                setActiveTab('articles');
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
