const { response } = require('express');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  const desde = Number(req.query.desde) || 0;

  const [users, total] = await Promise.all([
    User.find({}, 'name email img').skip(desde).limit(5),
    User.countDocuments(),
  ]);

  res.json({
    ok: true,
    users,
    uid: req.uid,
    total,
  });
};

const deleteUser = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const userDB = await User.findById(uid);
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No user with specified id',
      });
    }

    // Eliminar usuario
    await User.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg: 'User deleted',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Unexpected error... Check logs',
    });
  }
};

module.exports = {
  getUsers,
  deleteUser,
};
