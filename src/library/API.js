const postMethod = async (data, url) => {
    try {
        let result = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset= utf-8",
            },
            body: JSON.stringify(data)
        });
        result = await result.json()

        return result;
    } catch (e) {
        return JSON.stringify(e);
    }
}
export { postMethod } 