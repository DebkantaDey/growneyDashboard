import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner'



export default function EcoSystemForm() {

    const [logo, setLogo] = useState('')
    const [name, setName] = useState('')
    const [project, setProject] = useState('')
    const [preview, setPreview] = useState('')
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    const setData = (type, e) => {
        switch (type) {
            case 'name':
                setName(e.target.value);
                break;
            case 'project':
                setProject(e.target.value);
                break;
            default:
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(file);
            setPreview(URL.createObjectURL(file));
        }
    };



    useEffect(() => {
        if (id !== undefined) {
            setIsLoading(true)
            getUser();
        }
    }, []);

    const [editLogo, setEditLogo] = useState('')
    const getUser = () => {
        axios.get(`https://growney.in/growney/public/index.php/api/eco-system/${id}`)
            .then((response) => {
                setEditLogo(response.data.data.logo)
                setProject(response.data.data.project)
                setName(response.data.data.name)
                console.log(response)
                setIsLoading(false)
            })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id === '' || id === null || id === 0 || id === undefined) {
            handlePostRequest();
        } else {
            handlePutRequest();
        }
    };

    const handlePostRequest = (e) => {
        setIsLoading(true)
        const formdata = new FormData();
        formdata.append("logo", logo);
        formdata.append("name", name);
        formdata.append("project", project);

        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        fetch("https://growney.in/growney/public/index.php/api/eco-system", requestOptions)
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
            })
            .catch((error) => console.error(error));
    };

    const handlePutRequest = async() => {

        console.log(logo)
        console.log(name)
        console.log(project)
        const formdata = new FormData();
        formdata.append("logo", logo);
        formdata.append("name", name);
        formdata.append("project", project);
        setIsLoading(true)

        const requestOptions = {
            method: "PUT",
            body: formdata,
        };
       
        console.log('Edit form started', id)
        // fetch(`https://growney.in/growney/public/index.php/api/eco-system/${id}`, requestOptions)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('Success:', data);
        //         // Reset form and state after successful PUT request
        //         setLogo('')
        //         setName('')
        //         setProject('')
        //         setIsLoading(false)
        //     })
        //     .catch((error) => {
        //         console.log('Error:', error);
        //         setIsLoading(false)
        //     });

        try {
            const response = await axios.put(`https://growney.in/growney/public/index.php/api/eco-system/${id}`, formdata, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            console.log('Response:', response.data);
            setIsLoading(false)
          } catch (error) {
            console.error('Error uploading data:', error);
            setIsLoading(false)
          }
    };
    return (

        <div>
            <form action="" className='w-11/12 md:w-9/12 bg-red-800 items-center mx-auto px-10 md:px-20 py-4 rounded mt-5' onSubmit={handleSubmit} encType="multipart/form-data">
                <div className='mb-3 flex'>
                    <label htmlFor="" className='block text-white'>Logo</label>
                    <input type="file" className='block text-white w-56' onChange={handleImageChange} name='logo' />
                    {preview !== '' ? <img src={preview} alt="" className='h-18 w-32' /> : id !== undefined ? <img src={editLogo} alt="" className='h-18 w-32' /> : ""}
                </div>
                <div className='mb-3'>
                    <label htmlFor="" className='block text-white'>Name</label>
                    <input type="text" className='block w-full py-2 px-2 rounded' onChange={(e) => setData('name', e)} value={name} name='name' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="" className='block text-white'>Project</label>
                    <input type="text" className='block w-full py-2 px-2 rounded' onChange={(e) => setData('project', e)} value={project} name='project' />
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