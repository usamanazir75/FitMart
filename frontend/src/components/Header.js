import React, { useContext, useState } from 'react';
import Logo from './Logo';
import { GrFormSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false); // Track if search is open
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className='flex items-center'>
          <Link to={"/"}>
            <Logo w={70} h={60} />
          </Link>
          <div className='lg:hidden flex items-center mr-4'> {/* Adjusted margin */}
            <GrFormSearch
              className='text-4xl cursor-pointer'
              onClick={() => setSearchOpen(prev => !prev)} // Toggle search on click
            />
          </div>
        </div>

        {/* Desktop Search Bar */}
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2'>
          <input
            type='text'
            placeholder='search product here...'
            className='w-full outline-none '
            onChange={handleSearch}
            value={search}
          />
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
            <GrFormSearch />
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className='fixed top-16 left-0 right-0 bg-white p-4 border-t shadow-md z-50'>
            <div className='flex items-center'>
              <input
                type='text'
                placeholder='search product here...'
                className='flex-grow outline-none px-2 py-1'
                onChange={handleSearch}
                value={search}
              />
              <button
                className='bg-red-600 hover:bg-red-700 text-white px-4 py-1 ml-2 rounded-full'
                onClick={() => {
                  setSearchOpen(false); // Close search on button click
                  handleSearch({ target: { value: search } });
                }}
              >
                Search
              </button>
            </div>
          </div>
        )}

        <div className='flex items-center gap-7'>
          <div className='relative flex justify-center'>
            {user?._id && (
              <div
                className='text-3xl cursor-pointer relative flex justify-center'
                onClick={() => setMenuDisplay(prev => !prev)}
              >
                {user?.profilePic ? (
                  <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Admin Panel</Link>
                  )}
                  <Link to={'/order'} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Your Orders</Link>

                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"/cart"} className='text-2xl relative'>
              <span><FaShoppingCart /></span>
              <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                <p className='text-sm'>{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
            ) : (
              <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Login</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
