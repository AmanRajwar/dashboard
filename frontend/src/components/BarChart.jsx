"use client"

import { BarChart } from '@mui/x-charts/BarChart';
const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2563eb",
    },
    mobile: {
        label: "Mobile",
        color: "#60a5fa",
    },
}
const BarChartComponent = ({ data, selectedMonth }) => {
    return (
        <div className=" relative flex flex-col justify-center items-center pl-6 ">
            <BarChart
                className='absolute bottom-0'
                xAxis={[
                    {
                        id: 'barCategories',
                        data: data.map(item => (item.range)),
                        scaleType: 'band',
                    },
                ]}
                series={[
                    {
                        data: data.map(item => (item.count)),
                    },
                ]}
                width={500}
                height={300}
            />
            <h1 className='font-roboto font-bold text-[22px]'>Bar Chart</h1>
        </div>
    );
};

export default BarChartComponent;
