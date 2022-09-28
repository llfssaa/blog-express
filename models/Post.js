import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    tittle: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        default: [],
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    imgUrl: String,

    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Post', PostSchema)