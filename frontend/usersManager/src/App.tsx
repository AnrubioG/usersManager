import AddUserModal from "./components/FormModal";
import { UserInformation } from "./components/UserInformation";
import { useUsers } from "./hooks/use-users";

function App() {
  const { users, error, isLoading } = useUsers();

  return (
    <>
      <header className="row align-content-between p-4 mb-5 bg-success text-white">
        <h1 className="col col-12 col-lg-10">Administrador de Usuarios</h1>
        <AddUserModal text="Crear Usuario" />
      </header>

      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        users.length === 0 && <p>Aún no hay usuarios registrados</p>
      )}
      {error ? (
        <p>{error}</p>
      ) : (
        users.length > 0 && (
          <section className="container">
            <h2 className="fs-2 text-success-emphasis fw-bold mb-3 mb-lg-5 ">
              Tu lista de usuarios
            </h2>
            <div className="col-1 w-100 flex-column justify-content-center">
              {users.map((user) => (
                <UserInformation key={user.id} user={user} />
              ))}
            </div>
          </section>
        )
      )}
    </>
  );
}

export default App;
