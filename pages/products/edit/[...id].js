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
            <div className="flex flex-col place-items-center w-screen h-screen">
                <div className='flex flex-col place-items-center'>
                    <h1 className="flex flex-col place-items-center text-white mt-20">Edit product</h1>
                    {productInfo && (
                    <ProductForm {...productInfo} />
                )}

                </div>
                
            </div>
        </Layout >
    );
}