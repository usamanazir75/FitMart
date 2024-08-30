import React, { useState } from 'react'
import loginIcons from '../assets/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'; 
import imageTObase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
    securityQuestion1: "",
    answer1: "",
    securityQuestion2: "",
    answer2: ""
  })

  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUploadPic = async (e) => {
    const file = e.target.files[0]
    const imagePic = await imageTObase64(file)

    setData((prev) => ({
      ...prev,
      profilePic: imagePic
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const dataApi = await dataResponse.json()

      if (dataApi.success) {
        toast.success(dataApi.message)
        navigate("/login")
      }

      if (dataApi.error) {
        toast.error(dataApi.message)
      }

    } else {
      toast.error("Please check your confirm password")
    }
  }

  return (
    <section id='signup'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div>
              <img src={data.profilePic || loginIcons} alt='login icons'/>
            </div>
            <form>
              <label>
                <div className='text-xs bg-opacity-80 cursor-pointer bg-slate-200 pb-4 pt-2 text-center absolute bottom-0 w-full'>
                  Upload Photo
                </div>
                <input type='file' className='hidden' onChange={handleUploadPic}/>
              </label>
            </form>
          </div>

          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
              <label className='text-left'>Name:</label>
              <div className='bg-slate-100 p-2'>
                <input type='text' placeholder='Enter your name' 
                  name='name'
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'/>
              </div>
            </div>

            <div className='grid'>
              <label className='text-left'>Email:</label>
              <div className='bg-slate-100 p-2'>
                <input type='email' placeholder='Enter email' 
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'/>
              </div>
            </div>

            <div>
              <label>Password:</label>
              <div className='bg-slate-100 p-2 flex'>
                <input type={showPassword ? "text" : "password"} placeholder='Enter password' 
                  value={data.password}
                  name='password'
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'/>
                <div className='cursor-pointer text-xl' onClick={() => setShowPassword(prev => !prev)}>
                  <span>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label>Confirm Password:</label>
              <div className='bg-slate-100 p-2 flex'>
                <input type={showConfirmPassword ? "text" : "password"} placeholder='Enter confirm password' 
                  value={data.confirmPassword}
                  name='confirmPassword'
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'/>
                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword(prev => !prev)}>
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <div className='grid'>
              <label className='text-left'>Security Question 1:</label>
              <div className='relative'>
                <select name='securityQuestion1' value={data.securityQuestion1} onChange={handleOnChange} className='bg-slate-100 p-2 w-full'>
                  <option value=''>Select a question</option>
                  <option value='What is your mother’s maiden name?'>What is your mother’s maiden name?</option>
                  <option value='What was the name of your first pet?'>What was the name of your first pet?</option>
                  <option value='What was the name of your elementary school?'>What was the name of your elementary school?</option>
                </select>
              </div>
            </div>

            <div className='grid'>
              <label className='text-left'>Answer:</label>
              <div className='bg-slate-100 p-2'>
                <input type='text' name='answer1' value={data.answer1} onChange={handleOnChange} required className='w-full h-full outline-none bg-transparent'/>
              </div>
            </div>

            <div className='grid'>
              <label className='text-left'>Security Question 2:</label>
              <div className='relative'>
                <select name='securityQuestion2' value={data.securityQuestion2} onChange={handleOnChange} className='bg-slate-100 p-2 w-full'>
                  <option value=''>Select a question</option>
                  <option value='What is your mother’s maiden name?'>What is your mother’s maiden name?</option>
                  <option value='What was the name of your first pet?'>What was the name of your first pet?</option>
                  <option value='What was the name of your elementary school?'>What was the name of your elementary school?</option>
                </select>
              </div>
            </div>

            <div className='grid'>
              <label className='text-left'>Answer:</label>
              <div className='bg-slate-100 p-2'>
                <input type='text' name='answer2' value={data.answer2} onChange={handleOnChange} required className='w-full h-full outline-none bg-transparent'/>
              </div>
            </div>

            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>
              Sign up
            </button>
          </form>

          <p className='my-5'>Already have an account? <Link to={"/login"} className='text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>

        </div>
      </div>
    </section>
  )
}

export default SignUp
