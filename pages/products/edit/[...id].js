import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "/components/ProductForm";

export default function EditProductPage() {
    const [productInfo, setProductInfo] = useState(null);
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/products?id=' + id).then(response => {
            setProductInfo(response.data);
        });
    }, [id]);
    return (
        <Layout>
            <div className="flex flex-col place-items-center gap-1 h-full">
                <div className="bg-slate-700 rounded-xl mt-20 shadow-lg shadow-slate-900 h-5/6 w-2/3">
                    <div className='flex flex-col place-items-center'>
                    <h1 className="flex flex-col place-items-center text-white mt-20">Edit product</h1>
                </div>
                {productInfo && (
                    <ProductForm {...productInfo} />
                )}
            </div>
        </div>
        </Layout >
    );
}