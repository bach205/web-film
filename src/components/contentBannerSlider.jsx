import { useEffect, useState } from "react";
import styles from "../css/contentBannerSlider.module.css"
import { truncateString } from '../library/truncateString';
import VideoBox from "./videoBox";
function ContentContainerSlider({ label, array, episode = 1 }) {
    const [page, setPage] = useState(1);
    const [isLeftSlide, setIsLeftSlide] = useState(false);

    const TOTAL_PAGE = 2;
    const array1 = array.slice(0, 6);
    const array2 = array.slice(6, 12);

    useEffect(() => {
        const autoSlide = setTimeout(() => {
            onClickAfter();
        }, 5000)
        return () => {
            clearTimeout(autoSlide)
        }

    }, [page])

    const onClickAfter = () => {
        setPage(page => {
            if (page == TOTAL_PAGE) {
                return 1;
            } else {
                return page + 1;
            }
        })
    }

    const onClickBefore = () => {
        setPage(page => {
            if (page == 1) {
                return TOTAL_PAGE;
            } else {
                return page - 1;
            }
        })
    }
    return (
        <div className={styles.container}>
            <div>
                <h2 style={{ color: "aqua" }}>{label}</h2>
            </div>
            <div className={styles.containerSlider} style={{ alignItems: "center", overflow: "hidden", width: "100%" }}>
                <div className={[styles.button, styles.before].join(" ")} onClick={() => {
                    onClickBefore();
                    setIsLeftSlide(false);
                }}><i className="fa-solid fa-caret-left"></i></div>
                <div className={[styles.videoContainer, isLeftSlide ? styles.left_slide : styles.right_slide].join(" ")} style={{ transform: page == 1 && "translateX(0%)" }}>
                    {array1.length != 0 && array1.map((item) => {
                        item.description = truncateString(item.description, 150)
                        return (
                            <VideoBox item={item} key={item.id || item.movieId} label={label} episode={episode} ></VideoBox>
                        )
                    }
                    )}
                </div>
                <div className={[styles.videoContainer, isLeftSlide ? styles.left_slide : styles.right_slide].join(" ")} style={{ transform: page == 2 && "translateX(0%)" }}>
                    {array2.length != 0 && array2.map((item) => {
                        item.description = truncateString(item.description, 150)
                        return (
                            <VideoBox item={item} key={item.id || item.movieId} label={label} episode={episode} ></VideoBox>
                        )
                    }
                    )}
                </div>
                <div className={[styles.button, styles.after].join(" ")} onClick={() => {
                    onClickAfter();
                    setIsLeftSlide(true)
                }}><i className="fa-solid fa-caret-right"></i></div>
            </div>

        </div>

    )
}

export default ContentContainerSlider