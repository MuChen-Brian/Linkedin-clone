import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../api/FirestoreAPI';
import ConnectedUsers from './common/ConnecedUsers';
import "../Sass/ConnectionComponent.scss"

export default function ConnectionComponent({ currentUser }) {
    const [allUsers, setAllUsers] = useState([])
    useEffect(() => {
        getAllUsers(setAllUsers)
    }, []);
    return (
        <div className='connection-main'>
            {allUsers.map((user) => {
                return (
                    user.id === currentUser.id ? (
                        '') : (<div
                            key={user.id} className='connection-container' >
                            <ConnectedUsers
                                currentUser={currentUser}
                                user={user}
                            />
                        </div>)
                )
            })}
        </div>
    )
}
