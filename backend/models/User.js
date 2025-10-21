import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"User name is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password must be atleast 6 characters"],
        minlength: 6
    },
    role: {
        type: String,
        enum: ["client","admin"],
        default: "client"
    },
    avatar: {
        type: String,
        default: ""
    },
},{timestamps: true})

userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model("User",userSchema)

export default User