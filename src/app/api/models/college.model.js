

import mongoose from "mongoose"

const collegeSchema = new mongoose.Schema(
    {
        type:{
            type: String,
            enum: ["PRIVATE", "GOVERNMENT"],
            required: true
        },
        name: {
            type: String,
            required: true
        },
        nickName: {
            type: String,
            required: true
        },
        established: {
            type: Number,
            required: true
        },
        address: {
            district: {
                type: String,
                required: true
            },
            pincode: {
                type: Number,
                required: true
            },
            streetAddress: {
                type: String,
                required: true
            },
        },
    }
);

const College = mongoose.model("College", collegeSchema);

export default College;