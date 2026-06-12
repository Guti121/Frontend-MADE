import DashboardLayout from "../../layouts/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">
            Products
          </h3>

          <p className="text-3xl font-bold">
            120
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">
            Sales
          </h3>

          <p className="text-3xl font-bold">
            35
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">
            Users
          </h3>

          <p className="text-3xl font-bold">
            8
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}