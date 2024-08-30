import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../common'
import { FaFilter } from 'react-icons/fa';

const CategoryProduct = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")

    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el => {
        urlCategoryListObject[el] = true
    })

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList, setFilterCategoryList] = useState([])
    const [sortBy, setSortBy] = useState("")
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const fetchData = async () => {
        const response = await fetch(SummaryApi.filterProduct.url, {
            method: SummaryApi.filterProduct.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                category: filterCategoryList
            })
        })

        const dataResponse = await response.json()
        setData(dataResponse?.data || [])
    }

    const handleSelectCategory = (e) => {
        const { value, checked } = e.target

        setSelectCategory((prev) => ({
            ...prev,
            [value]: checked
        }))
    }

    useEffect(() => {
        fetchData()
    }, [filterCategoryList])

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).filter(categoryKeyName => selectCategory[categoryKeyName])

        setFilterCategoryList(arrayOfCategory)

        //format for url change when change on the checkbox
        const urlFormat = arrayOfCategory.map((el, index) => `category=${el}`).join('&&')

        navigate("/product-category?" + urlFormat)
    }, [selectCategory])

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target

        setSortBy(value)

        if (value === 'asc') {
            setData(prev => prev.sort((a, b) => a.sellingPrice - b.sellingPrice))
        }

        if (value === 'dsc') {
            setData(prev => prev.sort((a, b) => b.sellingPrice - a.sellingPrice))
        }
    }

    return (
        <div className='container mx-auto p-4'>
            {/***desktop version */}
            <div className='hidden lg:grid grid-cols-[200px,1fr]'>
                {/***left side */}
                <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
                    {/**sort by */}
                    <div className=''>
                        <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>

                        <form className='text-sm flex flex-col gap-2 py-2'>
                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"} />
                                <label>Price - Low to High</label>
                            </div>

                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"} />
                                <label>Price - High to Low</label>
                            </div>
                        </form>
                    </div>

                    {/**filter by */}
                    <div className=''>
                        <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>

                        <form className='text-sm flex flex-col gap-2 py-2'>
                            {
                                productCategory.map((categoryName, index) => (
                                    <div className='flex items-center gap-3' key={index}>
                                        <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                                        <label htmlFor={categoryName?.value}>{categoryName?.lable}</label>
                                    </div>
                                ))
                            }
                        </form>
                    </div>
                </div>

                {/***right side ( product ) */}
                <div className='px-4'>
                    <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>

                    <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
                        {
                            data.length !== 0 && !loading && (
                                <VerticalCard data={data} loading={loading} />
                            )
                        }
                    </div>
                </div>
            </div>

            {/***mobile version */}
            <div className='lg:hidden'>
                <div className='flex items-center justify-between mb-4'>
                    <button
                        className='flex items-center bg-red-600 text-white px-4 py-2 rounded-md'
                        onClick={() => setDropdownOpen(prev => !prev)}
                    >
                        <FaFilter className='mr-2' />
                        Filter
                    </button>
                </div>

                {dropdownOpen && (
                    <div className='bg-white p-2 border rounded-md shadow-md'>
                        <form className='text-sm flex flex-col gap-2'>
                            {
                                productCategory.map((categoryName, index) => (
                                    <div className='flex items-center gap-3' key={index}>
                                        <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                                        <label htmlFor={categoryName?.value}>{categoryName?.lable}</label>
                                    </div>
                                ))
                            }
                        </form>
                    </div>
                )}

                <div className='px-4'>
                    <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>

                    <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
                        {
                            data.length !== 0 && !loading && (
                                <VerticalCard data={data} loading={loading} />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryProduct
