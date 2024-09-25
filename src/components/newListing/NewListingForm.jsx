import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner'



export default function NewListingForm() {

    const [logo, setLogo] = useState(null)
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [category, setCategory] = useState('')
    const [network, setNetwork] = useState('')
    const [maxSupply, setMaxSupply] = useState('')
    const [backedBy, setBackedBy] = useState([])
    const [preview, setPreview] = useState('')
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleFileChange = (event) => {
        setBackedBy([...event.target.files]);
    };

    // const setData = (type, e) => {
    //     switch (type) {
    //         case 'name':
    //             setName(e.target.value);
    //             break;
    //         case 'logo':
    //             setLogo(e.target.files[0])
    //             break;
    //         case 'date':
    //             setDate(e.target.value);
    //             break;
    //         case 'category':
    //             setCategory(e.target.value);
    //             break;
    //         case 'network':
    //             setNetwork(e.target.value)
    //             break;
    //         case 'maxSupply':
    //             setMaxSupply(e.target.value);
    //             break
    //         case 'backedBy':
    //             setBackedBy(e.target.files);
    //             break
    //         default:
    //     }
    // }


    useEffect(() => {
        if (id !== undefined) {
            setIsLoading(true)
            getUser();
        }
    }, []);

    const [editLogo, setEditLogo] = useState('')
    const getUser = () => {
        axios.get(`https://rankterminal.com/growney/public/index.php/api/new-listing/${id}`)
            .then((response) => {
                console.log(response.data.data)
                setEditLogo(response.data.data.logo)
                setName(response.data.data.name)
                setDate(response.data.data.created_on)
                setCategory(response.data.data.category)
                setNetwork(response.data.data.network)
                setMaxSupply(response.data.data.max_supply)
                setBackedBy(response.data.data.investors)
                setIsLoading(false)
            })
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (id === '' || id === null || id === 0 || id == undefined) {
            handleAddRequest();
        } else {
            handlePutRequest();
        }
    };

    const handleAddRequest = async () => {
        setIsLoading(true)
        console.log(logo)
        console.log(name)
        console.log(backedBy)
        console.log(typeof backedBy)
        console.log(backedBy.length)
        console.log(date)
        console.log(maxSupply)
        console.log(network)
        console.log(category)
        // let investors = [backedBy]
        // console.log(typeof investors)
        // for (let i = 0; i < backedBy.length; i++) {
        //     investors.push(backedBy[i])
        // }

        // console.log(typeof investors)
        // console.log(investors)
        // fetch('https://growney.in/growney/public/index.php/api/new-listing', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ logo, name, date, category, network, maxSupply, backedBy }),
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('Success:', data);

        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
        // try {
        //     setIsLoading(true);
        //     await fetch('https://growney.in/growney/public/index.php/api/new-listing', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({logo, name, date, category, network, maxSupply, backedBy}),
        //     })

        //     .then((response) => {
        //         console.log(response)
        //       })
        //       .then((data) => {
        //         console.log(data)
        //       })
        //       .catch((error) => {
        //         console.log(error)
        //       })

        // } catch (error) {
        //     console.log(error.message);
        // }


        const formdata = new FormData();
        formdata.append("logo", logo);
        formdata.append("name", name);
        formdata.append("created_on", date);
        formdata.append("category", category);
        formdata.append("network", network);
        formdata.append("max_supply", maxSupply);
        // formdata.append("investors[]", backedBy);
        for (let i = 0; i < backedBy.length; i++) {
            formdata.append('investors[]', backedBy[i]);
        }
        
        const requestOptions = {
            method: "POST",
            body: formdata,
        };

        fetch("https://rankterminal.com/growney/public/index.php/api/new-listing", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                toast.success('Successfully added!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: 'Bounce',
                })
                setIsLoading(false)
                console.log(result)
            })
            .catch((error) => {
                toast.error("Cant't added data", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: "Bounce",
                })
                console.log(error);
            });

    };

    const handlePutRequest = async () => {
        setIsLoading(true)
        console.log(logo)
        console.log(backedBy)
        console.log(backedBy.length)
        console.log(date)
        console.log(category)
        console.log(network)
        console.log(maxSupply)
        console.log(name)
        console.log('Edit form started', id)

        // const formData = new FormData();
        // formData.append('logo', logo)
        // formData.append('name', name);
        // formData.append('date', date);
        // for (let i = 0; i < backedBy.length; i++) {
        //     formData.append('backedBy', backedBy[i]);
        // }
        // formData.append('category', category);
        // formData.append('network', network);
        // formData.append('maxSupply', maxSupply);

        // fetch(`https://growney.in/growney/public/index.php/api/new-listing/${id}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     },
        //     body: JSON.stringify(formData),
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('Success:', data);
        //         // Reset form and state after successful PUT request
        //         setLogo('')
        //         setName('')
        //         setDate('')
        //         setCategory('')
        //         setNetwork('')
        //         setMaxSupply('')
        //         setBackedBy([])
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });


        // fetch(`https://growney.in/growney/public/index.php/api/new-listing/${id}`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(formData),
        // })
        //     .then((response) => {
        //         console.log(response)
        //     })
        //     .then((data) => {
        //         console.log(data)
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })


        const formdata = new FormData();
        formdata.append("logo", logo);
        formdata.append("name", name);
        formdata.append("created_on", date);
        formdata.append("category", category);
        formdata.append("network", network);
        formdata.append("max_supply", maxSupply);
        // backedBy.forEach((image, index) => {
        //     // formdata.append(index, image);
        //     formdata.append(`investors`, image);
        // });
        formdata.append("investors", backedBy)



        // fetch(`https://growney.in/growney/public/index.php/api/new-listing/${id}`, requestOptions)
        //     .then((response) => response.text())
        //     .then((result) => console.log(result))
        //     .catch((error) => console.error(error));

        // const config = { headers: { 'Content-Type': 'multipart/form-data' } }

        // try {
        //     await axios.put(`https://growney.in/growney/public/index.php/api/new-listing/${id}`, formdata, config)
        //     .then((response)=>{
        //         console.log(response)
        //     })
        //     .catch((err)=>{
        //         console.log(err)
        //     })
        // }
        // catch (err) {
        //     console.log(err);
        // }


        fetch(`https://rankterminal.com/growney/public/index.php/api/new-listing/${id}`, {
            method: 'PUT', // or 'POST' depending on the API
            body: formdata
        })
            .then(response => response.json())
            .then(updatedData => {
                console.log(updatedData)
                setIsLoading(false)
            })
            .catch(error => console.error('Error updating data:', error));




    };

    return (
        <div>
            <form action="" className=' w-11/12 md:w-9/12 bg-red-800 items-center mx-auto px-10 md:px-20 py-4 rounded mt-5' onSubmit={handleSubmit}>
                <div className='mb-3 flex'>
                    <label htmlFor="" className='block text-white'>Logo</label>
                    <input type="file" className='block text-white w-56' onChange={handleImageChange} name='logo' />
                    {preview !== '' ? <img src={preview} alt="" className='h-18 w-32' /> : id !== undefined ? <img src={editLogo} alt="" className='h-18 w-32' /> : ""}
                </div>
                <div className='mb-3'>
                    <label htmlFor="" className='block text-white'>Name</label>
                    <input type="text" className='block w-full py-2 px-2 rounded' onChange={(e) => setName(e.target.value)} value={name} name='name' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="" className='block text-white'>Date</label>
                    <input type="date" className='block w-full py-2 px-2 rounded' onChange={(e) => setDate(e.target.value)} value={date} name='date' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="" className='block text-white'>Category</label>
                    <input type="text" className='block w-full py-2 px-2 rounded' onChange={(e) => setCategory(e.target.value)} value={category} name='category' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="" className='block text-white'>Network</label>
                    <input type="text" className='block w-full py-2 px-2 rounded' onChange={(e) => setNetwork(e.target.value)} value={network} name='network' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="" className='block text-white'>Max Supply</label>
                    <input type="text" className='block w-full py-2 px-2 rounded' onChange={(e) => setMaxSupply(e.target.value)} value={maxSupply} name='maxSupply' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="" className='block text-white'>Backed By/Investors</label>
                    <input type="file" className='block text-white w-56' multiple onChange={handleFileChange} name='backedby' accept=".jpeg,.jpg,.png,.gif" />
                    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-12 items-center gap-10 mt-5'>
                        {backedBy?.map((item, index) =>
                            <img src={id === undefined ? URL.createObjectURL(backedBy[index]) : item} className='w-20 h-20' key={index} />
                        )}
                    </div>
                </div>
                <button className='block mx-auto py-3 bg-white px-8 rounded hover:shadow-x mt-4' type='submit'>Submit</button>
            </form>
            {isLoading ?
                <div className="absolute top-48 left-1/2 right-1/2">
                    <ColorRing
                        visible={true}
                        height="60"
                        width="60"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                </div>
                :
                ""
            }
        </div>
    )
}




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ImageForm from './ImageForm';
// import { useParams, useNavigate } from "react-router-dom";



