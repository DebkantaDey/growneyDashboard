import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner'

export default function UnusualActivityFrom() {

    const [logo, setLogo] = useState('')
    const [project, setProject] = useState('')
    const [activities, setActivities] = useState('')
    const [preview, setPreview] = useState('')
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();


    const setData = (type, e) => {
        switch (type) {
            case 'project':
                setProject(e.target.value);
                break;
            case 'activities':
                setActivities(e.target.value);
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

    const [editLogo, setEditLogo]=useState('')
    const getUser = () => {
        axios.get(`https://rankterminal.com/growney/public/index.php/api/killer-project/${id}`)
            .then((item) => {
                setEditLogo(item.data.data.logo)
                setProject(item.data.data.project)
                setActivities(item.data.data.activities)
                console.log(item.data.data)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id === '' || id === null || id === 0 || id == undefined) {
            handleAddRequest();
        } else {
            handleEditRequest();
        }
    };

    const handleAddRequest = async (e) => {
        setIsLoading(true)
        const formdata = new FormData();
        formdata.append("logo", logo);
        formdata.append("project", project);
        formdata.append("activity", activities);

        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        fetch("https://rankterminal.com/growney/public/index.php/api/killer-project", requestOptions)
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
            .catch((error) =>
                toast.error("Cant't added data", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
            );
    };

    const handleEditRequest = () => {
        setIsLoading(true)
        console.log('Edit form started', id)
        fetch(`https://rankterminal.com/growney/public/index.php/api/killer-project/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ logo, project, activities }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                // Reset form and state after successful PUT request
                setLogo('')
                setProject('')
                setActivities('')
                setIsLoading(false)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    return (
        <div>
            <form action="" className=' w-11/12 md:w-9/12 bg-red-800 items-center mx-auto px-10 md:px-20 py-4 rounded mt-5' onSubmit={handleSubmit} encType="multipart/form-data">
                <div className='mb-3 flex'>
                    <label htmlFor="" className='block text-white'>Logo</label>
                    <input type="file" className='block text-white w-56' onChange={handleImageChange} name='logo' />
                    {preview !== '' ? <img src={preview} alt="" className='h-18 w-32' /> : id !== undefined ? <img src={editLogo} alt="" className='h-18 w-32' /> : ""}
                </div>
                <div className='mb-3'>
                    <label htmlFor="" className='block text-white'>Project</label>
                    <input type="text" className='block w-full py-2 px-2 rounded' onChange={(e) => setData('project', e)} value={project} name='project' placeholder='Enter the project'/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="" className='block text-white'>Socials</label>
                    <div className='flex justify-between items-center gap-1'>
                        <input type="text" className='block w-4/12 py-2 px-2 rounded' placeholder='Website link here'/>
                        <input type="text" className='block w-4/12 py-2 px-2 rounded' placeholder='Twitter link here'/>
                        <input type="text" className='block w-4/12 py-2 px-2 rounded' placeholder='Telegram link here'/>
                    </div>
                </div>
                <div className='mb-3'>
                    <label htmlFor="" className='block text-white'>Activities</label>
                    <input type="text" className='block w-full py-2 px-2 rounded' onChange={(e) => setData('activities', e)} value={activities} name='activities' placeholder='Enter the activities'/>
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
