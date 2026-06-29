  import { Route } from "react-router-dom";
import TypeContainerList from "../pages/Containers/typeContainers/TypeContainerList";
import TypeContainerCreate from "../pages/Containers/typeContainers/TypeContainerCreate";


export const typeContainersRoutes = (
  <>
    <Route path="/type-container" element={<TypeContainerList />} />
    <Route path="/type-container/create" element={<TypeContainerCreate />} /> 
    {/*<Route path="/containers/:id" element={<containerDetail />} /> */}
  </>
);