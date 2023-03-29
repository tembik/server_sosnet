const { Post } = require("../models");
const { User } = require("../models");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

const getAllData = async (req, res) => {
  try {
    const hasil = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(hasil);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getUserPost = async (req, res) => {
  try {
    const id = req.params.id;
    const hasil = await Post.findAll({
      where: { userId: id },
      include: [{ model: User, attributes: ["id", "username"] }],
      order: [["createdAt", "DESC"]],
    });
    res.json(hasil);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getOneData = async (req, res) => {
  try {
    const id = req.params.id;
    const hasil = await Post.findOne({
      where: { id: id },
      include: [{ model: User, attributes: ["id", "username"] }],
    });
    res.json(hasil);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    if (req.file) {
      // const hasil = await cloudinary.uploader.upload(req.file.path);
      // req.body.gambar = hasil.secure_url;
      // req.body.cloudinary_id = hasil.public_id;
      req.body.gambar = req.file.path;
    }
    req.body.userId = req.user.id;
    await Post.create(req.body);
    res.json({ message: "data berhasil ditambah" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findOne({ where: { id: id } });
    if (req.user.id === post.userId) {
      if (req.file) {
        if (post.gambar !== null) {
          // cloudinary.uploader.destroy(post.cloudinary_id);
          const filepath = `./${post.gambar}`;
          fs.unlinkSync(filepath);
        }
        req.body.gambar = req.file.path;
        // const hasil = await cloudinary.uploader.upload(req.file.path);
        // req.body.gambar = hasil.secure_url;
        // req.body.cloudinary_id = hasil.public_id;
      }
      await Post.update(req.body, { where: { id: id } });
      res.json({ message: "data berhasil di update" });
    } else {
      res.json({ message: "user not authorized" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const deleteData = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findOne({ where: { id: id } });
    if (req.user.id === post.userId) {
      if (post.gambar !== null) {
        // await cloudinary.uploader.destroy(post.cloudinary_id);
        const filepath = `./${post.gambar}`;
        fs.unlinkSync(filepath);
      }
      await Post.destroy({ where: { id: id } });
      res.json({ message: "data berhasil dihapus" });
    } else {
      res.json({ message: "user not authorized" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  getAllData,
  getUserPost,
  getOneData,
  createPost,
  updatePost,
  deleteData,
};
