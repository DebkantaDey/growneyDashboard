import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner'


export default function FundingRoundForm() {

    const [logo, setLogo] = useState('')
    const [date, setDate] = useState()
    const [project, setProject] = useState('')
    const [stage, setStage] = useState('')
    const [partners, setPartners] = useState('')
    const [investors, setInvestors] = useState('')
    const [raised, setRaised] = useState('')
    const [category, setCategory] = useState('')
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
            case 'date':
                setDate(e.target.value);
                break;
            case 'project':
                setProject(e.target.value);
                break;
            case 'stage':
                setStage(e.target.value);
                break;
            case 'partners':
                setPartners(e.target.value);
                break;
            case 'investors':
                setInvestors(e.target.value);
                break;
            case 'raised':
                setRaised(e.target.value);
                break;
            case 'category':
                setCategory(e.target.value);
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

    const getUser = () => {
        axios.get(`https://rankterminal.com/growney/public/index.php/api/funding-round/${id}`)
            .then((response) => {
                //setUser(response.data.data.collection);
                setCategory(response.data.data.category)
                setDate(response.data.data.created_on)
                setInvestors(response.data.data.investors)
                setPreview(response.data.data.logo)
                setPartners(response.data.data.partners)
                setProject(response.data.data.project)
                setRaised(response.data.data.raised)
                setStage(response.data.data.rounds)
                setTelegram(response.data.data.share.telegram)
                setWebsite(response.data.data.share.website)
                setTwitter(response.data.data.share.twitter)
                setIsLoading(false)
            })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id == '' || id == null || id == 0 || id == undefined) {
            handlePostRequest();
        } else {
            handleUpdateRequest();
        }
    };

    const handlePostRequest = () => {
        const formdata = new FormData();
        formdata.append("logo", logo);
        formdata.append("created_on", date);
        formdata.append("project", project);
        formdata.append("rounds", stage);
        formdata.append("partners", partners);
        formdata.append("investors", investors);
        formdata.append("raised", raised);
        formdata.append("category", category);
        formdata.append("share[telegram]", telegram);
        formdata.append("share[website]", website);
        formdata.append("share[twitter]", twitter);

        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        fetch("https://rankterminal.com/growney/public/index.php/api/funding-round", requestOptions)
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
                alert('Successfully added!')
                setLogo('')
                setPreview('')
                setDate('');
                setProject('');
                setStage('');
                setPartners('');
                setInvestors('');
                setRaised('');
                setCategory('');
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
                //     transition: 'Bounce',
                // })
                alert("Cant't added data")
            );
    };



    //**********Convert images link to file start***********//
    const urlToFile = async (url, filename, mimeType) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], filename, { type: mimeType });
    };
    //**********Convert images link to file end***********//


    //***********Handle Update form start**************//
    const handleUpdateRequest = async () => {
        setIsLoading(true)
        const formdata = new FormData();
        formdata.append("created_on", date);
        formdata.append("project", project);
        formdata.append("rounds", stage);
        formdata.append("partners", partners);
        formdata.append("investors", investors);
        formdata.append("raised", raised);
        formdata.append("category", category);
        formdata.append("share[telegram]", telegram);
        formdata.append("share[website]", website);
        formdata.append("share[twitter]", twitter);
        formdata.append("_method", "PUT");
        // Append main image
        if (logo instanceof File) {
            formdata.append("logo", logo); // New file uploaded
        } else if (logo) {
            // Existing image URL, convert to File
            const imageFile = await urlToFile(logo, "main-image.jpg", "image/jpeg");
            formdata.append("logo", imageFile);
        }
        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
        };

        fetch(`https://rankterminal.com/growney/public/index.php/api/funding-round/${id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
            });
    };
    //*************Handle Update form end************//
    return (
        <div>
            <form action="" className='w-11/12 md:w-9/12 bg-red-800 items-center mx-auto px-10 md:px-20 py-4 rounded mt-5' onSubmit={handleSubmit}>
                <div className='mb-3 block md:flex'>
                    <label htmlFor="" className='block text-white'>Logo</label>
                    <input type="file" className='block text-white w-56' onChange={handleImageChange} name='logo' id='logo' />
                    <img src={preview} alt="" className='h-16 w-16 md:w-20 md:h-20 mt-2 md:mt-0' />
                    {/* {preview !== '' ? <img src={preview} alt="" className='h-18 w-32 mt-5 md:mt-0' /> : id !== undefined ? <img src={editLogo} alt="" className='h-18 w-32' /> : ""} */}
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
                    <label htmlFor="" className='block text-white'>Date</label>
                    <input type="date" className='block w-full py-2 px-2 rounded' onChange={(e) => setData('date', e)} name='created_on' value={date} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="" className='block text-white'>Stage/Rounds</label>
                    <input type="number" className='block w-full py-2 px-2 rounded' onChange={(e) => setData('stage', e)} name='rounds' value={stage} placeholder='Enter the stage/rounds' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="" className='block text-white'>Partners</label>
                    <input type="text" className='block w-full py-2 px-2 rounded' onChange={(e) => setData('partners', e)} name='partners' value={partners} placeholder='Enter the partners' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="" className='block text-white'>Investors/VCs</label>
                    <input type="number" className='block w-full py-2 px-2 rounded' onChange={(e) => setData('investors', e)} name='investors' value={investors} placeholder='Enter the investors numbers' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="" className='block text-white'>Raised</label>
                    <input type="text" className='block w-full py-2 px-2 rounded' onChange={(e) => setData('raised', e)} name='raised' value={raised} placeholder='Enter the raised' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="" className='block text-white'>Category</label>
                    <input type="text" className='block w-full py-2 px-2 rounded' onChange={(e) => setData('category', e)} name='category' value={category} placeholder='Enter the category' />
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
