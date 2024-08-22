import { ChangeEvent, FormEvent, useReducer, useState } from "react";
import { DraftUser } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useCreateUser } from "../hooks/use-create-user";
import { initialState, userReducer } from "../reducers/user-reducer";

export default function AddUserForm() {
  const [user, setUser] = useState<DraftUser>({
    name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const [state, dispatch] = useReducer(userReducer, initialState);
  const { createUser } = useCreateUser();
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);

    if (Object.values(user).includes("")) {
      setError("Todos los campos son necesarios");
      return;
    }

    createUser(user);
    setError("");
    dispatch({ type: "close-modal" });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombres
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">
            Apellidos
          </label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Telefono
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            onChange={handleChange}
          />
        </div>

        <input type="submit" className="btn btn-primary" value={"Guardar"} />
      </form>
    </>
  );
}
