  import { Route } from "react-router-dom";
import ComponentList from "../pages/Components/ComponentList";
import ComponentCreate from "../pages/Components/ComponentCreate";



export const componentsRoutes = (
  <>
    <Route path="/component" element={<ComponentList />} />
    <Route path="/component/create" element={<ComponentCreate />} />
   {/*<Route path="/Components/:id" element={<ComponentDetail />} /> */}
  </>
);