import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner'
import Socials from '../socials/Socials';

export default function UnusualActivity() {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const navigation = useNavigate();
  const goToForm = () => {
    navigation("/unusualActivityFrom")
  }



  const [data, setData] = useState([])
  useEffect(() => {
    axios.get(`https://rankterminal.com/growney/public/index.php/api/unusual-activity?nolimit=1`)
      .then((response) => {
        setData(response.data.data.collection);
        setIsLoading(false)
      })
  }, [])


  const handelDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://rankterminal.com/growney/public/index.php/api/unusual-activity/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        // toast.error('Deletation failed', {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        //   transition: 'Bounce',
        // })
        LazyResult('Deletation failed')
        throw new Error("Failed to delete item");
      }
      else {
        // toast.success('Successfully deleted!', {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        //   transition: 'Bounce',
        // })
        LazyResult('Successfully deleted!')
      }
      setData(data.filter((item) => item.id !== id));
      setIsLoading(false)
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  //****************Window size start*********************//
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  //****************Window size start*********************//
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
        <div className='w-full bg-slate-600 py-4 mt-6'>
          <div className='mx-auto mt-3 w-10/12 overflow-x-auto'>
            <table className='table-auto w-full overflow-x-auto'>
              <thead className='sticky top-0 border-b-2 border-b-white'>
                <tr>
                  <th className='sticky left-0 px-5 text-left bg-slate-600' style={{ minWidth: '180px' }}>Project</th>
                  <th className='text-left'>Socials</th>
                  <th className='px-5 text-left' style={{ minWidth: '200px' }}>Activities</th>
                  <th className='text-left' style={{ width: 'auto' }}></th>
                </tr>
              </thead>
              <tbody>
                {data?.map(item =>
                  <tr className='text-white' key={item?.id}>
                    <td className="flex sticky left-0 gap-x-2.5 items-center pt-2 px-2.5 whitespace-nowrap cursor-auto bg-slate-600" style={{ minWidth: '180px' }} >
                      <img src={item?.logo} className="h-10 w-10 rounded-full"></img>
                      <span className='whitespace-nowrap'>{item?.project.length > 9 && screenSize.width > 1000 ?
                        item?.project.substring(0, 9) + "..." : item?.project.length > 6 && screenSize.width < 1000 ? item?.project.substring(0, 5) + "..." : item?.project}</span>
                    </td>
                    <td><Socials socials={item?.share}/></td>
                    <td className='whitespace-nowrap cursor-auto px-5' style={{ minWidth: '200px' }}>{item?.activities}</td>
                    <td className='text-left'><Link to={`/unusualActivityFrom/${item?.id}`}><i className="fas fa-edit mr-2 text-green-600"></i></Link><i className="fa-solid fa-trash text-red-600" onClick={() => handelDelete(item?.id)}></i></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <button onClick={goToForm} className='py-3 px-10 border-white border-2 rounded block mx-auto bg-red-800 text-white mt-5'>Add</button>
        </div>
      }
    </>
  )
}
