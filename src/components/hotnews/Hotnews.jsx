import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner'
import Socials from '../socials/Socials'

export default function Hotnews() {

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    const navigation = useNavigate();
    const goToForm = () => {
        navigation("/hot-news-form")
    }

    const [data, setApiData] = useState([])
    useEffect(() => {
        axios.get(`https://rankterminal.com/growney/public/index.php/api/hot-news`)
            .then((response) => {
                setApiData(response.data.data.collection);
                setIsLoading(false)
            })
    }, [])


    const handelDelete = async (id) => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://rankterminal.com/growney/public/index.php/api/hot-news/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                // toast.error('Deletation failed', {
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
                alert('Deletation failed')
                throw new Error("Failed to delete item");
            }
            else {
                // toast.success('Successfully deleted!', {
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
            }
            setData(data.filter((item) => item.id !== id));
            setIsLoading(false)
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
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
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-11/12 mt-5 mx-auto">
                        {data.map(item =>
                            <figure className="bg-red-200 rounded-xl p-8 md:p-0 shadow-xl relative" key={item.id}>
                                <div className='absolute top-2 right-2 flex items-center gap-3'>
                                    <i className="fa-solid fa-trash text-red-600" onClick={() => handelDelete(item.id)}></i>
                                    <Link to={`/hot-news-form/${item.id}`}><i className="fas fa-edit mr-2 text-green-600"></i></Link>
                                </div>
                                <div className='w-full flex justify-between items-center px-3'>
                                    <img className="w-16 h-16 rounded-full mx-auto mt-3" src={item.logo} alt="" width="384" height="512" />
                                    <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                                        <figcaption className="font-medium">
                                            <div className="text-sky-500 dark:text-sky-400">
                                                {item.heading}
                                            </div>
                                            <div className="text-black">
                                                {item.sub_heading}
                                            </div>
                                        </figcaption>
                                    </div>
                                </div>
                                <div className='flex justify-center items-center mb-5'>
                                    <Socials socials={item?.share}/>
                                </div>
                            </figure>
                        )}
                    </div>
                    <button onClick={goToForm} className='py-3 px-10 border-white border-2 rounded block mx-auto bg-red-800 text-white mt-5'>Add</button>
                </>
            }
        </>
    )
}
