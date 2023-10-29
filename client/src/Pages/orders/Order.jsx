import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { messageSettings } from '../../utils/messageSettings';
import { useNavigate } from "react-router-dom";
import { formatCurrency } from '../../utils/formatCurrency';
import { BackArrowIcon } from "../../components/Icons";
import SelectCustom from "../../components/form/SelectCustom";
import { useAuthContext } from "../../context/AuthContext";

function OrderPage() {
    const { getUserType } = useAuthContext();
    const navigate = useNavigate();
    const { idOrder } = useParams();
    const [data, setData] = useState([]);
    const [status, setStatus] = useState("");
    const [admin, setAdmin] = useState(getUserType() == 1);

    const options = [{ label: "Pendiente", value: "PENDING" }, { label: "Aceptado", value: "ACCEPTED" }, { label: "Rechazado", value: "REJECTED" }]

    useEffect(() => {
        const apiOrders = '/api/get_order/' + parseInt(idOrder);

        axios.get(apiOrders).then((response) => {
            const dataOrders = response.data;
            console.log(response.data)
            setData(dataOrders);
            setStatus(dataOrders.status);
        }
        ).catch((error) => {
            toast.error("Ocurrió un error al cargar la orden.", messageSettings);
        })
    }, []);

    function formatDateTime(dateTimeString) {

        const dateTime = new Date(dateTimeString);

        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

        const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };

        return `${dateTime.toLocaleDateString('es-CR', dateOptions)} a las ${dateTime.toLocaleTimeString('es-CR', timeOptions).replace("00:", "12: ")}`;
    }

    function getTotalOrder() {
        let total = 0;
        data.products.forEach((productObj) => {
            total += productObj.product.price * productObj.amount;
        })
        return total + data.address.shippingFee;
    }

    const handleChange = (e) => {
        console.log(e.target.value);
        setStatus(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const apiOrders = '/api/edit_order/';

        console.log({ id: parseInt(idOrder), status: status })
        axios.put(apiOrders, { id: parseInt(idOrder), status: status }).then((response) => {
            toast.success("Orden actualizada.", messageSettings);
            navigate(-1);
        }
        ).catch((error) => {
            toast.error("Ocurrió un error al actualizar la orden.", messageSettings);
        })
    };

    return (
        <main className="w-full min-h-screen flex flex-col mt-16 py-20 px-5 items-center" >
            {
                (data.length === 0) ? <h1>Cargando...</h1>
                    : (
                        <section className="w-full max-w-5xl min-h-screen flex flex-col items-center">
                            <div className="w-full">
                                <button onClick={() => navigate(-1)} className="font-medium text-gray-600 flex gap-2 items-center">
                                    <BackArrowIcon className="w-5 h-5 text-gray-600" />Volver
                                </button>
                                <h1 className="text-2xl font-medium text-gray-600 my-5">
                                    Orden #{idOrder}
                                </h1>
                                <p className="text-2x1 font-medium text-gray-600">
                                    Hecha el <b>{formatDateTime(data.timestamp)}</b>
                                </p>
                                <p className="text-2x1 font-medium text-gray-600">
                                    por <b> {data.client.name} {data.client.lastName1} {data.client.lastName2} </b>
                                </p>
                                {
                                    admin
                                        ?   <></>
                                        :   <p className="text-2x1 font-medium text-gray-600">
                                                Estado: <b> {options.find(option => option.value == status).label} </b>
                                            </p>
                                }
                            </div>
                            <div className="w-full flex flex-col mt-10">
                                <h2 className="text-2xl font-medium text-gray-600">
                                    Productos
                                </h2>
                                <table className="w-full text-base text-left text-gray-500 mt-5 border-gray-200 border-2 table-fixed">
                                    <thead className="text-sm text-white uppercase bg-gray-700">
                                        <tr className="[&>th]:px-4 [&>th]:py-4">
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.products.map((productObj) => {
                                            return (
                                                <tr className="bg-white border-b [&>td]:px-4 [&>td]:py-4" key={productObj.product.id}>
                                                    <td>{productObj.product.name}</td>
                                                    <td className="border-l-2 border-gray-200">{productObj.amount}</td>
                                                    <td className="border-l-2 border-gray-200">{formatCurrency(productObj.product.price)}</td>
                                                    <td className="border-l-2 border-gray-200">{formatCurrency(productObj.product.price * productObj.amount)}</td>
                                                </tr>
                                            )
                                        })}
                                        <tr className="bg-white border-b [&>td]:px-4 [&>td]:py-4">
                                            <td></td>
                                            <td></td>
                                            <td className="font-semibold">Costo de envío</td>
                                            <td>{formatCurrency(data.address.shippingFee)}</td>
                                        </tr>
                                        <tr className="bg-white border-b [&>td]:px-4 [&>td]:py-4">
                                            <td></td>
                                            <td></td>
                                            <td className="font-semibold">Total</td>
                                            <td>{formatCurrency(getTotalOrder())}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-10 w-full">
                                <h2 className="text-2xl font-medium text-gray-600 mb-10">Comprobante</h2>
                                <picture className="w-full flex justify-center">
                                    <img src={data.voucherImageUrl} className="max-w-xl" />
                                </picture>
                            </div>
                            {
                                admin
                                    ?
                                    <div className="mt-10 w-72">
                                        <SelectCustom label="Estado de la orden"
                                            id="status"
                                            HandleChange={handleChange}
                                            required={true}
                                            options={options}
                                            value={{"status":status}}
                                        />

                                        <button className="mt-3 bg-indigo-500 hover:bg-indigo-400 transition-colors py-1 font-medium text-white w-full text-lg rounded-md"
                                            onClick={handleSubmit}>Aceptar</button>
                                    </div>
                                    : <></>
                            }

                        </section>
                    )
            }

        </main>
    )
}

export default OrderPage;