import logo from './logo.svg';
import './App.css';
import { Fragment, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
    const dispatch = useDispatch()
    const [cartProductCount,setCartProductCount] = useState(0)
  
    const fetchUserDetails = async()=>{
        const dataResponse = await fetch(SummaryApi.current_user.url,{
          method : SummaryApi.current_user.method,
          credentials : 'include'
        })
  
        const dataApi = await dataResponse.json()
  
        if(dataApi.success){
          dispatch(setUserDetails(dataApi.data))
        }
    }
  
    const fetchUserAddToCart = async()=>{
      const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
        method : SummaryApi.addToCartProductCount.method,
        credentials : 'include'
      })
  
      const dataApi = await dataResponse.json()
  
      setCartProductCount(dataApi?.data?.count)
    }

    useEffect(()=>{
        /**user Details */
        fetchUserDetails()
        /**user Details cart product */
        fetchUserAddToCart()
    
      },[])

    return(
        <>
        <Context.Provider value={{
            fetchUserDetails, //user details fetch
            cartProductCount, // current user add to cart product count
            fetchUserAddToCart
        }}>

        <ToastContainer
           position='top-center'
           className="custom-toast-container"
        />
        <div className='flex flex-col min-h-screen'>
             <Header/>
            <main className='flex-grow pt-16'>
            <Outlet/>
            </main>
             <Footer/>  
        </div>
          </Context.Provider>
        </>
    )
       
}

export default App;
