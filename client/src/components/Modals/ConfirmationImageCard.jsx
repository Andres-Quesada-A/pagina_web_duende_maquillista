
import Confirmation from "./Confirmation";

function ConfirmationImageCard({ title, description, handleDelete, modal, toggleModal }) {


  return (
    <Confirmation
        title={title}
        description={description}
        handleDelete={handleDelete}
        modal={modal}
        toggleModal={toggleModal}
      />
  );
}

export default ConfirmationImageCard;
