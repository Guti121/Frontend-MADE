import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between">
      <h2 className="text-xl font-semibold">
        Dashboard
      </h2>

      <div>
        {user?.name} {user?.lastname}
      </div>
    </header>
  );
}