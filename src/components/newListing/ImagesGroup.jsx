import React, { useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

export default function ImagesGroup({images}) {

    useEffect(()=>{
        
    },[])
    return (
        <AvatarGroup max={4} className='float-start relative'>
            {images?.map((value, index) =>
                <Avatar alt="Remy Sharp" src={value} className='h-10 w-10 rounded-full' key={index}/>
            )}
        </AvatarGroup>
    )
}
