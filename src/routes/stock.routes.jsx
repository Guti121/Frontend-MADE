import { Route } from "react-router-dom";
import StockDetail from "../pages/stock/StockDetail";
import { StockCreate } from "../pages/stock/stockCreate";

export const stockRoutes = (
  <>
   <Route path="/stocks/:id" element={<StockDetail />} />
   <Route path="/stocks/create" element={<StockCreate/>} />
  </>
);