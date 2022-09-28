import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec()

        res.json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'failed to get articles'
        })
    }
}
export const getOne =  (req, res) => {
    try {
        const postId = req.params.id
        PostModel.findOneAndUpdate(
            {
                _id: postId
            },
            {
                $inc: {viewsCount: 1}
            },
            {
                returnDocument: 'after'
            },
            (err, doc) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        message: 'failed to get articles'
                    })
                }
                if (!doc) {
                    return res.status(404).json({
                        message: 'tittle not found'
                    })
                }
                res.json(doc)
            }
        )

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'failed to get articles'
        })
    }
}
export const remove = (req, res) => {
    try {
        const postId = req.params.id
        PostModel.findOneAndDelete({
            _id: postId
        },
            (err, doc) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'failed to remove article'
                })
            }
            if (!doc) {
                return res.status(404).json({
                    message:'article not found'
                })
            }
            res.json({
                success: true,
            })
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'failed to remove'
        })
    }
}
export const update = async (req, res) => {
    try {
       const postId = req.params.id
       await PostModel.updateOne({
           _id: postId
       }, {
               tittle: req.body.tittle,
               text: req.body.text,
               tags: req.body.tags,
               imgUrl: req.body.imgUrl,
               user: req.userId
           }
       );
       res.json({
           success: true,
       })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'failed to update'
        })
    }
}
export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            tittle: req.body.tittle,
            text: req.body.text,
            tags: req.body.tags,
            imgUrl: req.body.imgUrl,
            user: req.userId
        })
        const post = await doc.save()

        res.json(post)


    }   catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'failed to create article'
        })

    }
}