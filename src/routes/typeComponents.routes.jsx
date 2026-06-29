  import { Route } from "react-router-dom";
import TypeComponentsList from "../pages/Components/typeComponents/TypeComponentsList";
import TypeComponentCreate from "../pages/Components/typeComponents/TypeComponentsCreate";



export const typeComponentsRoutes = (
  <>
    <Route path="/type-component" element={<TypeComponentsList />} />
    <Route path="/type-component/create" element={<TypeComponentCreate />} /> 
    {/*<Route path="/components/:id" element={<componentDetail />} /> */}
  </>
);