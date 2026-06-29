import { Route } from "react-router-dom";

import FormulaList from "../pages/Formulas/FormulaList";
import FormulaCreate from "../pages/Formulas/FormulaCreate";
import FormulaDetail from "../pages/Formulas/FormulaDetail";

export const formulaRoutes = (
  <>
    <Route path="/formulas" element={<FormulaList />} />
    <Route path="/formulas/create" element={<FormulaCreate />} />
  <Route path="/formulas/:id" element={<FormulaDetail />} />
  </>
);