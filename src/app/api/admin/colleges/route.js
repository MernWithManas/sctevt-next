import { asyncHandler } from "../../utils/ayncHandler.js";
import College from "../../models/college.model.js"


const allColleges = asyncHandler( async (req, res) => {
 
    try {
        const colleges = await College.find();
        res.json(colleges);
    } catch (error) {
        console.log("Error getting colleges", error);
    }
})



export {allColleges};