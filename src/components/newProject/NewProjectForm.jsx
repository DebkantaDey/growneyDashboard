import React, { useState, useEffect, version } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner'


export default function NewProjectForm() {

    const [logo, setLogo] = useState('')
    const [project, setProject] = useState('')
    const [category, setCategory] = useState('')
    const [totalRaise, setTotalRaise] = useState('')
    const [round, setRound] = useState('')
    const [investors, setInvestors] = useState('')
    const [preview, setPreview] = useState('')
    const [website, setWebsite] = useState('')
    const [telegram, setTelegram] = useState('')
    const [twitter, setTwitter] = useState('')
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
            case 'category':
                setCategory(e.target.value);
                break;
            case 'totalRaise':
                setTotalRaise(e.target.value);
                break;
            case 'round':
                setRound(e.target.value);
                break;
            case 'investors':
                setInvestors(e.target.value);
                break;
            case 'website':
                setWebsite(e.target.value);
                break;
            case 'telegram':
                setTelegram(e.target.value);
                break;
            case 'twitter':
                setTwitter(e.target.value);
                break;
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
        axios
            .get(`https://rankterminal.com/growney/public/index.php/api/new-project/${id}`)
            .then((item) => {
                setEditLogo(item.data.data.logo)
                setProject(item.data.data.project)
                setCategory(item.data.data.category)
                setTotalRaise(item.data.data.totalRaise)
                setRound(item.data.data.round)
                setInvestors(item.data.data.investors)
                setIsLoading(false)
            })
            .catch((err) => {
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id === '' || id === null || id === 0 || id === undefined) {
            handleAddRequest();
        } else {
            handleEditRequest();
        }
    };

    const handleAddRequest = () => {
        setIsLoading(true)
        const formdata = new FormData();
        formdata.append("logo", logo);
        formdata.append("project", project);
        formdata.append("category", category);
        formdata.append("total_raise", totalRaise);
        formdata.append("round", round);
        formdata.append("investors", investors);
        formdata.append("share[telegram]", telegram);
        formdata.append("share[website]", website);
        formdata.append("share[twitter]", twitter);

        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        fetch("https://rankterminal.com/growney/public/index.php/api/new-project", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                // toast.success('Successfully added!', {
                //     position: "top-right",
                //     autoClose: 5000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     theme: "light",
                //     transition: 'Bounce',
                // })
                alert('Successfully deleted!')
                setLogo('')
                setPreview('')
                setProject('');
                setCategory('');
                setTotalRaise('');
                setRound('');
                setInvestors('');
                setWebsite('');
                setTelegram('');
                setTwitter('');
                setIsLoading(false)
            })
            .catch((error) =>
                // toast.error("Cant't added data", {
                //     position: "top-right",
                //     autoClose: 5000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     theme: "light",
                //     transition: Bounce,
                // })
                alert("Cant't added data")
            );
    };

    const handleEditRequest = () => {
        setIsLoading(true)
        fetch(`https://rankterminal.com/growney/public/index.php/api/new-project/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ logo, project, category, totalRaise, round, investors }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Reset form and state after successful PUT request
                setLogo('')
                setProject('')
                setCategory('')
                setTotalRaise('')
                setRound('')
                setInvestors('')
                setIsLoading(false)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
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
                    <label htmlFor="" className='block text-white'>Project</label>
                    <input type="text" className='block w-full py-2 px-2 rounded' onChange={(e) => setData('project', e)} name='project' value={project} placeholder='Enter the project' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="" className='block text-white'>Socials</label>
                    <div className='flex justify-between items-center gap-1'>
                        <input type="text" className='block w-4/12 py-2 px-2 rounded' placeholder='Website link here' value={website} onChange={(e) => setData('website', e)} />
                        <input type="text" className='block w-4/12 py-2 px-2 rounded' placeholder='Twitter link here' value={twitter} onChange={(e) => setData('twitter', e)} />
                        <input type="text" className='block w-4/12 py-2 px-2 rounded' placeholder='Telegram link here' value={telegram} onChange={(e) => setData('telegram', e)} />
                    </div>
                </div>
                <div className='mb-3'>
                    <label htmlFor="" className='block text-white'>Category</label>
                    <input type="text" className='block w-full py-2 px-2 rounded' onChange={(e) => setData('category', e)} name='category' value={category} placeholder='Enter the category' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="" className='block text-white'>Total Raise</label>
                    <input type="text" className='block w-full py-2 px-2 rounded' onChange={(e) => setData('totalRaise', e)} name='totalRaise' value={totalRaise} placeholder='Enter the total raise' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="" className='block text-white'>Round</label>
                    <input type="text" className='block w-full py-2 px-2 rounded' onChange={(e) => setData('round', e)} name='round' value={round} placeholder='Enter the round' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="" className='block text-white'>	Investors</label>
                    <input type="text" className='block w-full py-2 px-2 rounded' onChange={(e) => setData('investors', e)} name='investors' value={investors} placeholder='Enter the investors' />
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
