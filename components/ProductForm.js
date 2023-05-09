import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Spinner from '@/components/Spinner';
import { ReactSortable } from 'react-sortablejs';

export default function ProductForm({ _id, title: existingTitle, description: existingDescription, price: existingPrice, images: existingImages, category: existingCategory }) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || 0);
    const [images, setImages] = useState(existingImages || []);
    const [goToProducts, setGoToProducts] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(existingCategory || '');
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
        if (existingCategory) {
            setCategory(existingCategory);
        }
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        })
    }, [existingTitle, existingDescription, existingPrice]);

    async function saveProduct(ev) {
        ev.preventDefault();
        const data = { title, description, price, images, category }

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
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data)
            setImages(oldImages => {
                return [...oldImages, ...res.data.links]
            })
            setIsUploading(false);
        }
    }

    function deleteImage(index) {
        setImages(oldImages => {
            const newImages = [...oldImages];
            newImages.splice(index, 1);
            return newImages;
        });
    }


    function uploadImagesOrder(images) {
        setImages(images)
    }
    return (

        <form onSubmit={saveProduct}>

            <div className="flex flex-col place-items-center">

                <label>Product Name</label>
                <input type='text'
                    placeholder="Product name"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}>
                </input>
                <label>Category</label>
                <select value={category} onChange={ev => setCategory(ev.target.value)}>
                    <option value=''>No Category</option>
                    {categories.length > 0 && categories.map(c => (
                        <option value={c._id}>{c.name}</option>
                    ))}
                </select>
                <label>
                    Photos
                </label>
                <div className='flex flex-wrap gap-1'>
                    <ReactSortable list={images} setList={uploadImagesOrder} className='flex flex-wrap gap-1'>
                        {!!images?.length && images.map((link, index) => (
                            <div key={link} className='h-24 w-24 flex relative'>
                                <img src={link} alt='' className='w-full h-full object-cover rounded-lg' />
                                <div className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100">
                                    <button onClick={() => deleteImage(index)} className="bg-white rounded-full text-gray-500 hover:bg-gray-100 gap-1 opacity-70 px-1 py-1 absolute top-0 right-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3.81 3.553a1 1 0 011.32-.083l.094.083L10 8.586l4.793-4.793a1 1 0 011.497 1.32l-.083.094L11.414 10l4.793 4.793a1 1 0 01-1.32 1.497l-.094-.083L10 11.414l-4.793 4.793a1 1 0 01-1.497-1.32l.083-.094L8.586 10 3.793 5.207a1 1 0 01-.083-1.32l.083-.094z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>

                            </div>
                        ))}
                    </ReactSortable>
                    {isUploading && (
                        <div className='h-24 w-24 flex justify-center items-center'>
                            <Spinner />
                        </div>
                    )}
                </div>

                <div className='mb-2 flex flex-row'>
                    <label className='cursor-pointer drop-shadow-lg shadow-blue-500/50 bg-gray-300 rounded-lg text-gray-700 flex m-2 px-5 py-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                        </svg>
                        Upload
                        <input type="file" multiple className="hidden" onChange={uploadImages} />
                    </label>
                </div>

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
