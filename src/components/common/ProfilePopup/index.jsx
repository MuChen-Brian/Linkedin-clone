import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onLogout } from "../../../api/AuthAPI";
import { getCurrentUser } from "../../../api/FirestoreAPI";
import "./index.scss";

export default function ProfilePopup() {
    let navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    useMemo(() => {
        getCurrentUser(setCurrentUser);
    }, []);
    return (
        /* 弹窗 */
        <div className="popup-card">
            <p className="name">{currentUser?.name}</p>
            <p className="headline">{currentUser?.headline}</p>
            <button className="btn" onClick={() => {
                navigate("/profile", {
                    state: {
                        id: currentUser?.id,
                    }
                })
            }}>个人资料</button>
            <button className="btn" onClick={onLogout}>注销</button>
        </div>
    );
}
