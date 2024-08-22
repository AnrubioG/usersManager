import { useReducer } from "react";
import AddUserForm from "./AddUserForm";
import { initialState, userReducer } from "../reducers/user-reducer";
import { Modal } from "react-bootstrap";
import { UpdateUserForm } from "../context/UpdateUserForm";

type AddUserModalProps = {
  text: string;
};

export default function AddUserModal({ text }: AddUserModalProps) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <>
      <div>
        <button
          type="button"
          className={`btn ${
            text === "Crear Usuario" ? "btn-light" : "btn-success"
          }`}
          onClick={() => dispatch({ type: "show-modal" })}
        >
          {text}
        </button>
      </div>

      <Modal show={state.modal} backdrop="static" keyboard={false}>
        <Modal.Header>
          <button
            type="button"
            className="btn btn-close mx-5"
            onClick={() => dispatch({ type: "close-modal" })}
          ></button>
          <Modal.Title>Ingrese la informacion del usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {text === "Crear Usuario" ? <AddUserForm /> : <UpdateUserForm />}
        </Modal.Body>
      </Modal>
    </>
  );
}
