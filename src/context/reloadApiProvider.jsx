import { createContext, useState } from "react";

const ReLoadApiContext = createContext();

const ReloadApiProvider = ({ children }) => {
    //dung de fetch lai api de cap nhap giao dien
    const [refresh, setRefresh] = useState(false);
    return (
        <ReLoadApiContext.Provider value={{ refresh, setRefresh }}>
            {children}
        </ReLoadApiContext.Provider>
    )
}

export { ReLoadApiContext, ReloadApiProvider };
