import { useContext, useEffect, useState } from "react"
import styles from "../css/AdminManagement.module.css"
import { loginContext } from "../context/loginProvider"
import { postMethod } from "../library/API";



export const AdminManagement = () => {
    return (
        <div className="margin-header">
            <h2>User management</h2>
            <UserTable />
        </div>
    )
}


const UserTable = () => {
    const [listUser, setListUser] = useState("");
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            let result = await postMethod({}, "http://localhost:8080/Web-film/user/get-all");
            result = await result.json();
            setListUser(result.data)
        }
        fetchData()
    }, [refresh])
    return (
        <table>
            <thead>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Address</th>
                    <th>Role</th>
                    <th className={styles.actionContainer}>Action</th>
                </tr>
            </thead>
            <tbody>
                <RenderUser listUser={listUser} refresh={refresh} setRefresh={setRefresh} />
                <tr style={{ height: "2em" }}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className={styles.action}><div className={styles.addButton}>+</div></td>
                </tr>
            </tbody>
        </table>
    )
}
const RenderUser = ({ listUser, refresh, setRefresh }) => {
    const [actionId, setActionId] = useState("");
    const handleDelete = async (id) => {
        let result = await postMethod({}, `http://localhost:8080/Web-film/user/delete-user/${id}`);
        result = await result.json();
        setRefresh(!refresh);
    }
    const handleToggleInput = (id) => {
        setActionId(id);
    }
    const handleUpdate = async (id) => {
        alert("confirm" + id);
        setActionId("");
    }
    return (
        <>
            {listUser && listUser.map((item) => {
                let gender;
                let role;
                if (item.gender == 0) {
                    gender = "Male"
                } else if (item.gender == 1) {
                    gender = "Female"
                } else {
                    gender = "Unknown"
                }
                if (item.role == 1) {
                    role = "admin";
                } else if (item.role == 2) {
                    role = "management"
                }
                else {
                    role = "user"
                }
                return (
                    <tr key={item.id}>
                        <td><InputCRUD value={item.firstName} id={item.id} actionId={actionId} /></td>
                        <td><InputCRUD value={item.lastName} id={item.id} actionId={actionId} /></td>
                        <td>{item.email}</td>
                        <td><InputCRUD value={gender} id={item.id} actionId={actionId} /></td>
                        <td><InputCRUD value={item.address} id={item.id} actionId={actionId} /></td>
                        <td><InputCRUD value={role} id={item.id} actionId={actionId} /></td>
                        <td className={styles.actionContainer}>
                            <span className={[styles.action, styles.update].join(" ")} onClick={() => { actionId != item.id ? handleToggleInput(item.id) : handleUpdate(item.id) }}>{actionId != item.id ? "update" : "confirm"}</span>
                            <span className={[styles.action, actionId != item.id ? styles.delete : styles.abort].join(" ")} onClick={() => { actionId != item.id ? handleDelete(item.id) : handleToggleInput("") }}>{actionId != item.id ? "delete" : "abort"}</span>
                        </td>
                    </tr>
                )
            })}
        </>
    )
}

const InputCRUD = ({ value, id, actionId }) => {
    return (
        <>
            {id != actionId ? value : <input value={value} />}
        </>
    )
}