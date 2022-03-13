import mongoose from "mongoose";

export interface IStock {
  _id?: String;
  indice: string;
  qty: Number;
  __v?: Number;
}

const stockSchema = new mongoose.Schema<IStock>({
  indice: {
    type: String,
    required: true,
    unique: true,
  },
  qty: {
    type: Number,
    required: true,
  },
});

export const StockModel = mongoose.model("Stock", stockSchema);
