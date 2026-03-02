import api from "../services/api";
import { useNavigate } from "react-router-dom";

const RoleSelect = () => {
  const navigate = useNavigate();

  const selectRole = async (role) => {
    await api.post("/auth/set-role", { role });
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold">Choose your role</h2>
        <button
          onClick={() => selectRole("student")}
          className="w-full py-2 bg-green-600 rounded"
        >
          Student
        </button>
        <button
          onClick={() => selectRole("organizer")}
          className="w-full py-2 bg-blue-600 rounded"
        >
          Organizer
        </button>
      </div>
    </div>
  );
};

export default RoleSelect;