// const NewListingForm = () => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { id } = useParams();

//     useEffect(() => {
//         // Fetch the initial data from the API
//         // axios.get(`https://growney.in/growney/public/index.php/api/new-listing/${id}`)
//         //     .then(response => {
//         //         setData(response.data);
//         //         setLoading(false);
//         //     })
//         //     .catch(error => {
//         //         console.error('Error fetching the data:', error);
//         //         setLoading(false);
//         //     });
//         axios.get(`https://growney.in/growney/public/index.php/api/new-listing/${id}`)
//             .then((response) => {
//                 setData(response.data.data);
//                 console.log(response.data.data)
//                 setLoading(false);
//             })
//             .catch(error => {
//                         console.error('Error fetching the data:', error);
//                         setLoading(false);
//                     });
//     }, []);

//     const handleUpdate = (updatedItem) => {
//         setData(data.map(item => (item.id === updatedItem.id ? updatedItem : item)));
//     };

//     const handlePost = (newItem) => {
//         setData([...data, newItem]);
//     };

//     return (
//         <div className="App">
//             <h1>Image Data</h1>
//             {loading ?
//                 <p>Loading...</p>
//                 :
//                 <>
//                     {data?.map(item =>
//                         <div key={item.id}>
//                             <img src={`data:image/jpeg;base64,${item.logo}`} alt={item.name} />
//                             <ImageForm data={item} onUpdate={handleUpdate} />
//                         </div>
//                     )}
//                     <ImageForm onPost={handlePost} />
//                 </>
//             }
//         </div>
//     );
// }

// export default NewListingForm;
