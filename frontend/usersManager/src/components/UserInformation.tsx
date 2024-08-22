import { TrashIcon } from "@heroicons/react/24/outline";
import { User } from "../types";
import AddUserModal from "./FormModal";

interface UserInformationProps {
  user: User;
}

export const UserInformation = ({ user }: UserInformationProps) => {
  return (
    <>
      <div className="card card-body mb-4 d-flex flex-row justify-content-around">
        <div className="row gap-3">
          <div className="flex flex-col col col-12 col-md-auto">
            <h5 className="card-title">Nombre</h5>
            <p className="card-text">{user.name}</p>
          </div>

          <div className="flex flex-col col col-12 col-md-auto">
            <h5 className="card-title">Apellido</h5>
            <p className="card-text">{user.last_name}</p>
          </div>

          <div className="flex flex-col col col-12 col-md-auto">
            <h5 className="card-title">Telefono</h5>
            <p className="card-text">{user.phone}</p>
          </div>

          <div className="flex flex-col col col-12 col-md-auto">
            <h5 className="card-title">Correo</h5>
            <p className="card-text">{user.email}</p>
          </div>

          <div className="flex flex-col col col-12 col-md-auto">
            <h5 className="card-title">Creado</h5>
            <p className="card-text">
              {Intl.DateTimeFormat("es-ES").format(new Date(user.created_at))}
            </p>
          </div>

          <div className="flex flex-col col col-12 col-md-auto ">
            <h5 className="card-title">Ultima Edición</h5>
            {Intl.DateTimeFormat("es-ES").format(new Date(user.updated_at))}
          </div>

          <div className="d-flex gap-2 mt-3 flex flex-col col col-12 col-md-auto ">
            <AddUserModal text="Editar Usuario" />
            <button type="button" className="btn btn-light">
              <TrashIcon
                style={{ width: "20px", height: "20px" }}
                className="text-danger"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
