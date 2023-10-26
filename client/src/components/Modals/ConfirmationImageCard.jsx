import { useState } from "react";
import { CloseIcon } from "../Icons";

function ConfirmationImageCard({ title, description, handleDelete, modal, toggleModal }) {


  return (
    <>
      {modal && (
        <div className="w-screen h-screen top-0 left-0 right-0 bottom-0 fixed z-[100]">
          <div
            onClick={toggleModal}
            className="w-screen h-screen top-0 left-0 right-0 bottom-0 fixed z-[100] transparentBG"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md rounded-md z-[102] w-full max-w-sm py-6 px-3 pt-8">
            <div className="content">
              <h4 className="w-full text-center font-medium text-xl">
                {title}
              </h4>
              <p className="w-full text-center mt-5 mb-10">{description}</p>
            </div>
            <div className="flex mt-5 justify-center gap-3">
              <button
                className="bg-transparent hover:bg-gray-300 border-2 border-gray-500 py-2 px-4 text-base rounded-md cursor-pointer text-gray-700 transition-opacity"
                onClick={toggleModal}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 hover:bg-red-400 py-2 px-4 text-base rounded-md cursor-pointer text-white transition-colors"
                onClick={handleDelete}
              >
                Eliminar
              </button>
            </div>
            <button
              className="absolute top-2 right-2 text-slate-700 cursor-pointer"
              onClick={toggleModal}
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ConfirmationImageCard;
