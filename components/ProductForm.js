import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';


export default function ProductForm({ _id, title: existingTitle, description: existingDescription, price: existingPrice }) {
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
    return (

        <form onSubmit={saveProduct}>
            <div className="flex flex-col place-items-center ">

                <label>Product Name</label>
                <input type='text'
                    placeholder="Product name"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}>
                </input>
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
