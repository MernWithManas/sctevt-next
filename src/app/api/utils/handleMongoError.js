// utils/mongoErrors.js

// Function to handle MongoDB errors
const handleMongoError = (error) => {
    let errorMessage = "Internal server error";
    let statusCode = 500;

    // Handle common MongoDB errors
    if (error.code === 11000) { // Duplicate key error
        errorMessage = "Duplicate entry detected!";
        statusCode = 400;
    } else if (error.name === "ValidationError") { // Validation error
        errorMessage = "Validation error! Please check your input.";
        statusCode = 400;
    } else if (error.name === "CastError") { // Cast error (e.g., invalid ObjectId)
        errorMessage = "Invalid ID format!";
        statusCode = 400;
    } else if (error.name === "MongoError" && error.code === 2) { // MongoError: Failed to parse ObjectId
        errorMessage = "Invalid ID format!";
        statusCode = 400;
    } else if (error.name === "MongoError" && error.code === 18) { // MongoError: Index key too large
        errorMessage = "Index key too large! Please shorten the value.";
        statusCode = 400;
    } else if (error.name === "MongoError" && error.code === 121) { // MongoError: Document exceeds maximum size
        errorMessage = "Document size exceeds the maximum limit!";
        statusCode = 400;
    } else if (error.name === "MongoError" && error.code === 10334) { // MongoError: Index build aborted
        errorMessage = "Index build aborted! Please try again later.";
        statusCode = 400;
    } else if (error.name === "MongoError" && error.code === 10355) { // MongoError: Command not found
        errorMessage = "Command not found!";
        statusCode = 400;
    } else if (error.name === "MongoError" && error.code === 13388) { // MongoError: Invalid JSON input
        errorMessage = "Invalid JSON input!";
        statusCode = 400;
    }

    return { errorMessage, statusCode };
};

export default handleMongoError;
