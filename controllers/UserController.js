import UserModel from "../models/User.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {validationResult} from "express-validator";


export const register = async (req,res)=>{
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        })
        const user = await doc.save()

        const token = jwt.sign({
                _id: user._id
            },
            'secret123',
            {
                expiresIn: '30d'
            })
        const {passwordHash, ...userData} = user._doc
        res.json({
            ...userData,
            token
        })
    } catch (err) {
        res.status(500).json({
            message: 'Failed to register'
        })
    }
}
export const login = async (req, res)=>{
    try {
        const user = await UserModel.findOne({email: req.body.email})
        if (!user) {
            return res.status(404).json({
                message: 'User not found '
            })
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash)
        if (!isValidPassword) {
            return res.status(400).json({
                message: 'Invalid password or login'
            })
        }

        const token = jwt.sign({
                _id: user._id
            },
            'secret123',
            {
                expiresIn: '30d'
            })
        const {passwordHash, ...userData} = user._doc
        res.json({
            ...userData,
            token
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Failed to authorization'
        })
    }
}
export const getMe = async (req, res)=>{
    try {
        const user = await UserModel.findById(req.userId)

        if (!user) {
            res.status(404).json({
                message: 'User not found'
            })
        }

        const {passwordHash, ...userData} = user._doc
        res.json(userData)

    }  catch (err) {
        res.status(500).json({
            message: 'No Access'
        })
    }
}