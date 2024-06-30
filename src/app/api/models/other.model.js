import mongoose from "mongoose";


const quoteSchema = new mongoose.Schema({
    quote:{
        type: String,
        require: true,
        unique: true
    },
    author:{
        type: String,
        require: true,
        unique: true
    }
})

const contactUsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "First name is required !!"],
        maxlength: [30, 'Maximum 30 characters allowed !'],
    },
    phone: {
        type: Number, 
        required: true,
        minlength: [10, 'Phone number must be 10 digits'],
        maxlength: [10, 'Phone number must be 10 digits'],
    },
    email: {
        type: String,
        required: [true, "Email address is required !!"],
        unique: true,
        set: function(value) {
            return value.toLowerCase();
        },
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Please enter a valid email address',
          ],
    },
    message: {
        type: String,
        required: [true, "Message field is required !!"],
        validate: {
            validator: function(value) {
                // Counting words in the message
                const wordCount = value.trim().split(/\s+/).length;
                return wordCount >= 10 && wordCount <= 300;
            },
            message: props => `${props.value} does not meet the word count requirements (between 10 to 300 words)`,
        },
    },
}, {timestamps: true})

const Quote = mongoose.model("Quote", quoteSchema) ;
const ContactUs = mongoose.model("ContactUs", contactUsSchema) ;

export {Quote, ContactUs} ;