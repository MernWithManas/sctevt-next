import mongoose from "mongoose";

const syllabusSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: "true"
    },
    image: {
        type: String,
        required: true,
        unique: "true"
    },
    common: {
        type: String,
        required: true,
        default: "https://drive.google.com/file/d/1yR9yTFGk_inOtpFK7x2sZuwefM9BnwuB/view"
    },
    third: {
        type: String,
        required: true,
        unique: "true"
    },
    fourth: {
        type: String,
        required: true,
        unique: "true"
    },
    fifth: {
        type: String,
        required: true,
        unique: "true"
    },
    sixth: {
        type: String,
        required: true,
        unique: "true"
    }


}, { timestamps: true })


export const Syllabus = mongoose.model("Syllabus", syllabusSchema)