import { useState } from "react";
import Confirmation from "./Confirmation";

function ConfirmationLink({ title, description, handleDelete }) {
  const [modal, setModal] = useState(false);

  const toggleModal = (e) => {
    if (e) e.preventDefault();
    setModal(!modal);
  };

  const handleClick = () => {
    handleDelete();
    toggleModal();
  };

  return (
    <>
      <a href="#" className="text-red-500" onClick={toggleModal}>Eliminar</a>

      <Confirmation
        title={title}
        description={description}
        handleDelete={handleClick}
        modal={modal}
        toggleModal={toggleModal}
      />
    </>
  );
}

export default ConfirmationLink;
