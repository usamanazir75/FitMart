import React, { useEffect, useState } from 'react'
import image1 from '../assets/banner/image1.webp'
import image2 from '../assets/banner/image2.webp'
import image3 from '../assets/banner/image3.webp'
import image4 from '../assets/banner/image4.webp'
import image5 from '../assets/banner/image5.webp'




import image1Mobile from '../assets/banner/image1-mobile.jpg'
import image2Mobile from '../assets/banner/image2-mobile.jpg'
import image3Mobile from '../assets/banner/image3-mobile.jpg'
import image4Mobile from '../assets/banner/image4-mobile.jpg'
import image5Mobile from '../assets/banner/image5-mobile.jpg'


import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
  const [currentImage,setCurrentImage] = useState(0)

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ]

    const nextImage = () =>{
      if(desktopImages.length -1 > currentImage){
        setCurrentImage(preve => preve + 1)
      }
    }

    const preveImage = () =>{
      if(currentImage != 0){
        setCurrentImage(preve => preve - 1)
      }
    }

    useEffect(()=>{
      const interval = setInterval(() => {
        if(desktopImages.length -1 > currentImage){
          nextImage()
        }else{
          setCurrentImage(0)
        }
      }, 5000);
      return () => clearInterval(interval);
    },[currentImage])

  return (
    <div className='container mx-auto px-4 rounded'>
        <div className='h-56 md:h-72 w-full bg-slate-200 relative'>

          <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
            <div className='flex justify-between w-full text-2xl'>
                <button onClick={preveImage} className='bg-white shadow-md rounded-full p-1 hover:bg-red-500 hover:text-white'><FaAngleLeft /></button>
                <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1 hover:bg-red-500 hover:text-white'><FaAngleRight /></button>
            </div>
          </div>

          {/**desktop and tablet version */}
          <div className='hidden md:flex h-full w-full overflow-hidden'>
            {
                desktopImages.map((imageURl,index)=>{
                    return(
                        <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}> 
                        <img src={imageURl} className='w-full h-full' />
                     </div>
                    ) 
                })
            }
          </div>


           {/**mobile version */}
           <div className='flex h-full w-full overflow-hidden md:hidden'>
            {
                mobileImages.map((imageURl,index)=>{
                    return(
                        <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}> 
                        <img src={imageURl} className='w-full h-full' />
                     </div>
                    ) 
                })
            }
           </div>

           
        </div>
    </div>
  )
}

export default BannerProduct