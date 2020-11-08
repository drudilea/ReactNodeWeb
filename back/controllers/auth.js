const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    // Validar email
    const userDB = await User.findOne({ email });
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Invalid email or password',
      });
    }

    // Validar contraseña
    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword) {
      return res.status(401).json({
        ok: false,
        msg: 'Invalid email or password',
      });
    }

    // Generar token
    const token = await generateJWT(userDB.id);

    res.json({
      ok: true,
      user: userDB,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Unexpected error... Check logs',
    });
  }
};

const register = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'Email is already registered',
      });
    }

    const user = new User(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Guardar user
    await user.save();

    // Generar token
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Unexpected error... Check logs',
    });
  }
};

const validateToken = async (req, res = response) => {
  const uidFromToken = req.uid;
  const uidFromBody = req.query.uid;

  if (uidFromToken !== uidFromBody) {
    return res.status(401).json({
      ok: false,
      msg: 'Token and user not match',
    });
  }

  res.json({
    ok: true,
  });
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;

  // Generar token
  const token = await generateJWT(uid);

  res.json({
    ok: true,
    token,
  });
};

module.exports = {
  login,
  register,
  renewToken,
  validateToken,
};
