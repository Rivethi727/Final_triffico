// userModel.js
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import passwordComplexity from 'joi-password-complexity'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
	firstName: { type: String,  },
	email: { type: String,  },
	password: { type: String,  },
	role: { type: String, enum: ['user', 'admin', 'data analyst'], default: 'user' }
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, 'MvdxpDbbS3D9vNHk6Oo6JA', {
		expiresIn: "7d",
	});
	return token;
};

// Hash password before saving to database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});



// Generate JWT token for user
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, 'your_secret_key');
    return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

export default User ;  