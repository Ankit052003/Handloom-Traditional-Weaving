const express = require('express');
const Article = require('../models/Article');

const router = express.Router();

// @route   GET /api/articles
// @desc    Get all published articles (with optional search and filter)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { search, category, limit = 10, page = 1 } = req.query;
    
    let query = { isPublished: true };
    
    // Add search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    // Add category filter
    if (category && category !== 'all') {
      query.category = category;
    }
    
    const articles = await Article.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .select('title content summary author category wordCount createdAt tags');
    
    const total = await Article.countDocuments(query);
    
    res.json({
      articles,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total
      }
    });
  } catch (error) {
    console.error('Get articles error:', error);
    res.status(500).json({ message: 'Server error while fetching articles' });
  }
});

// @route   GET /api/articles/admin
// @desc    Get all articles for admin (including drafts)
// @access  Private (Admin)
router.get('/admin/all', async (req, res) => {
  try {
    const { search, status, category, sort = 'newest' } = req.query;
    
    let query = {};
    
    // Add search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    // Add status filter
    if (status === 'published') {
      query.isPublished = true;
    } else if (status === 'draft') {
      query.isPublished = false;
    }
    
    // Add category filter
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Define sort options
    let sortOptions = {};
    switch (sort) {
      case 'oldest':
        sortOptions = { createdAt: 1 };
        break;
      case 'title':
        sortOptions = { title: 1 };
        break;
      case 'newest':
      default:
        sortOptions = { createdAt: -1 };
    }
    
    const articles = await Article.find(query)
      .sort(sortOptions)
      .select('title content summary author category wordCount isPublished createdAt updatedAt tags');
    
    res.json(articles);
  } catch (error) {
    console.error('Get admin articles error:', error);
    res.status(500).json({ message: 'Server error while fetching articles' });
  }
});

// @route   GET /api/articles/stats/dashboard
// @desc    Get article statistics for admin dashboard
// @access  Private (Admin)
router.get('/stats/dashboard', async (req, res) => {
  try {
    const totalArticles = await Article.countDocuments();
    const publishedArticles = await Article.countDocuments({ isPublished: true });
    const draftArticles = await Article.countDocuments({ isPublished: false });
    
    const categoryStats = await Article.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    const recentArticles = await Article.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title isPublished createdAt wordCount');
    
    res.json({
      total: totalArticles,
      published: publishedArticles,
      drafts: draftArticles,
      categories: categoryStats,
      recent: recentArticles
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ message: 'Server error while fetching statistics' });
  }
});

// @route   GET /api/articles/:id
// @desc    Get single article
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    console.error('Get article error:', error);
    res.status(500).json({ message: 'Server error while fetching article' });
  }
});

// @route   POST /api/articles
// @desc    Create new article (Admin only)
// @access  Private (Admin)
router.post('/', async (req, res) => {
  try {
    const { title, content, summary, category, tags, isPublished } = req.body;

    // Calculate word count
    const wordCount = content ? content.split(/\s+/).filter(word => word).length : 0;

    const article = new Article({
      title,
      content,
      summary,
      category: category || 'handloom',
      wordCount,
      author: 'Admin',
      tags: tags || [],
      isPublished: isPublished !== undefined ? isPublished : true
    });

    await article.save();

    res.status(201).json({
      message: 'Article created successfully',
      article
    });
  } catch (error) {
    console.error('Create article error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error',
        errors: Object.values(error.errors).map(e => e.message)
      });
    }
    res.status(500).json({ message: 'Server error while creating article' });
  }
});

// @route   PUT /api/articles/:id
// @desc    Update article (Admin only)
// @access  Private (Admin)
router.put('/:id', async (req, res) => {
  try {
    const { title, content, summary, category, tags, isPublished } = req.body;

    let article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Update fields
    if (title !== undefined) article.title = title;
    if (content !== undefined) {
      article.content = content;
      article.wordCount = content.split(/\s+/).filter(word => word).length;
    }
    if (summary !== undefined) article.summary = summary;
    if (category !== undefined) article.category = category;
    if (tags !== undefined) article.tags = tags;
    if (isPublished !== undefined) article.isPublished = isPublished;
    
    article.updatedAt = Date.now();

    await article.save();

    res.json({
      message: 'Article updated successfully',
      article
    });
  } catch (error) {
    console.error('Update article error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error',
        errors: Object.values(error.errors).map(e => e.message)
      });
    }
    res.status(500).json({ message: 'Server error while updating article' });
  }
});

// @route   DELETE /api/articles/:id
// @desc    Delete article (Admin only)
// @access  Private (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    await Article.findByIdAndDelete(req.params.id);

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({ message: 'Server error while deleting article' });
  }
});

module.exports = router;
