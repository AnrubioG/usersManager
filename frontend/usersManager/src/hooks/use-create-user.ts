import { useState } from "react";
import { DraftUser } from "../types";
import { useUserContext } from "../context/UserContext";

export const useCreateUser = () => {
  const { setUser } = useUserContext();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createUser = (user: DraftUser) => {
    setIsLoading(true);
    fetch("https://eml-backend-laravel-production.up.railway.app/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) =>
        response.json().then((data) => ({ data, ok: response.ok }))
      )
      .then(({ data, ok }) => {
        if (ok) {
          alert("Usuario creado");
          return fetch(
            "https://eml-backend-laravel-production.up.railway.app/api/users"
          )
            .then((response) => response.json())
            .then((users) => setUser(users));
        }

        if (!ok) {
          const message = Object.values(data)
            .map((error) => error.join(", "))
            .join(", ");
          alert(message);
        }
      })
      .catch((error) => {
        setError("No fue posible crear el usuaario");
        console.log("error", error.message);
      })
      .finally(() => setIsLoading(false));
  };

  return {
    error,
    isLoading,
    createUser,
  };
};
