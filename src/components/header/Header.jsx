import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

export default function Header() {

  // const active = {
  //   color: 'red',
  //   textDecoration: 'underline'
  // }
  // const unActive = {
  //   color: 'rgb(148 163 184)',
  //   textDecoration: 'none'
  // }

  const links = [
    {
      id: 0,
      to: "/newListing",
      name: "NewListing"
    },
    {
      id: 1,
      to: "/ido",
      name: "IDO/IEO"
    },
    {
      id: 2,
      to: "/newProject",
      name: "NewlyProject"
    },
    {
      to: "/airdrop",
      name: "Airdrop"
    },
    {
      id: 3,
      to: "/fundingRound",
      name: "Funding Round"
    },
    {
      id: 4,
      to: "/ecoSystem",
      name: "EcoSystem"
    },
    {
      id: 5,
      to: "/hot-news",
      name: "Hot News"
    },
    {
      id: 6,
      to: "/unusualActivity",
      name: "Unusual Activity"
    },
    {
      id: 6,
      to: "/killerProject",
      name: "Killer Projects"
    },
  ]

  const [sidebar, setSidebar] = useState(false)
  const [upNav, setUpNav] = useState(true)

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

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenSize.width > 1100) {
      setSidebar(false)
    }

  }, [screenSize.width])

  const [activeColor, setActiveColor] = useState(false)
  const colorChange = (id) => {
    if (id == links.id) {
      setActiveColor(true)
    }
    else {
      setActiveColor(false)
    }
  }


  const [isActive, setActive] = useState("NewListing")
  const handleActive = (name) => {
    setActive(name)
  }
  return (
    <>
      <div className='w-full bg-slate-400 h-16 flex justify-between'>
        <i className="fa-solid fa-bars w-1/12 flex justify-center items-center text-xl cursor-pointer" style={{ display: screenSize.width < 1100 ? 'flex' : 'none' }} onClick={() => setSidebar(true)}></i>
        <ul className=' flex items-center justify-center gap-5 w-11/12 text-lg ' style={{ display: upNav && screenSize.width > 1100 ? 'flex' : 'none' }}>
          {
            links.map((item, index) =>
              <Link to={item.to} key={index}><li className={`cursor-pointer px-1 py-2 whitespace-nowrap ${item.name == isActive ? 'font-bold text-blue-500' : ''}`}
                onClick={() => handleActive(item.name)}>{item.name}</li></Link>
            )
          }
        </ul>

      </div>
      <div className='h-full bg-slate-400  absolute top-0 left-0 w-11/12 px-6 pt-20 hidden md:w-4/12 sm:w-6/12 z-10' style={{ display: sidebar && screenSize.width < 1100 ? 'block' : 'none' }}>
        <span className='text-2xl font-semibold absolute top-6 right-6 cursor-pointer' onClick={() => setSidebar(!sidebar)}>X</span>
        <ul className=' flex flex-col justify-start gap-5 w-full text-lg'>
          {
            links.map((item, index) =>
              <Link to={item.to} key={index}><li className={`cursor-pointer px-2 py-2 whitespace-nowrap ${item.name == isActive ? 'font-bold text-blue-500' : ''}`}
                onClick={() => handleActive(item.name)}
              >{item.name}</li></Link>
            )
          }
        </ul>
      </div>
    </>
  )
}
