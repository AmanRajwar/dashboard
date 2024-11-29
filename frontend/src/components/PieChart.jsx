import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
const PieChartComponent = ({ data }) => {
    return (
        <div className=' relative flex flex-col justify-center items-center'>

            <div className=" pr-20 ">
                <PieChart
                    className=''
                    series={[
                        {
                            data: data,
                        },
                    ]}
                    width={450}
                    height={200}
                />


            </div>
            <h1 className='font-roboto font-bold text-[22px] mt-20'>Pie Chart</h1>

        </div>
    )
}

export default PieChartComponent