import "../css/footer.css"
import logo from "../assets/bach_logo_nobackground.png";
function Footer() {

    return (
        <div id="footer-container">
            <div id="footer-line-up-container">
                <div>
                    <img src={logo} width="200px" height={"auto"} />
                </div>
                <div id="footer-up-right-content">
                    <ul>
                        <li><p><strong>Giới Thiệu</strong></p></li>
                        <li><a>Giới thiệu về huybach</a></li>
                    </ul>
                    <ul>
                        <li><p><strong>Quy Định</strong></p></li>
                        <li><a>Hợp Đồng Điện Tử</a></li>
                        <li><a>Điều Khoản Và Điều Kiện</a></li>
                        <li><a>Chính Sách Bảo Vệ Thông Tin Cá Nhân</a></li>
                    </ul>
                    <ul>
                        <li><p><strong>Thông Báo</strong></p></li>
                        <li><a>FAQs</a></li>
                        <li><a>Liên Hệ</a></li>
                        <li><a>Góp Ý</a></li>
                    </ul>
                </div>
            </div>
            <div id="footer-line"></div>
            <div id="footer-line-down-container">
                <div>
                    <p>Thuộc sở hữu của huybach</p>
                    <p>Email: huybach290125@gmail.com </p>
                    <p>Số điện thoại: 0987654321</p>
                    <p>1 sản phẩm đc làm ra cho vui..............</p>
                </div>
            </div>
        </div>
    )
}

export default Footer