import React, { useState } from 'react'
import ProfileCard from './common/ProfileCard'
import ProfileEdit from './common/ProfileEdit'

export default function ProfileComponent({ currentUser }) {
    const [isEdit, setIsEdit] = useState(false)
    const onEdit = () => {
        setIsEdit(!isEdit)
    }
    return (
        <>
            {/* 判断显示哪个页面  */}
            {isEdit ? <ProfileEdit currentUser={currentUser} onEdit={onEdit} /> : <ProfileCard currentUser={currentUser} onEdit={onEdit} />}
        </>
    )
}
