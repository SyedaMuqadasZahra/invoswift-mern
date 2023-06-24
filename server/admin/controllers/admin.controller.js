const { Op } = require('sequelize');
const multer = require('multer');
const fs = require('fs');
const { Blogs, Pages } = require('../../models');
const { verifyBodyParams, generateSlug } = require('../helpers');

const blogImgStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${__dirname}/../uploads/blog`);
  },
  filename(req, file, cb) {
    const ext = file.originalname.split('.');
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `blog-image-${uniqueSuffix}.${ext[ext.length - 1]}`);
  },
});

const uploadBlogImage = multer({ storage: blogImgStorage });

const removeFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, () => {});
  }
};

const addBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const paramsToVerify = ['title', 'description'];
    const areParamsMissing = verifyBodyParams(paramsToVerify, req.body);
    if (areParamsMissing.error) {
      removeFile(`${__dirname}/../uploads/blog/${req?.file?.filename}`);
      return res.status(400).send(areParamsMissing);
    }

    if (!req?.file?.filename) {
      return res.status(400).send({ message: 'Blogs image is required.' });
    }

    const check = await Blogs.findOne({ where: { title } });
    if (check) {
      removeFile(`${__dirname}/../uploads/blog/${req?.file?.filename}`);
      return res.status(400).send({ message: 'Blogs title is already exist.' });
    }

    const blog = await Blogs.create({
      title,
      slug: generateSlug(title),
      description,
      image: req.file.filename,
      status: 1,
    });
    if (blog) {
      const data = blog.dataValues;
      return res.status(200).send({
        message: 'Blogs created successfully.',
        data: {
          ...data,
          image: `${process.env.SERVER_URL}/admin/uploads/blog/${data.image}`,
        },
      });
    }
    return res
      .status(400)
      .send({ message: 'Error while creating the blog.', data: {} });
  } catch (error) {
    return res.status(400).send({ message: 'Error!', error });
  }
};

const allBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.findAll();
    if (blogs) {
      const data = blogs.map((item) => {
        if (item.dataValues.image) {
          return {
            ...item.dataValues,
            image: `${process.env.SERVER_URL}/admin/uploads/blog/${item.dataValues.image}`,
          };
        }
        return item.dataValues;
      });
      return res.status(200).send({
        data,
      });
    }
    return res.status(400).send({ data: [] });
  } catch (error) {
    return res.status(400).send({ message: 'Error!', error });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.body;
    const paramsToVerify = ['id'];
    const areParamsMissing = verifyBodyParams(paramsToVerify, req.body);
    if (areParamsMissing.error) {
      return res.status(400).send(areParamsMissing);
    }

    const blog = await Blogs.destroy({ where: { id } });
    if (blog) {
      return res.status(200).send({ message: 'Blogs deleted successfully.' });
    }
    return res.status(400).send({ message: 'Error while deleting the blog.' });
  } catch (error) {
    return res.status(400).send({ message: 'Error!', error });
  }
};

const blogById = async (req, res) => {
  try {
    const { id } = req.body;
    const paramsToVerify = ['id'];
    const areParamsMissing = verifyBodyParams(paramsToVerify, req.body);
    if (areParamsMissing.error) {
      return res.status(400).send(areParamsMissing);
    }

    const blog = await Blogs.findOne({ where: { id } });
    if (blog) {
      const data = blog.dataValues;
      return res.status(200).send({
        data: {
          ...data,
          image: `${process.env.SERVER_URL}/admin/uploads/blog/${data.image}`,
        },
      });
    }
    return res.status(400).send({ data: {} });
  } catch (error) {
    return res.status(400).send({ message: 'Error!', error });
  }
};

const updateBlogStatus = async (req, res) => {
  try {
    const { id } = req.body;
    const paramsToVerify = ['id'];
    const areParamsMissing = verifyBodyParams(paramsToVerify, req.body);
    if (areParamsMissing.error) {
      return res.status(400).send(areParamsMissing);
    }

    const blog = await Blogs.findOne({ where: { id } });
    if (blog) {
      const status = blog.status === 1 ? 0 : 1;
      const statusUpdate = await Blogs.update({ status }, { where: { id } });
      if (statusUpdate) {
        return res
          .status(200)
          .send({ message: status === 1 ? 'Blogs enabled.' : 'Blogs disabled' });
      }
      return res
        .status(400)
        .send({ message: 'Error while updating the status of the blog.' });
    }
    return res.status(400).send({ message: 'Blogs not found.' });
  } catch (error) {
    return res.status(400).send({ message: 'Error!', error });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id, title, description } = req.body;
    const paramsToVerify = ['id', 'title', 'description'];
    const areParamsMissing = verifyBodyParams(paramsToVerify, req.body);
    if (areParamsMissing.error) {
      removeFile(`${__dirname}/../uploads/blog/${req?.file?.filename}`);
      return res.status(400).send(areParamsMissing);
    }

    const findBlogTitle = await Blogs.findOne({
      where: { title, id: { [Op.ne]: id } },
    });
    if (findBlogTitle) {
      removeFile(`${__dirname}/../uploads/blog/${req?.file?.filename}`);
      return res.status(400).send({ message: 'Blogs title is already exist.' });
    }

    const findBlog = await Blogs.findOne({ where: { id } });
    if (findBlog) {
      if (req?.file?.filename) {
        removeFile(`${__dirname}/../uploads/blog/${findBlog.image}`);
      }
    } else {
      removeFile(`${__dirname}/../uploads/blog/${req?.file?.filename}`);
      return res.status(400).send({ message: 'Blogs not found.' });
    }

    const blog = await Blogs.update(
      {
        title,
        slug: generateSlug(title),
        description,
        image: req?.file?.filename ?? findBlog.image,
      },
      { where: { id } }
    );
    if (blog) {
      return res.status(200).send({
        message: 'Blogs updated successfully.',
      });
    }
    return res
      .status(400)
      .send({ message: 'Error while updating the blog.', data: {} });
  } catch (error) {
    return res.status(400).send({ message: 'Error!', error });
  }
};

const addPage = async (req, res) => {
  try {
    const { title, description } = req.body;
    const paramsToVerify = ['title', 'description'];
    const areParamsMissing = verifyBodyParams(paramsToVerify, req.body);
    if (areParamsMissing.error) {
      return res.status(400).send(areParamsMissing);
    }

    const check = await Pages.findOne({ where: { title } });
    if (check) {
      return res.status(400).send({ message: 'Page title is already exist.' });
    }

    const page = await Pages.create({
      title,
      slug: generateSlug(title),
      description,
      status: 1,
    });
    if (page) {
      return res.status(200).send({
        message: 'Page created successfully.',
      });
    }
    return res.status(400).send({ message: 'Error while creating the page.' });
  } catch (error) {
    return res.status(400).send({ message: 'Error!', error });
  }
};

const allPages = async (req, res) => {
  try {
    const pages = await Pages.findAll();
    if (pages) {
      return res.status(200).send({
        data: pages,
      });
    }
    return res.status(400).send({ data: [] });
  } catch (error) {
    return res.status(400).send({ message: 'Error!', error });
  }
};

const deletePage = async (req, res) => {
  try {
    const { id } = req.body;
    const paramsToVerify = ['id'];
    const areParamsMissing = verifyBodyParams(paramsToVerify, req.body);
    if (areParamsMissing.error) {
      return res.status(400).send(areParamsMissing);
    }

    const page = await Pages.destroy({ where: { id } });
    if (page) {
      return res.status(200).send({ message: 'Page deleted successfully.' });
    }
    return res.status(400).send({ message: 'Error while deleting the page.' });
  } catch (error) {
    return res.status(400).send({ message: 'Error!', error });
  }
};

const pageById = async (req, res) => {
  try {
    const { id } = req.body;
    const paramsToVerify = ['id'];
    const areParamsMissing = verifyBodyParams(paramsToVerify, req.body);
    if (areParamsMissing.error) {
      return res.status(400).send(areParamsMissing);
    }

    const page = await Pages.findOne({ where: { id } });
    if (page) {
      return res.status(200).send({
        data: page,
      });
    }
    return res.status(400).send({ data: {} });
  } catch (error) {
    return res.status(400).send({ message: 'Error!', error });
  }
};

const updatePageStatus = async (req, res) => {
  try {
    const { id } = req.body;
    const paramsToVerify = ['id'];
    const areParamsMissing = verifyBodyParams(paramsToVerify, req.body);
    if (areParamsMissing.error) {
      return res.status(400).send(areParamsMissing);
    }

    const page = await Pages.findOne({ where: { id } });
    if (page) {
      const status = page.status === 1 ? 0 : 1;
      const statusUpdate = await Pages.update({ status }, { where: { id } });
      if (statusUpdate) {
        return res
          .status(200)
          .send({ message: status === 1 ? 'Page enabled.' : 'Page disabled' });
      }
      return res
        .status(400)
        .send({ message: 'Error while updating the status of the page.' });
    }
    return res.status(400).send({ message: 'Blogs not found.' });
  } catch (error) {
    return res.status(400).send({ message: 'Error!', error });
  }
};

const updatePage = async (req, res) => {
  try {
    const { id, title, description } = req.body;
    const paramsToVerify = ['id', 'title', 'description'];
    const areParamsMissing = verifyBodyParams(paramsToVerify, req.body);
    if (areParamsMissing.error) {
      return res.status(400).send(areParamsMissing);
    }

    const findPageTitle = await Pages.findOne({
      where: { title, id: { [Op.ne]: id } },
    });
    if (findPageTitle) {
      return res.status(400).send({ message: 'Page title is already exist.' });
    }

    const findPage = await Pages.findOne({ where: { id } });
    if (!findPage) {
      return res.status(400).send({ message: 'Page not found.' });
    }

    const page = await Pages.update(
      {
        title,
        slug: generateSlug(title),
        description,
      },
      { where: { id } }
    );
    if (page) {
      return res.status(200).send({
        message: 'Page updated successfully.',
      });
    }
    return res.status(400).send({ message: 'Error while updating the page.' });
  } catch (error) {
    return res.status(400).send({ message: 'Error!', error });
  }
};

module.exports = {
  addBlog,
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
  uploadBlogImage,
};
