import { useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon, CloseIcon } from "../Icons";
import { useState } from "react";
import ConfirmationImageCard from "../Modals/ConfirmationImageCard";

function ImageCardDuende({ item, deleteImage }) {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();


  const toggleModal = () => {
    setModal(!modal);
  };
  
  const handleClick = () => {
    navigate(`/gallery/${item.id}`);
  };

  function handleClickDelete() {
    deleteImage(item.id)
    toggleModal()
  };

  const handleClickPencil = (event) => {
    navigate(`/gallery/edit_image/${item.id}`);
    event.stopPropagation();
  };

  const handleClickTrash = (event) => {
    event.stopPropagation();
    toggleModal();
  };

  return (
    <>
      <picture
        onClick={handleClick}
        className="[&:hover>div]:opacity-100 relative rounded-md"
      >
        <div className="w-full h-full  bg-black/20 backdrop-blur-sm opacity-0 transition-all absolute top-0 left-0">
          <div className="absolute bottom-3 right-3 flex flex-row gap-3 justify-end">
            <button
              onClick={handleClickPencil}
              className=" bg-gray-200 w-16 h-16 rounded-md flex justify-center items-center cursor-pointer">
              <PencilIcon className="text-blue-600 w-10 h-10" />
            </button>
            <button
              onClick={handleClickTrash}
              className=" bg-gray-200 w-16 h-16 rounded-md flex justify-center items-center cursor-pointer">
              <TrashIcon className="text-red-600 w-10 h-10" />
            </button>
          </div>
        </div>
        <img src={item.imageUrl} className="aspect-square object-cover" />
      </picture>
      <ConfirmationImageCard 
      title = {"Confirmación"} 
      description = {"¿Está seguro de proceder con la eliminación? Esta acción no se puede deshacer."}
      handleDelete= {handleClickDelete} 
      modal= {modal} 
      toggleModal= {toggleModal}/>
    </>
  );
}

export default ImageCardDuende;
