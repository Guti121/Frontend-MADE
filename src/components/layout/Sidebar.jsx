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
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/products"
              className="block p-2 rounded hover:bg-slate-800"
            >
              Products
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