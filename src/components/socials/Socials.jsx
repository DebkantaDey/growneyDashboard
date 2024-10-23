
import React from 'react'
import { Link } from 'react-router-dom'
export default function Socials({ socials }) {
    return (
        <div className='flex gap-2 items-center'>
            <Link to={socials?.telegram !== undefined? socials.telegram:"#"}><i className="fa-brands fa-telegram text-xl cursor-pointer"></i></Link>
            <Link to={socials?.twitter !== undefined? socials.twitter:"#"}><i className="fa-brands fa-x-twitter text-xl cursor-pointer"></i></Link>
            <Link to={socials?.website !== undefined? socials.website:"#"}><i className="fa-solid fa-globe text-xl cursor-pointer"></i></Link>
        </div>
    )
}
