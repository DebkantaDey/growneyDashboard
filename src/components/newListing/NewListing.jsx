import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImagesGroup from './ImagesGroup';
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner'
import Socials from '../socials/Socials';

export default function NewListing() {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const navigation = useNavigate();
  const goToForm = () => {
    navigation("/newListingForm")
  }


  const [data, setData] = useState([])
  useEffect(() => {
    axios.get(`https://rankterminal.com/growney/public/index.php/api/new-listing`)
      .then((response) => {
        setData(response.data.data.collection);
        setIsLoading(false)
        console.log(response.data.data.collection)
      })
  }, [])


  const handelDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://rankterminal.com/growney/public/index.php/api/new-listing/${id}`, {
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
        alert('Deletation failed')
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
        <div className=" w-full bg-slate-600 py-4 mt-6">
          <div className='mx-auto mt-3 w-10/12 overflow-x-auto'>
            <table className="table-auto w-full overflow-x-auto">
              <thead className="sticky top-0 border-b-2 border-b-white">
                <tr className="size w-full">
                  <th scope="col" className="sticky left-0 px-5 text-left bg-slate-600" style={{ minWidth: '150px' }}>Name</th>
                  {/* <th scope="col" className='text-left px-5' style={{ minWidth: 'auto' }}>Date</th> */}
                  <th className='text-left'>Socials</th>
                  <th scope="col" className='text-left whitespace-nowrap px-5' style={{ minWidth: 'auto' }}>Backed by / investors</th>
                  <th scope="col" className='text-left px-5' style={{ minWidth: 'auto' }}>Category</th>
                  <th scope="col" className='text-left px-5' style={{ minWidth: 'auto' }}>Network</th>
                  <th scope="col" className='text-left whitespace-nowrap px-5' style={{ minWidth: 'auto' }}>Max Supply</th>
                  <th className='text-left' style={{ minWidth: 'auto' }}></th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item) =>
                  <tr className="item-name size border-b border-slate-400 text-white w-full" key={item?.id}>
                    <td className="flex sticky left-0  gap-x-2.5 items-center pt-2 px-5 bg-slate-600" style={{ minWidth: '150px', zIndex: 1 }}><img src={item?.logo} className="h-10 w-10 rounded-full"></img><span className='whitespace-nowrap'>{item?.name.length > 9 && screenSize.width > 1000 ?
                      item?.name.substring(0, 9) + "..." : item?.name.length > 6 && screenSize.width < 1000 ? item?.name.substring(0, 5) + "..." : item?.name}</span>
                    </td>
                    <td><Socials socials={item?.share}/></td>
                    {/* <td className='whitespace-nowrap cursor-auto px-5' style={{minWidth: 'auto'}}>{item?.created_on}</td> */}
                    <td className=" whitespace-nowrap cursor-auto px-5" style={{minWidth: 'auto'}}><ImagesGroup images={item?.investors} /></td>
                    <td className='whitespace-nowrap cursor-auto px-5' style={{minWidth: 'auto'}}>{item?.category}</td>
                    <td className='whitespace-nowrap cursor-auto px-5' style={{minWidth: 'auto'}}>{item?.network}</td>
                    <td className='whitespace-nowrap cursor-auto px-5' style={{minWidth: 'auto'}}>{item?.max_supply}</td>
                    <td className='text-left flex'><Link to={`/newListingForm/${item?.id}`}><i className="fas fa-edit mr-2 text-green-600"></i></Link><i className="fa-solid fa-trash text-red-600" onClick={() => handelDelete(item?.id)}></i></td>
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
