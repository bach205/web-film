import { useEffect, useState } from "react";
import styles from "../css/contentBannerSlider.module.css"
import { truncateString } from '../library/truncateString';
import VideoBox from "./videoBox";
const TOTAL_PAGE = 2 - 1;

function ContentContainerSlider({ label, array, episode = 1 }) {
    const [page, setPage] = useState(0);
    const [isLeftSlide, setIsLeftSlide] = useState(false);

    const array1 = array.slice(0, 6);
    const array2 = array.slice(6, 12);
    const resource = [array1, array2];


    return (
        <div className={styles.container}>
            <div>
                <h2 style={{ color: "aqua", marginTop: "0" }}>{label}</h2>
            </div>
            <div className={styles.containerSlider} style={{ alignItems: "center", width: "100%" }}>
                <ButtonPrevious page={page} setIsLeftSlide={setIsLeftSlide} setPage={setPage} />
                <Frame array={resource} page={page} isLeftSlide={isLeftSlide} />
                <ButtonNext page={page} setIsLeftSlide={setIsLeftSlide} setPage={setPage} />

            </div>

        </div>

    )
}

const Frame = ({ array, page, isLeftSlide, episode = 1 }) => {
    return (
        Array.isArray(array) && array.map((element, index) => {
            return (
                <div key={index} className={[styles.videoContainer, isLeftSlide ? styles.left_slide : styles.right_slide].join(" ")} style={{ transform: page == index && "translateX(0%)" }}>
                    {element.length != 0 && element.map((item) => {
                        item.description = truncateString(item.description, 150)
                        return (
                            <VideoBox item={item} key={item.id || item.movieId} episode={episode} ></VideoBox>
                        )
                    }
                    )}
                </div>
            )
        })
    )
}

const ButtonNext = ({ page, setPage, setIsLeftSlide }) => {
    const onClickAfter = () => {
        setPage(page => {
            if (page == TOTAL_PAGE) {
                return 1;
            } else {
                return page + 1;
            }
        })
    }
    return (
        <div className={[styles.button, styles.after].join(" ")} onClick={() => {
            onClickAfter();
            setIsLeftSlide(true)
        }} style={{ display: page == TOTAL_PAGE && "none" }}><i className="fa-solid fa-caret-right"></i></div>
    )
}

const ButtonPrevious = ({ page, setPage, setIsLeftSlide }) => {
    const onClickBefore = () => {
        setPage(page => {
            if (page == 0) {
                return TOTAL_PAGE;
            } else {
                return page - 1;
            }
        })
    }
    return (
        <div className={[styles.button, styles.before].join(" ")} onClick={() => {
            onClickBefore();
            setIsLeftSlide(false);
        }} style={{ display: page == 0 && "none" }}><i className="fa-solid fa-caret-left"></i></div>
    )
}

export default ContentContainerSlider