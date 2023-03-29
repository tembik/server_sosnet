const { User } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

const getAllUser = async (req, res) => {
  try {
    const hasil = await User.findAll({
      attributes: ["id", "username", "createdAt", "updatedAt"],
    });
    res.json(hasil);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const hasil = await User.findOne({
      where: { id: id },
      attributes: ["id", "username", "createdAt", "updatedAt"],
    });
    res.json(hasil);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// register user
const regUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userCek = await User.findOne({ where: { username: username } });
    if (userCek) {
      res.json({ gagal: "username sudah dipakai" });
    } else {
      const hashedPass = await bcrypt.hash(password, 10);
      await User.create({
        username: username,
        password: hashedPass,
      });
      res.json({ message: "berhasil melakukan pandaftaran" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

// login user
const logUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userCek = await User.findOne({ where: { username: username } });
    if (!userCek) {
      res.json({ message: "username belum terdaftar" });
    } else {
      const passCek = await bcrypt.compare(password, userCek.password);
      if (!passCek) {
        res.json({ message: "password salah" });
      } else {
        // res.json({ message: "log in berhasil" });
        const accessToken = sign(
          { username: userCek.username, id: userCek.id },
          "rahasia"
        );
        res.json({
          token: accessToken,
          username: userCek.username,
          id: userCek.id,
        });
      }
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.update(req.body, { where: { id: id } });
    res.json({ message: "data berhasil di update" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// ganti username
const updateUsername = async (req, res) => {
  try {
    const id = req.params.id;
    const userCek = await User.findOne({ where: { id: id } });
    if (req.user.id === userCek.id) {
      const username = req.body.username;
      const usernameCek = await User.findOne({ where: { username: username } });
      if (usernameCek) {
        res.json({ message: "username sudah dipakai" });
      } else {
        await User.update({ username: username }, { where: { id: id } });
        res.json({ message: "username berhasil diubah" });
      }
    } else {
      res.json({ message: "user not authorized" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

// ganti password
const updatePassword = async (req, res) => {
  try {
    const id = req.params.id;
    const userCek = await User.findOne({ where: { id: id } });
    if (req.user.id === userCek.id) {
      const { passwordLama, passwordBaru } = req.body;
      const passCek = await bcrypt.compare(passwordLama, userCek.password);
      if (passCek) {
        const hashPassword = await bcrypt.hash(passwordBaru, 10);
        await User.update({ password: hashPassword }, { where: { id: id } });
        res.json({ message: "password berhasil diubah" });
      } else {
        res.json({ message: "masukkan password lama anda dengan benar" });
      }
    } else {
      res.json({ message: "user not authorized" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userCek = await User.findOne({ where: { id: id } });
    if (req.user.id === userCek.id) {
      await User.destroy({ where: { id: id } });
      res.json({ message: "user berhasil dihapus" });
    } else {
      res.json({ message: "user not authorized" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const userAuth = (req, res) => {
  res.json(req.user);
};

module.exports = {
  getAllUser,
  getOneUser,
  regUser,
  logUser,
  updateUser,
  updateUsername,
  updatePassword,
  deleteUser,
  userAuth
};
