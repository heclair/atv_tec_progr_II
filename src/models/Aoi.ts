import mongoose from "mongoose";
const { Schema } = mongoose;

const aoiSchema = new Schema({
    aoi_cid_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cidades",
      required: true,
    },
    aoi_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    area_km2: {
      type: Number,
      required: true,
    },
    geom: {
      type: {
        type: String,
        enum: ["Point", "LineString", "Polygon"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    aoi_created_at: {
      default: Date.now,
      type: Date,
      required: true,
    },
    aoi_updated_at: {
      default: Date.now,
      type: Date,
    },
  });
  
  export default mongoose.model("Aoi", aoiSchema, "aoi");