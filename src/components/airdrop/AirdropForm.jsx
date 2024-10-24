import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner'


export default function AirdropForm() {

  const [logo, setLogo] = useState('')
  const [heading, setHeading] = useState('')
  const [subHeading, setSubHeading] = useState('')
  const [preview, setPreview] = useState('');
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();


  const setApiData = (type, e) => {
    switch (type) {
      case 'heading':
        setHeading(e.target.value);
        break;
      case 'subHeading':
        setSubHeading(e.target.value);
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

  //Put table data

  useEffect(() => {
    if (id !== undefined) {
      setIsLoading(true)
      getUser();
    }
  }, []);

  const [editLogo, setEditLogo] = useState('')
  const getUser = () => {
    axios.get(`https://rankterminal.com/growney/public/index.php/api/air-drop/${id}`)
      .then((response) => {
        setUser(response.data.data.collection);
        setEditLogo(response.data.data.logo)
        setHeading(response.data.data.heading)
        setSubHeading(response.data.data.sub_heading)
        setIsLoading(false)
      })
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (id === '' || id === null || id === 0 || id === undefined) {
      handleAddAPI();
    } else {
      handleUpdateAPI();
    }
  };

  const handleAddAPI = async () => {
    setIsLoading(true)

    const formdata = new FormData();
    formdata.append("logo", logo);
    formdata.append("heading", heading);
    formdata.append("sub_heading", subHeading);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };

    fetch("https://rankterminal.com/growney/public/index.php/api/air-drop", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // toast.success('Successfully added!', {
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
        alert('Successfully added!')
        setIsLoading(false)
      })
      .catch((error) =>
        // toast.error("Cant't added data", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        //   transition: Bounce,
        // })
        alert("Cant't added data")
      );
  }


  const handleUpdateAPI = async () => {
    // console.log('Edit form started', id)
    // fetch(`https://growney.in/growney/public/index.php/api/air-drop/${id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ logo, heading, subHeading }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('Success:', data);
    //     // Reset form and state after successful PUT request
    //     setLogo('')
    //     setHeading('')
    //     setSubHeading('')
    //     setIsEditMode(false);
    //     setEditId(null);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });

    setIsLoading(true)

    const formdata = new FormData();
    formdata.append("logo", logo);
    formdata.append("heading", heading);
    formdata.append("sub_heading", subHeading);

    fetch(`https://rankterminal.com/growney/public/index.php/api/air-drop/${id}`, {
      method: 'PUT', 
      body: formdata,
    })
      .then(response => response.json())
      .then(updatedData => {
        setIsLoading(false)
      })
      .catch(error => console.error('Error updating data:', error));


  };

  return (
    <div>
      <form action="" className='w-11/12 md:w-9/12 bg-red-800 items-center mx-auto px-10 md:px-20 py-4 rounded mt-5' onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor="" className='block text-white'>Logo</label>
          <input type="file" className='block text-white w-56' onChange={handleImageChange} name='logo' />
          {preview !== '' ? <img src={preview} alt="" className='h-18 w-32' /> : id !== undefined ? <img src={editLogo} alt="" className='h-18 w-32' /> : ""}
        </div>
        <div className='mb-3'>
          <label htmlFor="" className='block text-white'>Heading</label>
          <input type="text" className='block w-full py-2 px-2 rounded' onChange={(e) => setApiData('heading', e)} name='heading' value={heading} placeholder='Enter the heading'/>
        </div>
        <div className='mb-3'>
          <label htmlFor="" className='block text-white'>Sub Heading</label>
          <input type="text" className='block w-full py-2 px-2 rounded' onChange={(e) => setApiData('subHeading', e)} name='sub_heading' value={subHeading} placeholder='Enter the subheading'/>
        </div>
        <button className='block mx-auto py-3 bg-white px-8 rounded hover:shadow-x' type='submit'>Submit</button>
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
