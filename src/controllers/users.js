import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UsersModel from "../models/users.js"
const ADD_USER = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new UsersModel({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hash
        })

        const user = await newUser.save()

        console.log(req.body)

        return res.status(201).json({ response: "User was added", user })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ response: "Error ocurred", })
    }
}
const LOGIN_USER = async (req, res) => {
    const fullName = await UsersModel.findOne({ fullName: req.body.fullName })
    const user = await UsersModel.findOne({ email: req.body.email })

    if (!user) {
        return res.status(401).json({ response: "User was not found" })
    }

    const isPasswordMatch = bcrypt.compareSync(req.body.password, user.password)

    if (!isPasswordMatch) {
        return res.status(401).json({ response: "Bad user email or password" })
    }
    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "6h" })

    return res.status(200).json({ response: "User was found", token, user: user, fullName: fullName })

}
const ALL_USERS = async (req, res) => {
    const users = await UsersModel.find();
    return res.status(200).json({ response: "Users", users })

}
const USER_ID = async (req, res) => {
    try {
        const user = await UsersModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ user, response: "User not exist" })
        }
        return res.status(200).json({ user, response: "User was found" })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ response: "Something wrong" })
    }

}
export { ALL_USERS, ADD_USER, LOGIN_USER, USER_ID }