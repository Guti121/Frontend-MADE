import { Route } from "react-router-dom";

import StockContainerList from "../pages/ContainerStock/StockContainerList";

export const stockContainerRoutes = (
  <>
    <Route path="/stock-container" element={<StockContainerList/>} />
   {/* <Route path="/stock-container/:id" element={<StockContainerList/>} />
   <Route path="/stock-container/create" element={<StockContainerList/>} /> */}
  </>
);