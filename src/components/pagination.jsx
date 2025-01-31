import styles from "../css/watching.module.css"

const Pagination = ({ totalPage, page, setPage, totalColumn }) => {
    return (
        <div className={styles.episodeContainer} style={{ margin: "2em 0" }}>
            <div className={styles.episodeWrapper}>
                {page > 3 && (
                    <>
                        <span className={styles.episode} style={{ backgroundColor: "aliceblue", color: "black" }} onClick={() => setPage(1)}>{"<<"}</span>
                        <span>....</span>
                    </>
                )}
                {Array.from({ length: totalPage < totalColumn ? totalPage : totalColumn }).map((_, index) => {
                    let functionPage
                    if (page <= 3) {
                        functionPage = index + 1;
                    } else if (page > totalPage - (totalColumn - 2)) {
                        functionPage = index + totalPage - (totalColumn - 1)
                    } else {
                        functionPage = index + page - (totalColumn - 3)
                    }
                    return (
                        <span onClick={() => { setPage(functionPage) }} key={index} className={styles.episode} style={functionPage == page ? { backgroundColor: "brown" } : {}}>{functionPage}</span>
                    )
                })}
                {page <= totalPage - 3 && (
                    <>
                        <span>....</span>
                        <span className={styles.episode} style={{ backgroundColor: "aliceblue", color: "black" }} onClick={() => setPage(totalPage)}>{">>"}</span>
                    </>
                )}

            </div>
        </div>
    )
}
export { Pagination }