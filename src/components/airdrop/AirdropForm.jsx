import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner'
import { useDispatch } from 'react-redux';
import { showNotification } from '../../context/create-slice';

export default function AirdropForm() {

  const [logo, setLogo] = useState('')
  const [heading, setHeading] = useState('')
  const [subHeading, setSubHeading] = useState('')
  const [preview, setPreview] = useState('');
  const [website, setWebsite] = useState('')
  const [telegram, setTelegram] = useState('')
  const [twitter, setTwitter] = useState('')
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch=useDispatch()


  const setApiData = (type, e) => {
    switch (type) {
      case 'heading':
        setHeading(e.target.value);
        break;
      case 'subHeading':
        setSubHeading(e.target.value);
        break;
      case 'website':
        setWebsite(e.target.value);
        break;
      case 'twitter':
        setTwitter(e.target.value);
        break
      case 'telegram':
        setTelegram(e.target.value);
        break
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
        //setUser(response.data.data.collection);
        setPreview(response.data.data.logo)
        setHeading(response.data.data.heading)
        setSubHeading(response.data.data.sub_heading)
        setTelegram(response.data.data.share.telegram)
        setWebsite(response.data.data.share.website)
        setTwitter(response.data.data.share.twitter)
        setIsLoading(false)
      })
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (id === '' || id === null || id === 0 || id === undefined) {
      handleAddAPI();
    } else {
      handleUpdateRequest();
    }
  };

  const handleAddAPI = async () => {
    setIsLoading(true)

    const formdata = new FormData();
    formdata.append("logo", logo);
    formdata.append("heading", heading);
    formdata.append("sub_heading", subHeading);
    formdata.append("share[telegram]", telegram);
    formdata.append("share[website]", website);
    formdata.append("share[twitter]", twitter);

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
        setLogo('')
        setPreview('')
        setHeading('')
        setSubHeading('')
        setTelegram('')
        setTwitter('')
        setWebsite('')
        setIsLoading(false)
        dispatch(showNotification("Successfully added", "Success"))
      })
      .catch((error) =>{
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
        dispatch(showNotification("Cant't added data", "Failed"))
      }
      );
  }


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
    formdata.append("heading", heading);
    formdata.append("sub_heading", subHeading);
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

    fetch(`https://rankterminal.com/growney/public/index.php/api/air-drop/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setIsLoading(false)
        dispatch(showNotification("Successfully updated", "Success"))
      })
      .catch((error) => {
        setIsLoading(false)
        dispatch(showNotification("Update failed", "Failed"))
      });
  };
  //*************Handle Update form end************//

  return (
    <div>
      <form action="" className='w-11/12 md:w-9/12 bg-red-800 items-center mx-auto px-10 md:px-20 py-4 rounded mt-5' onSubmit={handleSubmit}>
        <div className='mb-3 md:flex'>
          <label htmlFor="" className='block text-white'>Logo</label>
          <input type="file" className='block text-white w-56' onChange={handleImageChange} name='logo' />
          <img src={preview} alt="" className='h-16 w-16 md:w-20 md:h-20 mt-2 md:mt-0' />
          {/* {preview !== '' ? <img src={preview} alt="" className='h-18 w-32' /> : id !== undefined ? <img src={editLogo} alt="" className='h-18 w-32' /> : ""} */}
        </div>
        <div className='mb-3'>
          <label htmlFor="" className='block text-white'>Heading</label>
          <input type="text" className='block w-full py-2 px-2 rounded' onChange={(e) => setApiData('heading', e)} name='heading' value={heading} placeholder='Enter the heading' />
        </div>
        <div className='mb-3'>
          <label htmlFor="" className='block text-white'>Sub Heading</label>
          <input type="text" className='block w-full py-2 px-2 rounded' onChange={(e) => setApiData('subHeading', e)} name='sub_heading' value={subHeading} placeholder='Enter the subheading' />
        </div>
        <div className='mb-3'>
          <label htmlFor="" className='block text-white'>Socials</label>
          <div className='flex justify-between items-center gap-1'>
            <input type="text" className='block w-4/12 py-2 px-2 rounded' placeholder='Website link here' value={website} onChange={(e) => setApiData('website', e)} />
            <input type="text" className='block w-4/12 py-2 px-2 rounded' placeholder='Twitter link here' value={twitter} onChange={(e) => setApiData('twitter', e)} />
            <input type="text" className='block w-4/12 py-2 px-2 rounded' placeholder='Telegram link here' value={telegram} onChange={(e) => setApiData('telegram', e)} />
          </div>
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
