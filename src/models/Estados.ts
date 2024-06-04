import mongoose from "mongoose";
const { Schema } = mongoose;

const estadosSchema = new Schema({
    est_sigla: {
      maxlength: 2,
      minlength: 2,
      type: String,
      required: true,
      unique: true,
    },
    est_nome: {
      maxlength: 45,
      type: String,
      required: true,
      unique: true,
    },
    est_ibge: {
      type: Number,
      required: true,
      unique: true,
    },
    est_created_at: {
      default: Date.now,
      type: Date,
      required: true,
    },
    est_updated_at: {
      default: Date.now,
      type: Date,
    },
  });

  export default mongoose.model("Estados", estadosSchema, "estados");