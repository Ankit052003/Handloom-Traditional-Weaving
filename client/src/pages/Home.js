import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articlesAPI } from '../services/api';
import homeImage from '../assets/home1.jpg';
import './Home.css';

const Home = () => {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedArticles = async () => {
      try {
        const response = await articlesAPI.getAll({ limit: 3 });
        const articlesData = response.data.articles || response.data || [];
        setFeaturedArticles(articlesData.slice(0, 3)); // Show only first 3
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedArticles();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section 
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 41, 59, 0.7), rgba(30, 41, 59, 0.5)), url(${homeImage})`
        }}
      >
        <div className="hero-content">
          <h1>Welcome to the World of Handloom & Traditional Weaving</h1>
          <p className="hero-subtitle">
            Discover the rich heritage and artistry of traditional textile crafts
          </p>
          <div className="hero-buttons">
            <Link to="/about" className="btn btn-primary">
              Learn More
            </Link>
            <Link to="/articles" className="btn btn-secondary">
              Read Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="intro-section">
        <div className="container">
          <div className="intro-content">
            <h2>Preserving Ancient Traditions</h2>
            <p>
              Handloom weaving represents one of humanity's oldest and most cherished crafts. 
              From the intricate patterns of Indian khadi to the vibrant textiles of various 
              cultures worldwide, traditional weaving techniques continue to thrive and inspire.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why Handloom Matters</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Artisan Craftsmanship</h3>
              <p>Every thread tells a story of skilled hands and generations of knowledge.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>Sustainable Fashion</h3>
              <p>Eco-friendly processes that respect both tradition and environment.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🏛️</div>
              <h3>Cultural Heritage</h3>
              <p>Preserving the techniques and patterns passed down through centuries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      {!loading && featuredArticles.length > 0 && (
        <section className="featured-articles">
          <div className="container">
            <h2>Latest Articles</h2>
            <div className="articles-grid">
              {featuredArticles.map((article) => (
                <div key={article._id} className="article-card">
                  <div className="article-content">
                    <h3>{article.title}</h3>
                    <p>{article.content.substring(0, 150)}...</p>
                    <div className="article-meta">
                      <span>By {article.author}</span>
                      <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="articles-footer">
              <Link to="/articles" className="btn btn-outline">
                View All Articles
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Join Our Community</h2>
            <p>Connect with fellow handloom enthusiasts and artisans worldwide</p>
            <Link to="/contact" className="btn btn-primary">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
