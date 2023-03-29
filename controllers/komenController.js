const { User } = require("../models");
const { Post } = require("../models");
const { Komentar } = require("../models");

const getAllData = async (req, res) => {
  try {
    const id = req.params.id;
    const hasil = await Komentar.findAll({
      where: { postId: id },
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

const createData = async (req, res) => {
  try {
    await Komentar.create({
      isi: req.body.isi,
      userId: req.user.id,
      postId: req.body.postId,
    });
    res.json({ message: "data berhasil ditambah" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const deleteData = async (req, res) => {
  try {
    const id = req.params.id;
    const komentar = await Komentar.findOne({ where: { id: id } });
    if (req.user.id === komentar.userId) {
      await Komentar.destroy({ where: { id: id } });
      res.json({ message: "data berhasil dihapus" });
    } else {
      res.json({ message: "user not authorized" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};
module.exports = { getAllData, createData, deleteData };
