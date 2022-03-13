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

export const getAllStock = async ():Promise<IStock[]> => {
  const allStocks: IStock[] = await StockModel.find({}, "indice qty").sort("-qty");

  return allStocks;
};

export const addIndice = () =>{

}
