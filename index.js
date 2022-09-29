import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import {loginValidation, postCreateValidation, registerValidation} from './validations.js'
import checkAuth from "./utils/checkAuth.js";
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'
import handleValidationsErrors from "./utils/handleValidationsErrors";

mongoose.connect('mongodb+srv://llfssaa:wwwww@cluster0.mskzhnq.mongodb.net/blog?retryWrites=true&w=majority')
    .then(()=>console.log("DB ok"))
    .catch((err)=>console.log('DB ERROR ', err))

const app = express()

const storage = multer.diskStorage({
    destination:(_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({storage})

app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.post('/auth/register', registerValidation, handleValidationsErrors, UserController.register)
app.post('/auth/login', loginValidation, handleValidationsErrors, UserController.login)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('img'), (req, res) =>{
    res.json({
        url: `/uploads/${req.file.originalname}`,
        }
    )
})
app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, handleValidationsErrors, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id',
    checkAuth,
    postCreateValidation,
    handleValidationsErrors,
    PostController.update
)



app.listen(4444, (err)=>{
    if (err){
        return console.log(err)
    }

    console.log('Server OK')
})