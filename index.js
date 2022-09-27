import express from 'express'
import mongoose from 'mongoose'
import {registerValidation} from './validations/auth.js'
import checkAuth from "./utils/checkAuth.js";
import * as UserController from './controllers/UserController'

mongoose.connect('mongodb+srv://llfssaa:wwwww@cluster0.mskzhnq.mongodb.net/blog?retryWrites=true&w=majority')
    .then(()=>console.log("DB ok"))
    .catch((err)=>console.log('DB ERROR ', err))

const app = express()

app.use(express.json())

app.post('/auth/register', registerValidation, UserController.register)
app.post('/auth/login', UserController.login)

app.get('/auth/me', checkAuth, UserController.getMe)

app.listen(4444, (err)=>{
    if (err){
        return console.log(err)
    }

    console.log('Server OK')
})