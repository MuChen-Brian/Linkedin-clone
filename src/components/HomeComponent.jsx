import React from 'react'
import PostStatus from './common/PostUpdate'

export default function HomeComponent({ currentUser }) {
    return (
        <PostStatus currentUser={currentUser} />
    )
}
