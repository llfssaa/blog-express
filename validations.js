import {body} from "express-validator";

export const registerValidation = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Password must contain at least 5 characters').isLength({min: 5}),
    body('fullName', 'Name must contain at least 2 characters').isLength({min: 2}),
    body('avatarUrl', 'Invalid url').optional().isURL()
]

export const loginValidation = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Password must contain at least 5 characters').isLength({min: 5}),
]

export const postCreateValidation = [
    body('tittle', 'Enter the tittle of the article').isLength({min: 3}).isString(),
    body('text', 'Enter article text').isLength({min: 10}).isString(),
    body('tags', 'Wrong tag format (specify array)').optional().isString(),
    body('imgUrl', 'Invalid image link').optional().isString()
]