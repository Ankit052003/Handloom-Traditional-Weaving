import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        {/* Header Section */}
        <div className="about-header">
          <h1>History & Importance of Handloom Weaving</h1>
          <p className="subtitle">A journey through time exploring the rich heritage of traditional textile crafts</p>
        </div>

        {/* Main Content Grid */}
        <div className="content-grid">
          {/* Left Column - Historical Significance */}
          <div className="content-column">
            <section className="content-section">
              <h2>Historical Significance</h2>
              <p>
                Handloom weaving dates back to ancient civilizations, with evidence of textile production 
                found in archaeological sites across the globe. In India, the tradition spans over 5,000 years, 
                making it one of the world's oldest industries.
              </p>
              <p>
                The craft has been the backbone of rural economies, providing employment to millions 
                while preserving cultural identities and traditional knowledge systems.
              </p>
              
              <div className="subsection">
                <div className="subsection-icon">🏛️</div>
                <h3>Ancient Weaving Heritage</h3>
                <h4>Evolution Through Ages</h4>
                
                <div className="period-list">
                  <div className="period-item">
                    <strong>Ancient Period (3000 BCE - 500 CE)</strong>
                    <p>Basic looms and natural fibers - cotton, silk, and</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Middle Column - Why Handloom Matters Today */}
          <div className="content-column">
            <section className="content-section">
              <h2>Why Handloom Matters Today</h2>
              
              <div className="impact-item">
                <div className="impact-icon">💰</div>
                <h3>Economic Impact</h3>
                <p>
                  Provides livelihood to over 43 million people worldwide, supporting rural economies 
                  and preserving traditional skills.
                </p>
              </div>

              <div className="impact-item">
                <div className="impact-icon">🌍</div>
                <h3>Environmental Benefits</h3>
                <p>
                  Sustainable production with minimal carbon footprint, using natural materials 
                  and eco-friendly processes.
                </p>
              </div>

              <div className="impact-item">
                <div className="impact-icon">🎭</div>
                <h3>Cultural Preservation</h3>
              </div>
            </section>
          </div>

          {/* Right Column - Contemporary Relevance */}
          <div className="content-column">
            <section className="content-section">
              <h2>Contemporary Relevance</h2>
              <p>
                In today's fast-fashion world, handloom textiles represent a return to sustainable, 
                ethical fashion. They offer consumers authentic, high-quality products while 
                supporting artisan communities globally.
              </p>
              
              <div className="quote-section">
                <blockquote>
                  "Handloom is not just a craft; it's a way of life that connects us to our roots 
                  while paving the way for a sustainable future."
                </blockquote>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
