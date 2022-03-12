import Mongoose from "mongoose";
import validator from 'validator'
const { isEmail } = validator
const listUrlAvtDefault = [
    "https://res.cloudinary.com/dmrx3zaby/image/upload/v1646299626/FacebookCollection/avatarCollection/131390614_1031736607308414_1752860313281874387_n_xjylil.jpg",
    'https://res.cloudinary.com/dmrx3zaby/image/upload/v1646299624/FacebookCollection/avatarCollection/131056830_1031736600641748_7803183549451959873_n_zbvgsn.jpg',
    'https://res.cloudinary.com/dmrx3zaby/image/upload/v1646299623/FacebookCollection/avatarCollection/131024925_1031736610641747_1977003531017752889_n_cxwrpk.jpg',
    'https://res.cloudinary.com/dmrx3zaby/image/upload/v1646299621/FacebookCollection/avatarCollection/131010217_1031736613975080_3303180105510052184_n_vn3rgj.jpg',
    'https://res.cloudinary.com/dmrx3zaby/image/upload/v1646299620/FacebookCollection/avatarCollection/130983009_1031736623975079_2231408246468061266_n_r6ep3t.jpg',
    'https://res.cloudinary.com/dmrx3zaby/image/upload/v1646299619/FacebookCollection/avatarCollection/130816952_1031736587308416_2618282202755916871_n_qo6me9.jpg',
    'https://res.cloudinary.com/dmrx3zaby/image/upload/v1646299617/FacebookCollection/avatarCollection/130488100_1031736570641751_5557173836285721425_n_bvppyg.jpg'
]
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
            default: listUrlAvtDefault[random(5)],
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
    },
    { timestamps: true }
);

export default Mongoose.model('user', userSchema)