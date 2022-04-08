import Mongoose from "mongoose";
import validator from 'validator'
import listDefalult from "../../constan/listDefault.js";
const { isEmail } = validator
const random = (range) => {
    return Math.floor(Math.random() * range)
}
const userSchema = new Mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Required"],
            minlength: [6, "Must be at least 6 characters"],
            maxlength: [20, "Must be less than 20 characters"],
            unique: true,
        },
        displayName: {
            type: String,
            default: "New User",
        },
        about: {
            type: String,
            default: "I'm a new user",
        },
        birthDay: {
            type: Date,
            required: true,
        }
        ,
        sex: {
            type: String,
            enum: ['male', 'female'],
            default: 'male'
        }
        ,
        email: {
            type: String,
            required: [true, "Required"],
            maxlength: [50, "Must be 50 characters or less"],
            unique: true,
            validate: [isEmail, "Please enter a valid email"],
        },
        password: {
            type: String,
            required: [true, "Required"],
            select: false,
            minlength: [8, "Must be 8 characters or more"],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        avatarUrl: {
            type: String,
            default: listDefalult.listUrlAvtDefault[random(5)],
        },
        theme: {
            type: String,
            default: "#ff9051",
        },
        karmas: {
            type: Number,
            default: 0,
        },
        friend: {
            type: Array,
            default: [],
        },
        friendRequest: {
            type: Array,
            default: []
        },
        coverAvatar: {
            type: String,
            default: 'https://res.cloudinary.com/dmrx3zaby/image/upload/v1648960994/FacebookCollection/coverCollection/274812010_1131778247362268_6936635690129899680_n_yw7amk.jpg',
        }
    },
    { timestamps: true }
);

export default Mongoose.model('user', userSchema)