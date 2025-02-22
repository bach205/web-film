const postMethod = async (data, url) => {
    try {
        let result = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset= utf-8",

            },
            body: JSON.stringify(data),
            credentials: "include"
        });
        return result;
    } catch (e) {
        return JSON.stringify({ status: 500, message: e });
    }
}
const getMethod = async (url) => {
    try {
        let result = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=utf-8",

            },
            credentials: "include"
        });
        return result;
    } catch (e) {
        return JSON.stringify({ status: 500, message: e });
    }
}
export { postMethod, getMethod } 