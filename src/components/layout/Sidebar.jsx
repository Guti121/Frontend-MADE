import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white h-screen p-5">
      <h1 className="text-2xl font-bold mb-8">
        Inventory
      </h1>

      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className="block p-2 rounded hover:bg-slate-800"
            >
              Stock Liquidos
            </Link>
          </li>

          <li>
            <Link
              to="/component"
              className="block p-2 rounded hover:bg-slate-800"
            >
              Componentes
            </Link>
          </li>
          <li>
            <Link
              to="/type-component"
              className="block p-2 rounded hover:bg-slate-800"
            >
              Tipo de Componentes
            </Link>
          </li>
           <li>
            <Link
              to="/container"
              className="block p-2 rounded hover:bg-slate-800"
            >
              Envases
            </Link>
          </li>
          <li>
            <Link
              to="/type-container"
              className="block p-2 rounded hover:bg-slate-800"
            >
              Tipo de envase
            </Link>
          </li>
          <li>
            <Link
              to="/stock-container"
              className="block p-2 rounded hover:bg-slate-800"
            >
              Stock envases
            </Link>
          </li>
          <li>
            <Link
              to="/formulas"
              className="block p-2 rounded hover:bg-slate-800"
            >
              Formulas
            </Link>
          </li>

          <li>
            <Link
              to="/sales"
              className="block p-2 rounded hover:bg-slate-800"
            >
              Sales
            </Link>
          </li>

          <li>
            <Link
              to="/users"
              className="block p-2 rounded hover:bg-slate-800"
            >
              Users
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}