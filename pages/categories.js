import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from 'react-sweetalert2'

function Categories({ swal }) {
    const [name, setName] = useState('');
    const [editedCategory, setEditedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState('');
    const [properties, setProperties] = useState([]);
    const [isDark, setIsDark] = useState(false);

    const toggleBackground = () => {
        setIsDark(!isDark);
    };
    useEffect(() => {

        fetchCategories();

    }, []);
    function fetchCategories() {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        });
    }
    async function saveCategory(ev) {
        ev.preventDefault();
        console.log(ev);
        const data = { name, parentCategory };
        if (editedCategory) {
            await axios.put('/api/categories', { ...data, _id: editedCategory._id });
            setEditedCategory(null);
        } else {
            console.log(data);
            await axios.post('/api/categories', data);
        }
        setName('');
        setParentCategory('');
        fetchCategories();
    }
    function editCategory(category) {
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id);
    }
    function deleteCategory(category) {
        swal.fire({
            title: 'Delete Category?',
            text: `Do you want to delete ${category.name}?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Delete',
            confirmButtonColor: '#d55',

        }).then(async result => {
            if (result.isConfirmed) {
                const { _id } = category;
                await axios.delete('/api/categories?_id=' + _id);
                fetchCategories();
            }
        });
    }

    function addProperty() {
        setProperties(prev => {
            return [...prev, { name: "", values: "" }]
        });
    };

    function handlePropertyNameChange(index, property, newName) {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].name = newName;
            return properties;
        });
    }
    function handlePropertyValuesChange(index, property, newValues) {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].values = newValues;
            return properties;
        });
    }
    function removeProperty(indexToRemove) {
        setProperties(prev => {
            return [...prev].filter((p, pIndex) => {
                return pIndex !== indexToRemove;
            });
        });
    }

    return (
        <Layout>
            <div className="flex flex-col place-items-center gap-1">
                <h1 className="text-white">Categories</h1>
                <h1 className="text-white">{editedCategory ? `${editedCategory.name}` : ""}</h1>
                <form onSubmit={saveCategory} className="flex flex-col place-items-center gap-1 w-full">
                    <div className="flex flex-col w-full place-items-center ">
                        <div className="w-1/2 flex gap-2 place-items-center">
                            <label className="w-1/2 text-graytext">{editedCategory ? 'Edit Parent:' : "Category Parent:"}</label>
                            <select className="w-full dark-select" value={parentCategory} onChange={ev => setParentCategory(ev.target.value)}>
                                <option value="">No Parent</option>
                                {categories.length > 0 && categories.map(category => (
                                    <option value={category._id} key={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-1/2 flex gap-2 place-items-center">
                            <label className="w-1/2 text-graytext">{editedCategory ? 'Edit Name:' : "Category Name:"}</label>
                            <input
                                value={name}
                                className="w-full mb-1 dark-text-input"
                                type="text"
                                onChange={ev => setName(ev.target.value)}
                                placeholder={'Category Name'}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col place-items-center">
                        <label className="text-graytext">
                            Properties:
                        </label>
                        <button className="rounded-md px-4 py-1 text-white shadow-md bg-green-800 text-sm sm:w-50 mb-2 flex place-items-center" type="button" onClick={addProperty}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                            Add new property</button>
                        {properties.length > 0 && properties.map((property, index) => (
                            <div className="flex gap-2 mb-2" key={index}>
                                <input className='mb-0' type='text' placeholder="Property Name" value={property.name}
                                    onChange={ev => handlePropertyNameChange(index, property, ev.target.value)}>

                                </input>
                                <input className='mb-0' type='text' placeholder="Values (comma seperated)" value={property.values}
                                    onChange={ev => handlePropertyValuesChange(index, property, ev.target.value)}>

                                </input>
                                <button type='button' className="" onClick={() => removeProperty(index)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-rose-700">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="">
                        <button type='submit' class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                            <span class="relative px-4 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Save
                            </span>
                        </button>

                    </div>

                </form>
                {!editedCategory && (
                    <div class="w-1/2 overflow-x-auto shadow-md sm:rounded-lg flex place-content-center border border-amber-400">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-700">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <td scope="col" class="px-6 py-3">Category Name</td>
                                    <td scope="col" class="px-6 py-3">Parent Category</td>
                                    <td scope="col" class="px-6 py-3">Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length > 0 && categories.map(category => (
                                    <tr key={category._id} class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{category.name}</td>
                                        <td class="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">{category?.parent?.name}</td>
                                        <td>
                                            <div className="flex gap-1">
                                                <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => editCategory(category)}>Edit</button>
                                                <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => deleteCategory(category)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </div >
        </Layout >
    )
}

export default withSwal(({ swal }, ref) => (
    <Categories swal={swal}>

    </Categories >
));