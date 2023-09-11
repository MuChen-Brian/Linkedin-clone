import React, { useMemo, useState } from 'react'
import Profile from '../Pages/Profile';
import { getCurrentUser } from '../api/FirestoreAPI'
import TopBar from '../components/common/Topbar';

export default function ProfileLayout() {
    const [currentUser, setCurrentUser] = useState({})
    useMemo(() => {
        getCurrentUser(setCurrentUser)
    }, []);
    return (
        <>
            <TopBar />
            <Profile currentUser={currentUser} />
        </>
    )
}
