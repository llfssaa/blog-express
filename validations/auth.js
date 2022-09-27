import {body} from "express-validator";

export const registerValidation = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Password must contain at least 5 characters').isLength({min: 5}),
    body('fullName', 'Name must contain at least 2 characters').isLength({min: 2}),
    body('avatarUrl', 'Invalid url').optional().isURL()
]