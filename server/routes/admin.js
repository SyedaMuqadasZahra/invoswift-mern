const express = require('express');
const {
  addBlog,
  uploadBlogImage,
  allBlogs,
  deleteBlog,
  blogById,
  updateBlogStatus,
  updateBlog,
  addPage,
  allPages,
  deletePage,
  pageById,
  updatePageStatus,
  updatePage,
} = require('../admin/controllers/admin.controller');

const router = express.Router();

router.post('/add-blog', uploadBlogImage.single('image'), addBlog);
router.post('/all-blogs', allBlogs);
router.post('/delete-blog', deleteBlog);
router.post('/blog-by-id', blogById);
router.post('/update-blog-status', updateBlogStatus);
router.post('/update-blog', uploadBlogImage.single('image'), updateBlog);

router.post('/add-page', addPage);
router.post('/all-pages', allPages);
router.post('/delete-page', deletePage);
router.post('/page-by-id', pageById);
router.post('/update-page-status', updatePageStatus);
router.post('/update-page', updatePage);

module.exports = router;
