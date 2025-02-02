import { useContext, useEffect, useState } from "react";
import styles from "../css/AdminManagement.module.css";
import { postMethod, getMethod } from "../library/API";
import { LoginContext } from "../context/loginProvider";
import { Pagination } from "../components/pagination";

//isCreate == actionId dung de xac nhan xem thay input vao row nao
const defineGender = (item) => {
    if (item.gender == 0) {
        return "Male"
    } else if (item.gender == 1) {
        return "Female"
    } else {
        return "Unknown"
    }
}

const defineRole = (item) => {
    if (item.role == 0) {
        return "User"
    } else if (item.role == 1) {
        return "Admin"
    } else {
        return "Management"
    }
}
const handleOnChange = (event, setState) => {
    setState(event.target.value)
}

const arrayGender = [
    { value: 0, name: "Male" },
    { value: 1, name: "Female" },
    { value: 2, name: "Unknown" }
]
const arrayRole = [
    { value: 0, name: "User" },
    { value: 2, name: "Management" }
]
export const AdminManagement = () => {
    return (
        <div className="margin-header">
            <h2>User management</h2>
            <UserTable />
            <div style={{ height: "10em" }}></div>
        </div>
    )
}


const UserTable = () => {
    const [listUser, setListUser] = useState([]);
    const [listUserEachPage, setListUserEachPage] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState("");
    const [refresh, setRefresh] = useState(false);

    const { userData } = useContext(LoginContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");

    const [isCreate, setIsCreate] = useState(false)
    const [response, setResponse] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            let result = await getMethod("http://localhost:8080/Web-film/user/authorization/get-all");
            result = await result.json();
            setListUser(result.data)
        }
        fetchData()
    }, [refresh])
    const TOTAL_USER_EACH_PAGE = 15;
    const TOTAL_COLUMN = 5
    useEffect(() => {
        setListUserEachPage(listUser.slice(TOTAL_USER_EACH_PAGE * (page - 1), (TOTAL_USER_EACH_PAGE * page)));
        setTotalPage(Math.ceil(listUser.length / TOTAL_USER_EACH_PAGE))
    }, [listUser, page])

    useEffect(() => {
        if (response) {
            setTimeout(() => {
                setResponse("");
            }, [2000])
        }
    }, [response])

    const handleCreateUser = async () => {
        let password = prompt("password of new user");
        if (password) {
            let data = {
                firstName,
                lastName,
                gender,
                address,
                role,
                email,
                password
            }
            console.log(data)
            let result = await postMethod(data, "http://localhost:8080/Web-film/user/authorization/registration");
            result = await result.json();
            if (result.status == 200) {
                setIsCreate(false);
                setRefresh(!refresh);
                setResponse(result.message);
                setIsSuccess(true)
            } else {
                setResponse(result.message);
                setIsSuccess(false);
            }
        } else {
            setResponse("mat khau khong duoc rong")
            setIsSuccess(false);
        }
    }
    return (
        <>
            <p style={{ backgroundColor: isSuccess ? "green" : "red", opacity: response ? 1 : 0 }} className={styles.responseBox}>
                {(isSuccess) ? <i className="fa-solid fa-circle-check"></i> : <i className="fa-solid fa-ban"></i>}
                {response}
            </p>
            <table>
                <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th >Gender</th>
                        <th>Address</th>
                        <th >Role</th>
                        <th className={styles.actionContainer} >Action</th>
                    </tr>
                </thead>
                <tbody>
                    <RenderUser listUser={listUserEachPage} refresh={refresh} setRefresh={setRefresh} userData={userData} setResponse={setResponse} setIsSuccess={setIsSuccess} />
                    <tr style={{ height: "2em" }}>
                        <td><InputCRUD value={isCreate == true ? firstName : ""} id={true} actionId={isCreate} onChange={(event) => { handleOnChange(event, setFirstName) }} /></td>
                        <td><InputCRUD value={isCreate == true ? lastName : ""} id={true} actionId={isCreate} onChange={(event) => { handleOnChange(event, setLastName) }} /></td>
                        <td><InputCRUD value={isCreate == true ? email : ""} id={true} actionId={isCreate} onChange={(event) => { handleOnChange(event, setEmail) }} /></td>
                        <td><DropDownCRUD array={arrayGender} value={isCreate == true ? gender : ""} id={true} actionId={isCreate} onChange={(event) => { handleOnChange(event, setGender) }} /></td>
                        <td><InputCRUD value={isCreate == true ? address : ""} id={true} actionId={isCreate} onChange={(event) => { handleOnChange(event, setAddress) }} /></td>
                        <td><DropDownCRUD array={arrayRole} value={isCreate == true ? role : ""} id={true} actionId={isCreate} onChange={(event) => { handleOnChange(event, setRole) }} /></td>
                        <td className={styles.action} >
                            {isCreate && <span className={[styles.action, styles.update].join(" ")} onClick={handleCreateUser}>create</span>}
                            <span className={[styles.action, styles.update].join(" ")} style={{ backgroundColor: "black" }} onClick={() => { setIsCreate(!isCreate) }}>{isCreate ? "abort" : "+"}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Pagination page={page} setPage={setPage} totalPage={totalPage} totalColumn={TOTAL_COLUMN} />

        </>
    )
}
const RenderUser = ({ listUser, refresh, setRefresh, userData, setResponse, setIsSuccess }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

    const [actionId, setActionId] = useState("");
    const handleDelete = async (id) => {
        let result = await postMethod({}, `http://localhost:8080/Web-film/user/authorization/delete-user/${id}`);
        result = await result.json();
        if (result.status == 200) {
            setResponse(result.message)
            setIsSuccess(true)
        } else {
            setResponse(result.message)
            setIsSuccess(false)
        }
        setRefresh(!refresh);
    }
    const handleToggleInput = (item) => {
        setFirstName(item?.firstName)
        setLastName(item?.lastName)
        setGender(item?.gender)
        setAddress(item?.address)
        setActionId(item?.id);
        setRole(item?.role);
    }
    const handleUpdate = async (item) => {
        const data = {
            id: item.id,
            firstName,
            lastName,
            gender,
            address,
            role
        }
        let result = await postMethod(data, "http://localhost:8080/Web-film/user/authorization/update-by-admin");
        result = await result.json();
        if (result.status == 200) {
            setResponse(result.message)
            setIsSuccess(true)
        } else {
            setResponse(result.message)
            setIsSuccess(false)
        }
        setActionId("");
        setRefresh(!refresh);
    }

    return (
        <>
            {listUser && listUser.map((item) => {

                let translateGender = defineGender(item);
                let translateRole = defineRole(item)


                return (
                    <tr key={item.id}>
                        <td><InputCRUD value={actionId == item.id ? firstName : item.firstName} id={item.id} actionId={actionId} onChange={(event) => { handleOnChange(event, setFirstName) }} /></td>
                        <td><InputCRUD value={actionId == item.id ? lastName : item.lastName} id={item.id} actionId={actionId} onChange={(event) => { handleOnChange(event, setLastName) }} /></td>
                        <td>{item.email}</td>
                        <td><DropDownCRUD array={arrayGender} value={actionId == item.id ? gender : translateGender} id={item.id} actionId={actionId} onChange={(event) => { handleOnChange(event, setGender) }} /></td>
                        <td><InputCRUD value={actionId == item.id ? address : item.address} id={item.id} actionId={actionId} onChange={(event) => { handleOnChange(event, setAddress) }} /></td>
                        <td><DropDownCRUD array={arrayRole} value={actionId == item.id ? role : translateRole} id={item.id} actionId={actionId} onChange={(event) => { handleOnChange(event, setRole) }} /></td>
                        <td className={styles.actionContainer}>
                            {(item.role == 1 || item.role == userData?.role) && <span style={{ color: "black" }}>Disabled</span>}
                            {item.role != 1 && item.role != userData?.role && <span className={[styles.action, styles.update].join(" ")} onClick={() => { actionId != item.id ? handleToggleInput(item) : handleUpdate(item) }}>{actionId != item.id ? "update" : "confirm"}</span>}
                            {item.role != 1 && item.role != userData?.role && <span className={[styles.action, actionId != item.id ? styles.delete : styles.abort].join(" ")} onClick={() => { actionId != item.id ? handleDelete(item.id) : setActionId("") }}>{actionId != item.id ? "delete" : "abort"}</span>}
                        </td>
                    </tr>
                )
            })}
        </>
    )
}

const InputCRUD = ({ value, id, actionId, onChange }) => {
    return (
        <>
            {id != actionId ? value : <input value={value} onChange={onChange} />}
        </>
    )
}
const DropDownCRUD = ({ array, value, id, actionId, onChange }) => {
    return (
        <>
            {id != actionId ? value : (
                <select value={value} onChange={onChange}>
                    {array && array.map((item) => {
                        return (
                            <option key={item.value} value={item.value}>{item.name}</option>
                        )
                    })}
                </select>
            )}
        </>
    )
}
