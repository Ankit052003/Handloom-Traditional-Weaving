import React, { useState, useEffect } from 'react';
import { articlesAPI } from '../services/api';
import Loading from '../components/Common/Loading';
import './Articles.css';

// Sample articles data for formal presentation
const sampleArticles = [
  {
    _id: '1',
    title: 'The Timeless Art of Handloom Weaving',
    author: 'Heritage Research Team',
    content: 'Explore the origins of handloom weaving in India and how artisans preserve age-old traditions. This comprehensive study delves into the historical significance of handloom weaving, tracing its roots back to ancient civilizations and examining how traditional techniques have been passed down through generations. From the earliest archaeological evidence to contemporary practices, we explore how this timeless craft continues to thrive in modern times.',
    createdAt: '2025-01-15',
    tags: ['History', 'Tradition', 'Heritage', 'Indian Textiles'],
    category: 'Historical Research'
  },
  {
    _id: '2',
    title: 'From Threads to Fabric: The Journey of Handloom Cloth',
    author: 'Dr. Textile Sciences',
    content: 'An inside look at how simple threads are transformed into beautiful, durable fabrics. This detailed examination covers the entire process of handloom weaving, from the preparation of raw materials to the final finished product. We explore the intricate techniques, tools, and skills required to create handloom textiles, highlighting the precision and artistry involved in each step of the manufacturing process.',
    createdAt: '2025-01-20',
    tags: ['Process', 'Techniques', 'Craftsmanship', 'Production'],
    category: 'Technical Studies'
  },
  {
    _id: '3',
    title: 'Why Handloom is More Sustainable than Fast Fashion',
    author: 'Sustainability Research Institute',
    content: 'Learn how choosing handloom supports eco-friendly practices and empowers rural artisans. This research paper analyzes the environmental impact of handloom production compared to industrial manufacturing, examining carbon footprints, water usage, chemical processes, and waste generation. We also explore the socio-economic benefits of supporting handloom industries and their role in sustainable development.',
    createdAt: '2025-01-25',
    tags: ['Sustainability', 'Environment', 'Ethics', 'Rural Development'],
    category: 'Environmental Research'
  },
  {
    _id: '4',
    title: 'Stories of the Loom: Meet the Weavers Behind the Craft',
    author: 'Cultural Documentation Team',
    content: 'Personal stories of artisans, their challenges, and their passion for weaving. This ethnographic study presents intimate portraits of master weavers and their families, documenting their daily lives, traditional knowledge, economic challenges, and unwavering dedication to preserving their craft. Through these personal narratives, we gain insight into the human dimension of handloom weaving.',
    createdAt: '2025-02-01',
    tags: ['Artisans', 'Personal Stories', 'Culture', 'Community'],
    category: 'Cultural Studies'
  },
  {
    _id: '5',
    title: 'A Beginner\'s Guide to Handloom Fabrics',
    author: 'Textile Education Center',
    content: 'Understand the difference between Khadi, Ikat, and other popular handloom styles. This comprehensive guide provides detailed information about various handloom techniques, regional specialties, fiber types, and distinctive characteristics of different weaving traditions. Perfect for newcomers to handloom textiles, this resource covers everything from basic terminology to advanced pattern recognition.',
    createdAt: '2025-02-05',
    tags: ['Education', 'Types', 'Beginner Guide', 'Textile Knowledge'],
    category: 'Educational Resources'
  },
  {
    _id: '6',
    title: 'Modern Designs with Traditional Handloom',
    author: 'Contemporary Design Research',
    content: 'How today\'s designers are blending traditional weaving with contemporary fashion. This study examines the intersection of heritage crafts and modern design, showcasing innovative approaches that respect traditional techniques while meeting contemporary aesthetic and functional requirements. We explore case studies of successful collaborations between designers and artisan communities.',
    createdAt: '2025-02-10',
    tags: ['Modern Design', 'Innovation', 'Fashion', 'Collaboration'],
    category: 'Design Research'
  }
];

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await articlesAPI.getAll();
        if (response.data) {
          // Handle new API response format
          const articlesData = response.data.articles || response.data;
          if (articlesData && articlesData.length > 0) {
            setArticles(articlesData);
          } else {
            // Use sample articles if no API data available
            setArticles(sampleArticles);
          }
        } else {
          setArticles(sampleArticles);
        }
      } catch (error) {
        console.log('API not available, using sample articles');
        // Fallback to sample articles if API fails
        setArticles(sampleArticles);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="page-wrapper">
      <div className="articles-page">
        <div className="container">
          <div className="articles-header">
            <h1>Research Articles & Insights</h1>
            <p>Comprehensive studies and documentation on handloom weaving heritage, techniques, and contemporary relevance</p>
          </div>

          <div className="articles-grid">
            {articles.map((article) => (
              <article key={article._id} className="article-card">
                <div className="article-content">
                  <div className="article-category">{article.category}</div>
                  <h2>{article.title}</h2>
                  <div className="article-meta">
                    <span className="author">By {article.author}</span>
                    <span className="date">
                      {new Date(article.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="article-excerpt">
                    {article.content.length > 250 
                      ? `${article.content.substring(0, 250)}...` 
                      : article.content
                    }
                  </div>
                  {article.tags && article.tags.length > 0 && (
                    <div className="article-tags">
                      {article.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className="read-more">
                    <button className="read-more-btn">Read Full Article</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
