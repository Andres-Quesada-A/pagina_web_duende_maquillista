import { useState } from "react"
import Confirmation from "../components/Modals/Confirmation"
import { useAuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

function Profile() {
  const {getUser, LogOut, getUserType}  = useAuthContext()
  const navigate = useNavigate()
  const User = getUser()
  const [admin, setAdmin] = useState(getUserType() == 1);
  const [modal, setModal] = useState(false);

  const toggleModal = (e) => {
    if (e) e.preventDefault();
    setModal(!modal);
  };

  const handleClick = () => {
    LogOut()
    toggleModal();
    navigate("/")
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center mt-16 py-14">
        <header className="w-full max-w-4xl">
            <h1 className="font-semibold text-4xl text-indigo-500">
                Mi perfil
            </h1>
        </header>
        <section className="mt-10 w-full max-w-4xl px-5 grid-cols-1 gap-3 grid">
        <p><strong>Nombre: </strong>{User.name ?? ""}</p>
        <p><strong>Apellidos: </strong>{User.lastName ?? ""}</p>
        <p><strong>Correo electrónico: </strong>{User.email ?? ""}</p>
        <div className="flex justify-around mt-5">
          <button onClick={toggleModal} className="bg-red-500 rounded-md text-white font-medium w-44 py-2">Cerrar sesión</button>
          {admin ? <></> : <button onClick={() => navigate('/orders')} className="bg-indigo-500 rounded-md text-white font-medium w-44 py-2">Mis órdenes</button>}
        </div>

        </section>
        <Confirmation
        title={"Cerrar sesión"}
        description={"¿Está seguro que desea cerrar la sesión de la página Duende Maquillista?"}
        handleDelete={handleClick}
        modal={modal}
        toggleModal={toggleModal}
      />
    </div>
  )
}

export default Profile
