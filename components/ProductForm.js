import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Spinner from '@/components/Spinner';
import { ReactSortable } from 'react-sortablejs';

export default function ProductForm({ _id, title: existingTitle, description: existingDescription, price: existingPrice,
    images: existingImages, category: existingCategory, properties: existingProperties }) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || 0);
    const [images, setImages] = useState(existingImages || []);
    const [goToProducts, setGoToProducts] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();
    const [productProperties, setProductProperties] = useState(existingProperties || {});
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
        const data = { title, description, price, images, category, properties: productProperties }

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
    const propertiesToFill = [];
    if (categories.length > 0 && category) {
        let catInfo = categories.find(({ _id }) => _id === category);
        propertiesToFill.push(...catInfo.properties);
        while (catInfo?.parent?._id) {
            const parentCat = categories.find(({ _id }) => _id === catInfo?.parent?._id);
            propertiesToFill.push(...parentCat.properties);
            catInfo = parentCat;
        }
    }

    function setProductProp(name, value) {
        console.log(name, value);
        if (value !== '') {
            setProductProperties(oldProps => {
                return { ...oldProps, [name]: value }
            })
        }
        else {
            setProductProperties(oldProps => {
                const newProps = { ...oldProps };
                delete newProps[name];
                return newProps;
            })
        }
    }

    return (

        <form onSubmit={saveProduct}>

            <div className="flex flex-col place-items-center w-full">
                <div className='w-screen flex flex-col place-items-center'>
                    <label className='text-graytext'>Product Name</label>
                    <input type='text'
                        className="mb-1 dark-text-input md:w-1/2"
                        placeholder="Product name"
                        value={title}
                        onChange={ev => setTitle(ev.target.value)}>
                    </input>
                    <label className='text-graytext'>Category</label>
                    <select className="dark-select md:w-1/2" value={category} onChange={ev => setCategory(ev.target.value)}>
                        <option value=''>No Category</option>
                        {categories.length > 0 && categories.map(c => (
                            <option value={c._id}>{c.name}</option>
                        ))}
                    </select>
                    {propertiesToFill.length > 0 && propertiesToFill.map(p => (
                        <div className='text-white w-screen flex flex-col place-items-center'>
                            <div>{p.name}</div>
                            <select value={productProperties[p.name]} type='text' className='dark-select md:w-1/2' onChange={ev => { setProductProp(p.name, ev.target.value) }}>
                                <option value=''></option>
                                {p.values.map(v => (
                                    <option value={v}>{v}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
                <label className='text-graytext'>
                    Photos
                </label>
                <div className='flex flex-wap m-auto gap-1'>
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

                <div className='w-1/2 flex flex-col place-items-center'>

                    <label className="mt-2 cursor-pointer relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                        <span className="relative px-4 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">

                            Upload
                        </span>
                        <input type="file" multiple className="hidden" onChange={uploadImages} />
                    </label>
                </div>
                <div className='w-1/2 flex flex-col place-items-center'>
                    <label className='text-graytext'>Description</label>
                    <textarea placeholder='Description'
                        className="dark-text-input"
                        value={description}
                        onChange={ev => setDescription(ev.target.value)}>

                    </textarea>
                    <label className='text-graytext'>Price (AUD)</label>
                    <input type="number"
                        className="mb-2 dark-text-input"
                        placeholder='Price'
                        value={price}
                        onChange={ev => setPrice(ev.target.value)}>
                    </input>
                </div>
                <button type='submit' className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                    <span className="relative px-4 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Save
                    </span>
                </button>
            </div>
        </form>

    )
};
