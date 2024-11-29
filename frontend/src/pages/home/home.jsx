import React, { useEffect, useState } from 'react';
import SearchComponent from '@/components/Search';
import { TableComponent } from '@/components/Table';
import apiClient from '@/lib/apiClient';
import { GET_COMBINED_ROUTE, GET_TRANSACTIONS, INITIALIZATION_ROUTE } from '@/utils/constants';
import BarChartComponent from '@/components/BarChart.jsx';
import PieChartComponent from '@/components/PieChart';
import PaginationComponent from '@/components/Pagination';

const Home = () => {
    const [selectedMonth, setSelectedMonth] = useState('March');
    const [searchQuery, setSearchQuery] = useState('');
    const [transitions, setTransitions] = useState(undefined)
    const [pieChart, setPieChart] = useState(undefined)
    const [barChart, setBarChart] = useState(undefined)
    const [statistics, setStatistics] = useState(undefined)
    const [totalPages, setTotalPages] = useState(undefined)
    const [currentPage, setCurrentPage] = useState(1);


    const handlePageChange = (page) => {
        setCurrentPage(page);
        console.log("Current Page:", page);
    };

    const handleSearch =()=>{
        getTransitions()
        getCombinedData()
    }


    const initializeDatabase = async () => {
        try {
            const initialized = await apiClient.get(INITIALIZATION_ROUTE, { withCredentials: true })
            if (!initialized.data.success) {
                return false;
            }
            return true
        } catch (error) {
            return false
        }
    }

    const getTransitions = async () => {
        try {
            const response = await apiClient.get(GET_TRANSACTIONS(selectedMonth, searchQuery, currentPage), { withCredentials: true })
            console.log(response.data.pagination);
            if (response.data.success) {
                setTransitions(response.data.transactions)
                setTotalPages(response.data.pagination.totalPages);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getCombinedData = async () => {
        try {
            setBarChart(undefined);
            setPieChart(undefined);
            setStatistics(undefined);
            const response = await apiClient.get(GET_COMBINED_ROUTE(selectedMonth), { withCredentials: true })
            if (response.data.success) {
                const data = response.data.data;
                setBarChart(data.barChart.data);
                setPieChart(data.pieChart.data);
                setStatistics(data.statistics.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        initializeDatabase().then(success => {
            getTransitions()
            getCombinedData()
        })
    }, [])


    return (
        <section className='w-[75%] h-full font-roboto flex center flex-col border shadow-md overflow-hidden bg-slate-50 rounded-lg'>
            <nav className='w-full border-b'>
                <h1 className='font-bold text-3xl my-3 ml-2'>Overview</h1>
            </nav>
            <div className="w-full h-[90vh] p-4  flex flex-col gap-4">
                {/* Main Content */}
                <div className="grid grid-cols-[2fr_1fr] gap-4 h-full">
                    {/* Left Section */}
                    <div className="border rounded-xl shadow-md border-slate-200 p-4 flex flex-col gap-4 h-full">
                        {/* Top Containers */}
                        <div className="flex justify-between gap-4">

                            <div className="w-[30%] h-20  border border-gray-200 rounded-lg shadow-md p-3">
                                <h3 className='font-semibold text-gray-500 text-opacity-[0.7] text-[12px] tracking-wide'>
                                    Total Sale Amount
                                </h3>
                                <h1 className='text-[22px] font-bold mt-2 '> {statistics ? <span> &#8377; {(statistics.totalSaleAmount).toFixed(2)}</span> : 'Loading'}</h1>
                            </div>
                            <div className="w-[30%] h-20  border border-gray-200 rounded-lg shadow-md p-3">
                                <h3 className='font-semibold text-gray-500 text-opacity-[0.7] text-[12px] tracking-wide'>
                                    Total Sold Items
                                </h3>
                                <h1 className='text-[22px] font-bold mt-2 '> {statistics ? <span> {statistics.totalSoldItems}</span> : 'Loading'}</h1>
                            </div>
                            <div className="w-[30%] h-20  border border-gray-200 rounded-lg shadow-md p-3">
                                <h3 className='font-semibold text-gray-500 text-opacity-[0.7] text-[12px] tracking-wide'>
                                    Total Not Sold Items
                                </h3>
                                <h1 className='text-[22px] font-bold mt-2 '> {statistics ? <span>  {statistics.totalNotSoldItems}</span> : 'Loading'}</h1>
                            </div>

                        </div>


                        {/* Month Select Dropdown and Search Field */}
                        <SearchComponent
                            selectedMonth={selectedMonth}
                            setSelectedMonth={setSelectedMonth}
                            setSearchQuery={setSearchQuery}
                            searchQuery={searchQuery}
                            handleSearch={handleSearch}
                        />
                        {/* List Section with fixed height and scroll */}

                        {transitions ? <ul className="space-y-4 overflow-y-auto h-[calc(80vh-200px)] scrollbar-hidden">
                            <TableComponent transitions={transitions} />
                        </ul> : <>Loading...</>}
                        <PaginationComponent
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-col gap-4 justify-between overflow-y-auto h-full pb-3  scrollbar-hidden">
                        <div className="min-h-[28rem] border rounded-xl shadow-md border-slate-200 bg-gray-100 flex items-center justify-center">
                            {/* Chart 1 Placeholder */}
                            {barChart ? <BarChartComponent data={barChart} /> : <>Loading</>}
                        </div>
                        <div className="min-h-[28rem] border rounded-xl shadow-md border-slate-200 bg-gray-100 flex items-center justify-center ">
                            {/* Chart 2 Placeholder */}
                            {pieChart ? <PieChartComponent data={pieChart} /> : <>Loading</>}

                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default Home;
