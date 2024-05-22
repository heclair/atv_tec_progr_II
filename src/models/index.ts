import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  user_cpf: {
    maxlength: 11,
    minlength: 11,
    required: true,
    type: Number,
    unique: true,
    validate: {
      validator: function (value: string) {
        if (typeof value !== "string") {
          return false;
        }

        const cpf = value.replace(/[^\d]+/g, "");

        if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
          return false;
        }

        const digits = cpf.split("").map(Number);

        const rest = (count: number) => {
          return (
            ((digits
              .slice(0, count - 12)
              .reduce(
                (sum: number, digit: number, index: number) =>
                  sum + digit * (count - index),
                0
              ) *
              10) %
              11) %
            10
          );
        };

        return rest(10) === digits[9] && rest(11) === digits[10];
      },
      message: (props: { value: any }) =>
        `${props.value} is not a valid CPF number`,
    },
  },
  user_nome: {
    maxlength: 50,
    type: String,
    required: true,
  },
  user_fone: {
    maxlength: 11,
    type: String,
    required: true,
    unique: true,
  },
  user_email: {
    maxlength: 100,
    required: true,
    type: String,
    unique: true,
  },
  user_created_at: {
    default: Date.now,
    type: Date,
    required: true,
  },
  user_updated_at: {
    default: Date.now,
    type: Date,
  },
  user_usuario: {
    maxlenght: 50,
    type: String,
    unique: true,
    required: true
  },
  user_password: {
    maxlenght: 20,
    type: String,
    required: true,
    select: false
  }

});

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
