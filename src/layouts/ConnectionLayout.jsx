import React, { useState, useMemo } from 'react'
import Connection from '../Pages/Connection'
import TopBar from '../components/common/Topbar';
import { getCurrentUser } from '../api/FirestoreAPI'

export default function ConnectionLayout() {
    const [currentUser, setCurrentUser] = useState({});
    useMemo(() => {
        getCurrentUser(setCurrentUser)
    }, []);
    return (
        <>
            <TopBar />
            <Connection currentUser={currentUser} />
        </>
    )
}
