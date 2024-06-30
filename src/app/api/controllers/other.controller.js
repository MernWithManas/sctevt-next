import { asyncHandler } from "../utils/ayncHandler.js";
import { ContactUs, Quote } from "../models/other.model.js";
import {ApiResponse} from "../utils/ApiResponse.js"


const getQuotes = asyncHandler(async (req, res) => {

    try {
        const qoutes = await Quote.find();
        return res.json(qoutes);
    } catch (error) {
        const message = "Error getting qoutes from database (controller) ";
        console.log(error);
        return res.status(404).json({ error: message, log: message });
    }
})
const deleteQuote = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const deletedQuote = await Quote.findOneAndDelete({ _id: id });

        if (!deletedQuote) {
            return res.status(404).json({ error: "Quote not found" });
        }

        res.status(200).json({ message: "Quote has been deleted successfully" });
    } catch (error) {
        const message = "Error deleting quote from database (controller)";
        console.error(error);
        return res.status(500).json({ error: message, log: message });
    }
});
const contactMessage = asyncHandler(async (req, res) => {
    const { name, email, phone, message } = req.body;

    try {
        // Check if any required field is missing
        if (!name || !email || !phone || !message) {
            throw new Error("All fields are required!");
        }

        // Create new message in the database
        const data = await ContactUs.create({ name, email, phone, message });

       
        if (!data) {
            return res.status(500).json({ error: "Error while sending message ! Minssing data - Controller" });
        }

        return res.status(201).json(new ApiResponse(200, data, "Message delivered successfully !"));
    }catch (error) {
        console.error("Error while submitting message:", error);
        return res.status(error.statusCode || 500).json({ error: error.message || "Internal server error" });
    }
});



export { getQuotes, deleteQuote, contactMessage };