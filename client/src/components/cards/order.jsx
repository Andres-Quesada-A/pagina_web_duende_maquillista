import { useNavigate } from "react-router-dom";

function Order({ id, timestamp, address }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/order/${id}`);
    };
    return (
        <div className="w-full flex flex-row gap-2 border-2 border-stone-400 p-2.5 rounded-md items-center hover:bg-stone-200 hover:border-indigo-400" onClick={handleClick}>
            <label className=" pr-2 text-lg ">{timestamp}</label>
            <div className="flex flex-col p-2 border-l-2 border-stone-200">
                <label >Pedido #{id}</label>
                <label className="line-clamp-1">{address}</label>
            </div>
        </div>
    )
}

export default Order;