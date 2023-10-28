import { useState } from "react";
import { CloseIcon } from "../Icons";

function SubmitRequestForm({
  handleClick,
  modal,
  toggleModal,
  setMessage
}) {
  

  return (
    <>
      {modal && (
        <div className="w-screen h-screen top-0 left-0 right-0 bottom-0 fixed z-[100]">
          <div className="w-screen h-screen top-0 left-0 right-0 bottom-0 fixed z-[100] bg-gray-800 opacity-60 cursor-default" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md rounded-md z-[102] w-full max-w-sm py-6 px-3 pt-8"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <div className="content px-2">
              <h4 className="w-full text-center font-medium text-xl">
                Solicitud de servicio
              </h4>
              <div>
                <label className="block mb-2 text-base font-medium text-gray-900 mt-5 ">
                  Escriba un mensaje
                </label>

                <textarea
                  id="message"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 block w-full max-h-[120px] min-h-[120px] p-2.5 resize-none `}
                  placeholder="Mensaje"
                  required={true}
                  onChange={(e)=> setMessage(e.target.value)}
                />
              </div>
            </div>
            <div className="flex mt-5 justify-center gap-3">
              <button
                className="bg-indigo-500 hover:bg-indigo-400 py-2 px-4 text-base rounded-md cursor-pointer text-white transition-colors"
                onClick={handleClick}
              >
                Enviar
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

export default SubmitRequestForm;
