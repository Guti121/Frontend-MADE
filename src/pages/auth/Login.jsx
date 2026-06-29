import { useState } from "react";

import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";
import { login } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getBrand } from "../../services/brand.service";
import { usePersistedState } from "../../hooks/usePersistedState";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [brand,setBrand]=  usePersistedState("brand",{} ) 
    const { setUser } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await login(email, password);
    const brandData = await getBrand(); // <-- get it first
    
    setBrand(brandData); 

    console.log(data.user,"aaaaaaaaaaaaaaaaaaaaaaaaaa");
    setUser(data.user);
    navigate("/dashboard");
  } catch (error) {
    console.error(error,"errorrr");
     toast.error(
    error.response?.data?.message ||
    "Invalid credentials"
  );
  }
};;

  return (
    <AuthLayout>
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <Button type="submit">
            Sign In
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}