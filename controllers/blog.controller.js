const Blog = require('../models/blog.model');

// Create Blog
exports.create = async (req, res) => {
  try {
    // Validate Body
    if (!req.body) {
      return res.status(400).json({
        message: 'Enter required fileds.'
      });
    };

    const blog = await new Blog({
      title: req.body.title,
      description: req.body.description
    })
    let blogSaved = await blog.save();
    return res.status(201).json({
      message: 'Your Blog is Saved !',
      blogSaved
    })
  }
  catch (error) {
    res.status(401).json({
      message: 'Error at Create Blog !',
      error: error
    });
  }
};

// Find All Blogs
exports.findAll = async (req, res) => {
  try {
    let allBlog = await Blog.find();
    if (allBlog) {
      return res.status(201).json({
        message: 'Found All Blogs !',
        allBlog,
      })
    }
  }
  catch (error) {
    res.status(401).json({
      message: 'Error at Find All Blog !', error
    });
  }
};

// Edit Blog
exports.edit = async (req, res) => {
  try {
    // Validate Body
    if (!req.body) {
      return res.status(400).json({
        message: 'Enter required fileds.'
      });
    }
    else {
      const update = await Blog.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          description: req.body.description
        }
      );
      if (update) {
        return res.status(200).json({
          message: 'Blog Updated Successfully !'
        })
      }
      else {
        return res.status(400).json({
          message: 'Blog Not Found !'
        })
      }
    }
  }
  catch (error) {
    res.status(401).json({
      message: 'Error at Edit Blog !', error
    });
  }
};

// Delete Blog
exports.delete = async (req, res) => {
  try {
    if (await Blog.findByIdAndDelete(req.params.id)) {
      return res.status(200).json({
        message: 'Blog Deleted Successfully !'
      })
    }
    else {
      return res.status(200).json({
        message: 'Blog Not Found !'
      })
    }
  }
  catch (error) {
    res.status(401).json({
      message: 'Error at Deleting Blog !', error
    });
  }
};

