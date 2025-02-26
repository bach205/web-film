import { useEffect, useState } from "react";
import { getMethod } from "../library/API"
import VideoBox from "../components/videoBox";
import styles from "../css/statics.module.css"
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { color } from "chart.js/helpers";

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


function Statics() {
    const [dat, setDat] = useState([[0], [0], [0], [0]])
    useEffect(() => {
        const fetchData = async () => {
            let result = await getMethod("http://localhost:8080/Web-film/api/movies/authorization/statics")
            result = await result.json();
            setDat(result.data);
        }
        fetchData();
    }, [])
    const data = {
        labels: ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00",
            "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
            "19:00", "20:00", "21:00", "22:00", "23:00"],
        datasets: [
            {
                label: "Phim Bộ",
                data: dat[0],
                borderColor: "red",
                backgroundColor: "rgba(124, 0, 12, 0.2)",
                tension: 0.4, // Làm mượt đường
            },
            {
                label: "Phim Lẻ",
                data: dat[1],
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.2)",
                tension: 0.4, // Làm mượt đường
            },
            {
                label: "Tổng",
                data: dat[2],
                borderColor: "green",
                backgroundColor: "rgba(0, 167, 50, 0.2)",
                tension: 0.4, // Làm mượt đường
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top"
            },
            title: {
                display: true,
                text: "Biểu đồ thống kê lượt xem",
                font: {

                    size: 20, // Cỡ chữ của tiêu đề
                    weight: "bold"
                },
                color: "white"
            },
        },
    };

    return (
        <div style={{ width: "100%" }}>
            <div className="flex-row" style={{ justifyContent: "center", backgroundColor: "aqua" }}>
                <p style={{ color: "red" }}>{"Phim Bộ: " + dat[3][0]}</p>
                <p style={{ color: "blue" }}>{"Phim Lẻ: " + dat[3][1]}</p>
                <p style={{ color: "green" }}>{"Tổng: " + (dat[3][0] + dat[3][1])}</p>
            </div>
            <Line data={data} options={options} />
        </div>
    );
}
export default Statics