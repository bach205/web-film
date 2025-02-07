import { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../context/loginProvider'
import "../css/home.css"
import "../css/home.css"
import { getMethod, postMethod } from '../library/API';
import ContentContainerList from '../components/contentContainerList';
import ContentBanner from '../components/contentBanner';
import ContentContainerSlider from '../components/contentBannerSlider';

//https://trailer.vieon.vn/Teaser_BachNguyetPhanTinh_mkt.mp4
//https://trailer.vieon.vn/Teaser_NgoaiGiaHoiXuan_mkt.mp4

function Home() {
    const [movie, setMovie] = useState([
        {
            "id": 1,
            "title": "Bạch Nguyệt Phạn Tinh",
            "description": "Chuyển thể từ tiểu thuyết Bạch Thước Thượng Thần Của tác giả Tinh Linh. Bạch Tuân Nguyên soái Tướng quân là đại thần quyền uy nhất Kinh thành, không kết giao bằng hữu, chỉ một lòng muốn răng long đầu bạc với Bạch phu nhân của mình. Sau 7 năm thành hôn họ mới sinh được một cặp song sinh. Trưởng nữ tên Bạch Hi, thứ nữ là Bạch Thước (Bạch Lộc)...",
            "category": "Phim bộ",
            "releaseDate": 2025,
            "country": "Trung Quốc",
            "imageURL": "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2025/01/08/p2zkoubi_zr19ytn2_1920x1080-bachnguyenphantinh_296_168.webp"
        },
        {
            "id": 2,
            "title": "Thảm Họa Húi Beakdu",
            "description": "Núi Baekdu – ngọn núi lửa cao nhất bán đảo Triều Tiên nằm ở biên giới giữa Triều Tiên và Trung Quốc bất ngờ phun trào, khiến toàn bộ người dân trên bán đảo kinh hoàng...",
            "category": "Phim lẻ",
            "releaseDate": 2025,
            "country": "Hàn Quốc",
            "imageURL": "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2023/08/07/ybihi714_1920x1080-thamhoanuibeakdu_296_168.webp"
        },
        {
            "id": 3,
            "title": "Bàn Tay Diệt Quỷ",
            "description": "Võ sĩ MMA Yong Hoo (Park Seo Joon) đi theo con đường trừ tà trục quỷ sau khi bỗng dưng sở hữu 'Bàn tay diệt quỷ'. Đối đầu với anh là Giám mục bóng tối - tên quỷ Satan đội lốt người...",
            "category": "Phim lẻ",
            "releaseDate": 2019,
            "country": "Hàn Quốc",
            "imageURL": "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2023/03/28/f9io1ts1_1920x1080-bantaydietquy_296_168.webp"
        },
        {
            "id": 4,
            "title": "Thư Sinh Xinh Đẹp",
            "description": "Thư Sinh Xinh Đẹp xoay quanh về Tuyết Văn Hi do cha mất sớm và người em trai đau ốm, đã cải trang thành em trai để kiếm tiền nuôi sống gia đình...",
            "category": "Phim bộ",
            "releaseDate": 2019,
            "country": "Trung Quốc",
            "imageURL": "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2022/11/14/c5uvfwni_1920x1080thusinhxinhdep1_296_168.webp"
        },
        {
            "id": 5,
            "title": "Hôn Nhân Hợp Đồng",
            "description": "Hợp đồng hôn nhân vàng giữa nữ nhân gia giáo nhưng ngỗ nghịch thời Joseon Park Yeon Woo và tài phiệt vô cảm Kang Tae Ha ở thế kỷ 21.",
            "category": "Phim bộ",
            "releaseDate": 2023,
            "country": "Hàn Quốc",
            "imageURL": "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2023/10/20/74iyyz6b_1920x1080-honnhanhd_296_168.webp"
        },
        {
            "id": 6,
            "title": "Tháng Tư Lời Nói Dối Của Em",
            "description": "Âm nhạc đồng hành cùng con đường của máy đếm nhịp con người, nghệ sĩ dương cầm phi thường Kousei Arima...",
            "category": "Phim Bộ",
            "releaseDate": 2014,
            "country": "Nhật Bản",
            "imageURL": "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2021/03/05/5oqq1z12_1920x1080-thang4laloinoidoi65adf7649262f9b7ffb0dbdb59d4a844_296_168.webp"
        }
    ]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         // let result = await getMethod("http://localhost:8080/Web-film/api/movies/load-homepage")
    //         // result = await result.json();
    //         // setMovie(result.listData)


    //         // setMovie(result.listData)

    //     }
    //     fetchData()
    // }, [])


    return (
        // <div >
        //     <ContentBanner src={'https://trailer.vieon.vn/Teaser_BachNguyetPhanTinh_mkt.mp4'} title={"Bạch Nguyệt Phạn Tinh"} description={(movie.length != 0 && movie[0].length != 0 && movie[0][0].description) || ""}
        //         item={movie[0]} />
        //     <div className='content-container'>
        //         <ContentContainerSlider label={"Thịnh Hành"} array={(Array.isArray(movie[0])) ? movie[0] : []} />
        //         <ContentContainerSlider label={"Phim Bộ"} array={(Array.isArray(movie[1])) ? movie[1] : []} />
        //         <ContentContainerSlider label={"Phim Lẻ"} array={(Array.isArray(movie[2])) ? movie[2] : []} />
        //         <ContentContainerSlider label={"Anime"} array={(Array.isArray(movie[3])) ? movie[3] : []} />
        //     </div>
        // </div>
        <div >
            <ContentBanner src={'https://trailer.vieon.vn/Teaser_BachNguyetPhanTinh_mkt.mp4'} title={"Bạch Nguyệt Phạn Tinh"} description={movie[0].description}
                item={movie[0]} />
            <div className='content-container'>
                <ContentContainerSlider label={"Thịnh Hành"} array={movie} />
                <ContentContainerList label={"Phim Bộ"} array={movie} />
                <ContentContainerList label={"Phim Lẻ"} array={movie} />
                <ContentContainerList label={"Anime"} array={movie} />
            </div>
        </div>
    )
}

export default Home