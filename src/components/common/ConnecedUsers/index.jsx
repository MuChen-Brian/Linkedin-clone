import React, { useState, useEffect } from 'react'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { getConnection, addConnection } from '../../../api/FirestoreAPI'
import "./index.scss"

export default function ConnectedUsers({ currentUser, user }) {
    const [isConnected, setIsConnected] = useState(false)
    const getCurrentUser = (id) => {
        addConnection(currentUser.id, id, isConnected)
    }
    useEffect(() => {
        getConnection(currentUser.id, user.id, setIsConnected)
    }, [currentUser.id, user.id]);
    return isConnected ? (
        <div className='connections-content'>
            <img src={user.imageLink} />
            <p className='name'> {user.name}</p>
            <p className='headline'>{user.headline}</p>
            <button onClick={() => getCurrentUser(user.id, isConnected)}>
                已关注
            </button>
        </div >) : (
        <div className='connections-content'>
            <img src={user.imageLink} />
            <p className='name'> {user.name}</p>
            <p className='headline'>{user.headline}</p>
            <button onClick={() => getCurrentUser(user.id)} >
                <AiOutlineUserAdd />
                关注
            </button>
        </div >
    )
}
