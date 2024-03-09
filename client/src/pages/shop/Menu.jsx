import React, { useEffect, useState } from 'react'
import Card from "../../components/Card"
import { FaFilter } from "react-icons/fa"

export default function Menu() {
    const [menu, setMenu] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [sortOption, setSortOption] = useState("default")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(8)

    // loading data
    useEffect(() => {
        // fetching data from the backend
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/menu")
                const data = await response.json()
                setMenu(data)
                setFilteredItems(data)
            } catch (error) {
                console.error("Fetching data failed", error)
            }
        }
        // calling function
        fetchData()
    }, [])

    // filtering data based on category
    const filterData = (category) => {
        const filtered = category === "all" ? menu : menu.filter((item) => item.category === category)
        setFilteredItems(filtered)
        setSelectedCategory(category)
        setCurrentPage(1)
    }

    // showing all data
    const showAll = () => {
        setFilteredItems(menu)
        setSelectedCategory("all")
        setCurrentPage(1)
    }

    // sorting based on A-Z, Z-A, Low-High, High-Lowe price
    const handleSortData = (option) => {
        setSortOption(option)
        let sortedItems = [...filteredItems]
        switch (option) {
            case "A-Z":
                sortedItems.sort((a, b) => a.name.localeCompare(b.name))
                break
            case "Z-A":
                sortedItems.sort((a, b) => b.name.localeCompare(a.name))
                break
            case "Low-High":
                sortedItems.sort((a, b) => a.price - b.price)
                break
            case "High-Low":
                sortedItems.sort((a, b) => b.price - a.price)
                break
            default:
                break
        }
        setFilteredItems(sortedItems)
        setCurrentPage(1)
    }

    // pagination
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className='bg-white text-secondary'>
            {/* menu banner */}
            <div className='section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
                <div className='pt-48 pb-24 flex flex-col justify-center items-center gap-8'>
                    {/* text */}
                    <div className='space-y-7 text-secondary text-center'>
                        <h2 className='text-4xl md:text-5xl font-bold leading-snug md:leading-tight'>
                            For the Love of Delicious <span className='text-green'>Food</span>
                        </h2>
                        <p className='text-xl text-[#4A4A4A] md:w-3/4 mx-auto'>
                            Come with family & feel the joy of mouthwatering food such as Greek Salad, Lasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas Rellenas and more for a moderate cost
                        </p>
                        <button className='btn border-none rounded-full bg-green hover:bg-green px-7 py-3 font-semibold text-white hover:text-white hover:opacity-70 cursor-pointer'>Order Now</button>
                    </div>
                </div>
            </div>

            {/* menu shop */}
            <div className='px-0 lg:px-0 xl:px-24 pt-16 pb-8'>
                {/* filtering & sorting */}
                <div className='px-4 md:px-8 lg:px-4 flex flex-col md:flex-row justify-between items-center space-y-4 mb-2'>
                    {/* filtering btns */}
                    <div className='flex flex-row justify-start md:items-center gap-4 md:gap-8 flex-wrap'>
                        <button onClick={showAll} className={selectedCategory === "all" ? "active" : ""}>All</button>
                        <button onClick={() => filterData("pizza")} className={selectedCategory === "pizza" ? "active" : ""}>Pizza</button>
                        <button onClick={() => filterData("salad")} className={selectedCategory === "salad" ? "active" : ""}>Salad</button>
                        <button onClick={() => filterData("soup")} className={selectedCategory === "soup" ? "active" : ""}>Soup</button>
                        <button onClick={() => filterData("dessert")} className={selectedCategory === "dessert" ? "active" : ""}>Dessert</button>
                        <button onClick={() => filterData("drink")} className={selectedCategory === "drink" ? "active" : ""}>Drink</button>
                    </div>
                    {/* sorting section */}
                    <div className='flex flex-row justify-end lg:mr-1'>
                        <div className='bg-secondary p-2 rounded-l'>
                            <FaFilter className='h-4 w-4 text-white' />
                        </div>
                        {/* sorting options */}
                        <select name="sort" id="sort" onChange={(e) => handleSortData(e.target.value)} value={sortOption} className='bg-secondary text-white px-2 py-1 rounded-r outline-none'>
                            <option value="default">Default</option>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                            <option value="Low-High">Low-High</option>
                            <option value="High-Low">High-Low</option>
                        </select>
                    </div>
                </div>
                {/* products card */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 sm:mx-8 md:mx-8 lg:mx-0 lg:mr-10 xl:mx-0'>
                    {currentItems.map((item) => (
                        <Card key={item._id} item={item} />
                    ))}
                </div>
            </div>

            {/* menu pagination */}
            <div className='flex justify-center pt-4 pb-20'>
                {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div >
    )
}
