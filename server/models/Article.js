const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  summary: {
    type: String,
    trim: true,
    maxlength: 200
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  category: {
    type: String,
    enum: ['handloom', 'traditional', 'modern', 'cultural', 'sustainable', 'tutorial'],
    default: 'handloom'
  },
  wordCount: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Add index for better search performance
ArticleSchema.index({ title: 'text', content: 'text', tags: 'text' });
ArticleSchema.index({ category: 1, isPublished: 1 });
ArticleSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Article', ArticleSchema);
