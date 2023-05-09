
import ProductForm from '@/components/productForm';
import Layout from '@/components/Layout';
export default function NewProduct() {
    return (
        <Layout>
            <div className="flex flex-col place-items-center gap-1 h-full">
                <div className="bg-slate-700 rounded-xl mt-20 shadow-lg shadow-slate-900 h-5/6 w-2/3">
                    <div className='flex flex-col place-items-center'>
                        <h1 className='text-white mt-20'>New Product</h1>
                    </div>
                    <ProductForm />
                </div>
            </div>
        </Layout>
    )

}