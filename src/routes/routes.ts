import { Request, Response, Router } from "express";
import { IStock, StockModel } from "../db/stocksSchema";
import { getStocks } from "../db/utils";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { page } = req.query;
  const indices: IStock[] = await getStocks(parseInt(page as string));
  res.send(indices);
});

router.post("/addindice", async (req: Request, res: Response) => {
  const { indice } = req.body;
  const upperCaseIndice = indice.toUpperCase();
  const stock: IStock | null = await StockModel.findOne({ indice: upperCaseIndice });

  //updating the indice qty
  if (stock) {
    const newQty = (stock.qty as number) + 1;
    const query = await StockModel.findOneAndUpdate({ indice: upperCaseIndice }, { qty: newQty });
  } else {
    StockModel.insertMany([{ indice: upperCaseIndice, qty: 1 }])
      .then(result => {
        res.send("ok");
      })
      .catch(error => {
        console.log("error while inserting the data", error);
        res.status(500).send("Error");
      });
  }
});

router.post("/removeOne", async (req: Request, res: Response) => {
  const { indice, qty } = req.body;

  if (qty === 1) {
    StockModel.findOneAndDelete({ indice: indice }, (error: any, result: any) => {
      if (error) {
        res.status(500).send(error);
      }
    });
  } else {
    const newQty = (qty as number) - 1;
    const query = await StockModel.findOneAndUpdate({ indice: indice }, { qty: newQty });
    res.send("ok");
  }

  res.status(200).send("ok");
});

router.get("/nbindice", async (req: Request, res: Response) => {
  const indices = await StockModel.find();
  const len = indices.length;
  res.send({ len });
});

export default router;
