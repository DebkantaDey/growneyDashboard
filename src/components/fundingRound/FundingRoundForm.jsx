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

    const [editLogo, setEditLogo] = useState('')
    const getUser = () => {
        axios.get(`https://rankterminal.com/growney/public/index.php/api/funding-round/${id}`)
            .then((response) => {
                setUser(response.data.data.collection);
                setCategory(response.data.data.category)
                setDate(response.data.data.created_on)
                setInvestors(response.data.data.investors)
                setEditLogo(response.data.data.logo)
                setPartners(response.data.data.partners)
                setProject(response.data.data.project)
                setRaised(response.data.data.raised)
                setStage(response.data.data.rounds)
                setIsLoading(false)
            })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id == '' || id == null || id == 0 || id == undefined) {
            handlePostRequest();
        } else {
            handlePutRequest();
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

    const handlePutRequest = async () => {

        setIsLoading(true)

        const formdata = new FormData();
        if (logo !== '') {
            formdata.append("logo", logo);
        }
        else {
            formdata.append("logo", editLogo);
        }
        formdata.append("created_on", date)
        formdata.append("project", project);
        formdata.append("rounds", stage);
        formdata.append("partners", partners);
        formdata.append("investors", investors);
        formdata.append("raised", raised);
        formdata.append("category", category)



        // fetch(`https://growney.in/growney/public/index.php/api/funding-round/${id}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     },
        //     body: JSON.stringify(formdata),
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('Success:', data);
        //         // Reset form and state after successful PUT request
        //         setLogo('')
        //         setDate('')
        //         setProject('')
        //         setStage('')
        //         setPartners('')
        //         setInvestors('')
        //         setRaised('')
        //         setCategory('')
        //         setIsLoading(false)
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //         setIsLoading(false)
        //     });

        // const requestOptions = {
        //     method: "PUT",
        //     body: formdata,
        //     redirect: "follow"
        // };

        // fetch(`https://growney.in/growney/public/index.php/api/funding-round/${id}`, requestOptions)
        //     .then((response) => response.json())
        //     .then((result) => {
        //         console.log(result);
        //         setIsLoading(false)
        //     }
        //     )
        //     .catch((error) => {
        //         console.error(error)
        //         setIsLoading(false)
        //     });



        // fetch(`https://growney.in/growney/public/index.php/api/funding-round/${id}`, {
        //     method: 'PUT',
        //     body: formdata,
        // })
        //     .then((res) => {
        //         res.json();
        //     })
        //     .then((res) => {
        //         console.log(res)
        //         setIsLoading(false)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //         setIsLoading(false)
        //     })

        // const result = await response.json();
        // console.log(result)
        // if(result.status){
        //     console.log("Data submitted")
        // }
        // else{
        //     alert("Failed to fetch")
        // }
        // alert('Data updated successfully!');
        // setIsLoading(false)

        axios.post(`https://rankterminal.com/growney/public/index.php/api/funding-round/${id}`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                if (response) {
                    alert('Data updated successfully!');
                } else {
                    alert('There was an error updating the data.');
                }
            })
            .catch(error => {
                console.error('There was an error submitting the form!', error);
            });



    };
    return (
        <div>
            <form action="" className='w-11/12 md:w-9/12 bg-red-800 items-center mx-auto px-10 md:px-20 py-4 rounded mt-5' onSubmit={handleSubmit}>
                <div className='mb-3 block md:flex'>
                    <label htmlFor="" className='block text-white'>Logo</label>
                    <input type="file" className='block text-white w-56' onChange={handleImageChange} name='logo' id='logo' />
                    {preview !== '' ? <img src={preview} alt="" className='h-18 w-32 mt-5 md:mt-0' /> : id !== undefined ? <img src={editLogo} alt="" className='h-18 w-32' /> : ""}
                </div>
                <div className='mb-3'>
                    <label htmlFor="" className='block text-white'>Project</label>
                    <input type="text" className='block w-full py-2 px-2 rounded' onChange={(e) => setData('project', e)} name='project' value={project} placeholder='Enter the project' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="" className='block text-white'>Socials</label>
                    <div className='flex justify-between items-center gap-1'>
                        <input type="text" className='block w-4/12 py-2 px-2 rounded' placeholder='Website link here' value={website} onChange={(e) => setData('website', e)}/>
                        <input type="text" className='block w-4/12 py-2 px-2 rounded' placeholder='Twitter link here' value={twitter} onChange={(e) => setData('twitter', e)}/>
                        <input type="text" className='block w-4/12 py-2 px-2 rounded' placeholder='Telegram link here' value={telegram} onChange={(e) => setData('telegram', e)}/>
                    </div>
                </div>
                <div className='mb-3'>
                    <label htmlFor="" className='block text-white'>Date</label>
                    <input type="date" className='block w-full py-2 px-2 rounded' onChange={(e) => setData('date', e)} name='created_on' value={date} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="" className='block text-white'>Stage/Rounds</label>
                    <input type="text" className='block w-full py-2 px-2 rounded' onChange={(e) => setData('stage', e)} name='rounds' value={stage} placeholder='Enter the stage/rounds' />
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
