import { Link } from "react-router-dom";
import React from 'react';
import ConfirmationLink from "../Modals/ConfirmationLink";
import { formatCurrency } from "../../utils/formatCurrency";

function Product({ id, imageUrl, name, description, available, price, admin, deleteProduct }) {
  const handleDelete = () => {
    deleteProduct(id);
  }  

  return (
    <a href={`/shop/${id}`} className="relative">
      <article className="shadow-[0px_0px_10px_rgba(0,0,0,0.10)] rounded-lg overflow-hidden">
        <picture className="">
          <img src={imageUrl} className="object-cover object-center h-56 w-full" />
        </picture>
        {
          admin && (
            <div className="absolute bottom-4 left-4 px-1 pb-1">
              <Link to={`/edit_product/${id}`} className="text-indigo-400">
                Editar
              </Link>
              <span className="text-gray-600 font-bold px-1"> · </span>
              <ConfirmationLink
                title={"Confirmación"}
                description={
                  "¿Está seguro de proceder con la eliminación? Esta acción no se puede deshacer."
                }
                handleDelete={handleDelete} />
            </div>
          )
        }
        <div className="py-5 px-5">
          <h4 className="font-semibold text-gray-600 text-lg mb-2">{name}</h4>
          <p className="text-sm mb-2 line-clamp-2">{description}</p>
          <p className={"text-gray-600 font-semibold" + (admin ? " pb-2" : "") }>{
            available ? "Disponible" : "No disponible"
          }</p>
          <p className="text-2xl text-gray-600 font-semibold flex justify-end gap-1 leading-7">
            <span className="text-base">₡</span>
            {formatCurrency(price).replace("₡", "")}
          </p>
        </div>
      </article>
    </a>
  );
}

export default Product;
