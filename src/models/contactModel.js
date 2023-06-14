import mongoose from 'mongoose';

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add the contact name'],
    },
    username: {
      type: String,
      unique: [true, 'Username already taken.'],
      required: [true, 'Please add the contact username'],
    },
    email: {
      type: String,
      unique: [true, 'Email already taken.'],
      required: [true, 'Please add the contact email'],
    },
    phone: {
      type: String,
      required: [true, 'Please add the contact phone'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Contact', contactSchema);
