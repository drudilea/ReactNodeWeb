const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: { type: String, required: [true, 'Name is required'] },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
  },
  password: { type: String, required: [true, 'Password is required'] },
  img: { type: String, required: false },
});

// UserSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
UserSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

// Exporto el esquema para poder utilizarlo en otras partes
module.exports = model('User', UserSchema);
