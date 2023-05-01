import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';


export default function ProductForm({ _id, title: existingTitle, description: existingDescription, price: existingPrice, images, }) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || 0);
    const [goToProducts, setGoToProducts] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (existingTitle) {
            setTitle(existingTitle);
        }
        if (existingDescription) {
            setDescription(existingDescription);
        }
        if (existingPrice) {
            setPrice(existingPrice);
        }
    }, [existingTitle, existingDescription, existingPrice]);

    async function saveProduct(ev) {
        ev.preventDefault();
        const data = { title, description, price }

        if (_id) {
            await axios.put('/api/products', { ...data, _id });
        } else {

            axios.post('/api/products', data)
        }
        setGoToProducts(true);




    };
    if (goToProducts) {
        router.push('/products');

    }
    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            console.log(data);
            const res = await axios.post('/api/upload', data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            console.log(res.data);
        }
    }
    return (

        <form onSubmit={saveProduct}>

            <div className="flex flex-col place-items-center border-4 border-gradient bg-clip-border">

                <label>Product Name</label>
                <input type='text'
                    placeholder="Product name"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}>
                </input>
                <lable>
                    Photos
                </lable>
                <div className='mb-2 place-content-center justify-content align-items-center '>
                    <label className='button-x w-24 h-24 border cursor-pointer border-gray-500 bg-gray-300 text-center flex flex-col items-center rounded-lg text-gray-700'>
                        <br></br>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                        </svg>
                        Upload
                        <input type="file" multiple className="hidden" onChange={uploadImages} />
                    </label>



                </div>
                {!images?.length && (<div>No images uploaded</div>)}
                <label>Description</label>
                <textarea placeholder='Description'
                    value={description}
                    onChange={ev => setDescription(ev.target.value)}>

                </textarea>
                <label>Price (AUD)</label>
                <input type="number"
                    placeholder='Price'
                    value={price}
                    onChange={ev => setPrice(ev.target.value)}>
                </input>
                <button type="submit"
                    className="btn-primary w-900">
                    Save
                </button>
            </div>
        </form>

    )
};
