
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
        <div className="flex flex-col  place-items-center  h-full gap-1">
            <div className="bg-slate-700 rounded-xl mt-20 shadow-lg shadow-slate-900 h-5/6  w-2/3">
                <div className='flex flex-col place-items-center'>
                    <h1 className="mt-20 text-white">Products</h1>
                    <div class="w-3/4 overflow-x-auto shadow-md mt-2 sm:rounded-lg flex place-content-center border border-amber-400">
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
                    <Link className="add-btn " href={"/products/new"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add New Product</Link>
                </div>
            </div>
        </div>
    </Layout>)
}
