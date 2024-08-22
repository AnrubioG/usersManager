import { useEffect, useState } from "react";
import { User } from "../types";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://eml-backend-laravel-production.up.railway.app/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch(() => setError("No fue posible obtener los usuarios"))
      .finally(() => setIsLoading(false));
  }, []);

  return {
    users,
    error,
    isLoading,
  };
};
