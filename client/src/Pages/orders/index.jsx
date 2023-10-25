import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { messageSettings } from '../../utils/messageSettings';
import Order from "../../components/cards/order";

function OrdersPage() {

    const [data, setData] = useState([]);


    useEffect(() => {
        const apiOrders = 'http://localhost:1234/api/get_order_list'

        axios.get(apiOrders).then((response) => {
            const dataOrders = response.data
            console.log(response)
            setData(dataOrders);
        }
        ).catch((error) => {
            toast.error("Ocurrió un error al cargar las ordenes", messageSettings);
        })
    }, []);


   function formatDate(dateString){
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }

    return (
        <>
            <div className="w-full min-h-screen flex flex-col items-center mt-16 py-14 px-10">
                <header className="w-full max-w-4x1">
                    <h1 className="font-medium text-3xl text-indigo-500">
                        Ordenes
                    </h1>
                    <hr className="border-indigo-500 border-1 mt-2"></hr>
                </header>
                <section className="w-full max-w-4x1 grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
                    {
                    (data && data.length === 0) ? (
                        <h2>No hay ordenes</h2>
                    ) : (data.map((objeto) => {
                        return (<Order key={objeto.id} id={objeto.id} timestamp={formatDate(objeto.timestamp)} address={objeto.address.specificAddress} />)
                    })
                    )

                    }

                </section>
            </div>
        </>
    )
}

export default OrdersPage;