import { useState } from "react";
import Confirmation from "./Confirmation";

function ConfirmationButton({ title, description, handleDelete }) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleClick = () => {
    handleDelete();
    toggleModal();
  };

  return (
    <>
      <button
        className="flex justify-center items-center mx-auto text-white bg-indigo-500 hover:bg-indigo-400 transition-colors rounded-md w-full max-w-[280px] font-medium py-2"
        onClick={toggleModal}
        type="button"
      >
        Eliminar
      </button>

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

export default ConfirmationButton;
