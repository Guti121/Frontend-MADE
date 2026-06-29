import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from '../pages/Auth/Login'
import Dashboard from '../pages/Dashboard/Dashboard'
import { formulaRoutes } from './formula.routes'
import { componentsRoutes } from './components.routes'
import { stockRoutes } from './stock.routes'
import { containersRoutes } from './containers.routes'
import { stockContainerRoutes } from './stockContainer.routes'
import { typeContainersRoutes } from './typeContainers.routes'
import { typeComponentsRoutes } from './typeComponents.routes'
import { salesRoutes } from './sale.routes'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {stockRoutes}
        {formulaRoutes}
        {componentsRoutes}
        {containersRoutes}
        {stockContainerRoutes}
        {typeContainersRoutes}
        {typeComponentsRoutes}
        {salesRoutes}
      </Routes>
    </BrowserRouter>
  )
}