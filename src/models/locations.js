import mongoose from "mongoose"

const locationSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    location_photo_url: { type: String },
    owner_id: { type: String }
})
export default mongoose.model("Location", locationSchema)