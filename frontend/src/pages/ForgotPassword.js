import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
    securityQuestion1: "",
    answer1: "",
    securityQuestion2: "",
    answer2: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.newPassword === data.confirmNewPassword) {
      try {
        const response = await fetch(SummaryApi.forgotPassword.url, {
          method: SummaryApi.forgotPassword.method,
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
          toast.success(result.message);
          navigate("/login");
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    } else {
      toast.error("New password and confirm password do not match.");
    }
  };

  return (
    <section id='forgot-password'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
          <h2 className='text-center text-2xl font-bold mb-4'>Forgot Password</h2>
          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            {/* Enter Email */}
            <div className='grid'>
              <label className='text-left'>Email:</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>

            {/* Security Question 1 */}
            <div className='grid'>
              <label className='text-left'>Security Question 1:</label>
              <div className='relative'>
                <select
                  name='securityQuestion1'
                  value={data.securityQuestion1}
                  onChange={handleOnChange}
                  required
                  className='bg-slate-100 p-2 w-full'
                >
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
                <input
                  type='text'
                  name='answer1'
                  value={data.answer1}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>

            {/* Security Question 2 */}
            <div className='grid'>
              <label className='text-left'>Security Question 2:</label>
              <div className='relative'>
                <select
                  name='securityQuestion2'
                  value={data.securityQuestion2}
                  onChange={handleOnChange}
                  required
                  className='bg-slate-100 p-2 w-full'
                >
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
                <input
                  type='text'
                  name='answer2'
                  value={data.answer2}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>

            {/* New Password */}
            <div className='grid'>
              <label className='text-left'>New Password:</label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder='Enter new password'
                  name='newPassword'
                  value={data.newPassword}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
                <div
                  className='cursor-pointer text-xl'
                  onClick={() => setShowNewPassword((prev) => !prev)}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            {/* Confirm New Password */}
            <div className='grid'>
              <label className='text-left'>Confirm New Password:</label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showConfirmNewPassword ? "text" : "password"}
                  placeholder='Confirm new password'
                  name='confirmNewPassword'
                  value={data.confirmNewPassword}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
                <div
                  className='cursor-pointer text-xl'
                  onClick={() => setShowConfirmNewPassword((prev) => !prev)}
                >
                  {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <button
              className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[200px] rounded-full hover:scale-110 transition-all mx-auto block mt-4 whitespace-nowrap'
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
