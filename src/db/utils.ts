import { StockModel, IStock } from "./stocksSchema";
import { indices } from "./data";

export const insert = (): void => {
  StockModel.insertMany(indices);
};

export const displayAll = async () => {
  const allStocks: IStock[] = await StockModel.find({}, "indice qty").sort("-qty");

  console.log("-----------");
  console.log(allStocks);
};

export const getStocks = async (page: number): Promise<IStock[]> => {
  const skip = (page - 1)*10;

  const allStocks: IStock[] = await StockModel.find({}, "indice qty")
    .sort("-qty")
    .skip(skip)
    .limit(10);

  return allStocks;
};

export const addIndice = () => {};
