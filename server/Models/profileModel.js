import mongoose from "mongoose";
const profileSchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    photo: {
        type: String,
        required:true
    }
},{timestamps:true})
export default mongoose.model('profile', profileSchema);