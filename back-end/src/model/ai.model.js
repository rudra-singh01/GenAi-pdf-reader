import mongoose from "mongoose";

const aiSchema = new mongoose.Schema({
    file:{
        type: String,
        required: true,
    },
    prompt: {
        type: String,
        required: true,
    },
    response: {
        type: String,
        required: false,
    },
    preview_url: {
        type: String,
        required: false,
    }
},{
    timestamps: true,
})

const aiModel = mongoose.model("ai", aiSchema);

export default aiModel;