import React, { useState, useEffect } from 'react'
import ConnectionComponent from '../components/ConnectionComponent'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/common/Loader'

export default function Connection({ currentUser }) {
    const [loading, setLoading] = useState(true)
    let navigate = useNavigate();
    /* 加载动画 */
    useEffect(() => {
        onAuthStateChanged(auth, (res) => {
            if (!res?.accessToken) {
                navigate("/");
            } else {
                setLoading(false)
            }
        })
    }, [])
    return (
        loading ? <Loader /> : <ConnectionComponent currentUser={currentUser} />
    )
}
