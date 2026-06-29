import { Route } from "react-router-dom";
import { SaleCreate } from "../pages/Sale/SaleCreate";

export const salesRoutes = (
  <>
   <Route path="/sales" element={<SaleCreate />} />
   {/* <Route path="/stocks/create" element={<StockCreate/>} /> */}
  </>
);