import React, { useMemo, useState } from 'react'
import TopBar from '../components/common/Topbar';
import Home from '../Pages/Home'
import { getCurrentUser } from '../api/FirestoreAPI'

export default function HomeLayout() {
    const [currentUser, setCurrentUser] = useState({});
    useMemo(() => {
        getCurrentUser(setCurrentUser)
    }, []);
    return (
        <>
            <TopBar />
            <Home currentUser={currentUser} />
        </>

    )
}
