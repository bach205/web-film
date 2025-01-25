import { useContext, useEffect, useState } from 'react'
import { loginContext } from '../context/loginProvider'
import "../css/home.css"
import Button from '../components/form/button';
import "../css/home.css"
import VideoBox from '../components/videoBox';
import bachnguyetphantinh from "../assets/movie/bachnguyetphantinh.webp"

function Home() {
    const { isLogin, setIsLogin } = useContext(loginContext);
    const { userData, setUserData } = useContext(loginContext);

    useEffect(() => {
        console.log(userData)
    }, [isLogin])

    return (
        <>
            <div className='video-container'>
                <video src='https://trailer.vieon.vn/Teaser_NgoaiGiaHoiXuan_mkt.mp4' autoPlay muted loop>
                </video>
                <div className='list-container'>
                    <h1 style={{ marginTop: "0", marginBottom: "20px" }}>Ten film</h1>
                    <p>day la bo phim gi do alo alo 12 3 4 4 test okay okay halo halo</p>
                    <div className='button-list'>
                        <Button type='watch-now-button' >
                            xem ngay
                        </Button>
                        <Button type='watch-later-button' >
                            xem sau
                        </Button>
                    </div>
                </div>
            </div>
            <div className='content-container'>
                <h2>Thịnh Hành</h2>
                <div className='content-container-slider'>
                    <VideoBox url={bachnguyetphantinh} />
                    <VideoBox url={bachnguyetphantinh} />
                    <VideoBox url={bachnguyetphantinh} />
                    <VideoBox url={bachnguyetphantinh} />
                    <VideoBox url={bachnguyetphantinh} />
                    <VideoBox url={bachnguyetphantinh} />
                </div>
            </div>
        </>
    )
}

export default Home