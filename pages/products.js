
import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Products() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('/api/products').then(response => {
            setProducts(response.data)
        });
    }, []);
    return (<Layout>
        <div className="flex flex-col  place-items-center border-amber-400 border h-full gap-1">
            <div class="w-1/2 overflow-x-auto shadow-md sm:rounded-lg flex place-content-center border border-amber-400">
                <table className="dark-table ">
                    <thead>
                        <tr>
                            <td className="dark:bg-gray-700">
                                Product Name
                            </td>
                            <td className="dark:bg-gray-700">
                                Actions
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>
                                    {product.title}
                                </td>
                                <td className="flex gap-1">
                                    <Link href={'/products/edit/' + product._id} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        

                                        Edit
                                    </Link>
                                    <Link href={'/products/delete/' + product._id} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        

                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Link className="btn-primary rounded-md flex" href={"/products/new"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                New Product</Link>
        </div>
    </Layout>)
}
