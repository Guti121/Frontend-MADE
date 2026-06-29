  import { Route } from "react-router-dom";
import ContainerList from "../pages/Containers/ContainerList";
import ContainerCreate from "../pages/Containers/ContainerCreate";

export const containersRoutes = (
  <>
    <Route path="/container" element={<ContainerList />} />
    <Route path="/container/create" element={<ContainerCreate />} />
   {/*<Route path="/containers/:id" element={<containerDetail />} /> */}
  </>
);