import { Syllabus } from "../models/syllabus.model.js";
import { asyncHandler } from "../utils/ayncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addSyllabus = asyncHandler(async (req, res) => {
    try {
        const { name, image, common, third, fourth, fifth, sixth } = req.body;

        if (!name || !image || !common || !third || !fourth || !fifth || !sixth) {
            const message = "All fields are required!";
            console.log(message);
            return res.status(400).json({ error: message, log: message });
        }
        
        const existingSyllabus = await Syllabus.findOne({
            $or: [{ name }, { image }, { third }, { fourth }, { fifth }, { sixth }]
        });

        if (existingSyllabus) {
            const message = "Duplicate entry detected! Ensure all values are unique except common URL.";
            console.log(message);
            return res.status(400).json({ error: message, log: message });
        }

        const newSyllabus = await Syllabus.create({
            name, image, common, third, fourth, fifth, sixth
        });

        const message = "New Syllabus created successfully!";
        console.log(message, newSyllabus);
        return res.status(201).json(new ApiResponse(200, newSyllabus, message));

    } catch (error) {
        console.log("Controller error adding syllabus!:", error);
        return res.status(statusCode).json({ error: errorMessage, log: `Controller error adding syllabus! : ${error.message}` });
    }
});

const getSyllabus = asyncHandler(async (req, res) => {
    try {
        const data = await Syllabus.find();
        res.json(data);
    } catch (error) {
        console.log("Controller error getting syllabus!:", error);
        return res.status(500).json({ error: "Internal server error", log: `Controller error getting syllabus! : ${error.message}` });
    }
});


const deleteSyllabus = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSyllabus = await Syllabus.findOneAndDelete({ _id: id });

        if (!deletedSyllabus) {
            return res.status(404).json({ error: "Syllabus not found" });
        }

        res.status(200).json({ message: "Syllabus has been deleted successfully" });
    } catch (error) {
        const message = "Error deleting Syllabus from database (controller)";
        console.error(error);
        return res.status(500).json({ error: message, log: message });
    }
});

export { addSyllabus, getSyllabus, deleteSyllabus };
