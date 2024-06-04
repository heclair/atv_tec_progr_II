import mongoose from "mongoose";
const { Schema } = mongoose;

const cidadesSchema = new Schema({
    cid_nome: {
      maxlength: 45,
      type: String,
      required: true,
    },
    cid_est_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Estados",
      required: true,
    },
    cid_ibge: {
      type: Number,
      required: true,
      unique: true,
    },
    cid_created_at: {
      default: Date.now,
      type: Date,
      required: true,
    },
    cid_updated_at: {
      default: Date.now,
      type: Date,
    },
  });

  export default mongoose.model("Cidades", cidadesSchema, "cidades");