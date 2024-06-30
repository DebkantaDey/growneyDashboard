import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner'


export default function Ido_Ieo() {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const navigation = useNavigate();
  const goToForm = () => {
    navigation("/idoForm")
  }


  const [data, setData] = useState([])
  useEffect(() => {
    axios.get(`https://growney.in/growney/public/index.php/api/ido-ieo`)
      .then((response) => {
        setData(response.data.data.collection);
        setIsLoading(false)
      })
  }, [])


  const handelDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://growney.in/growney/public/index.php/api/ido-ieo/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        toast.error('Deletation failed', {
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
        throw new Error("Failed to delete item");
      }
      else {
        toast.success('Successfully deleted!', {
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
          <div className='bg-slate-600 py-4 mt-6 overflow-x-auto mx-auto w-10/12 '>
            <table className='table-auto w-full overflow-x-auto'>
              <thead className='sticky top-0 border-b-2 border-b-white'>
                <tr>
                  <th className='text-left whitespace-nowrap sticky left-0 px-5 bg-slate-600' style={{ minWidth: '150px' }}>Project</th>
                  <th className='text-left whitespace-nowrap px-6' style={{minWidth: 'auto'}}>Backedby</th>
                  <th className='text-left whitespace-nowrap px-6' style={{minWidth: 'auto'}}>Partners</th>
                  <th className='text-left whitespace-nowrap px-6' style={{minWidth: 'auto'}}>Coin/Token Sale Partnars</th>
                  <th className='text-left whitespace-nowrap px-6' style={{minWidth: 'auto'}}>Audits</th>
                  <th className='text-left whitespace-nowrap px-6' style={{minWidth: 'auto'}}></th>
                </tr>
              </thead>
              <tbody>
                {data?.map(item =>
                  <tr className='text-white' key={item.id}>
                    <td className="flex sticky left-0 gap-x-2.5 items-center pt-2 px-2.5"  style={{ minWidth: '150px' }}><img src={item.logo} className="h-10 w-10 rounded-full"></img><span className='whitespace-nowrap'>{item.project.length > 9 && screenSize.width > 1000 ?
                      item.project.substring(0, 9) + "..." : item.project.length > 6 && screenSize.width < 1000 ? item.project.substring(0, 5) + "..." : item.project}</span></td>
                    <td className='whitespace-nowrap cursor-auto px-6' style={{minWidth: 'auto'}}>{item.backed_by}</td>
                    <td className='whitespace-nowrap cursor-auto px-6' style={{minWidth: 'auto'}}>{item.partners}</td>
                    <td className='whitespace-nowrap cursor-auto px-6' style={{minWidth: 'auto'}}>{item.coin_token_sale_partner}</td>
                    <td className='whitespace-nowrap cursor-auto px-6' style={{minWidth: 'auto'}}>{item.audits}</td>
                    <td className='text-left w-14'><Link to={`/idoForm/${item.id}`}><i className="fas fa-edit mr-2 text-green-600"></i></Link><i className="fa-solid fa-trash text-red-600" onClick={() => handelDelete(item.id)}></i></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <button onClick={goToForm} className='py-3 px-10 border-white border-2 rounded block mx-auto bg-red-800 text-white mt-6'>Add</button>
        </div>

      }
    </>
  )
}
