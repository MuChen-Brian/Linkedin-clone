import React, { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    getCurrentUser,
    getAllUsers,
    deletePost,
    getConnection
} from '../../../api/FirestoreAPI'
import LikeButton from '../LikeButton';
import { BiPencil, BiTrash } from 'react-icons/bi'
import "./index.scss"

export default function PostsCard({ posts, id, getEditData, select }) {
    let navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({})
    const [allUsers, setAllUsers] = useState([])
    const [isConnected, setIsConnected] = useState();
    useMemo(() => {
        getCurrentUser(setCurrentUser);
        getAllUsers(setAllUsers)
    }, []);
    useEffect(() => {
        getConnection(currentUser.id, posts.userID, setIsConnected)
    }, [currentUser.id, posts.userID]);
    return (
        select || isConnected || currentUser.id === posts.userID ? (
            /* 显示帖子内容 */
            <div className='posts-card' key={id}>
                <div className='post-img-wrapper'>
                    {/* 头像 */}
                    <img className='post-img'
                        src={
                            allUsers
                                .filter((item) => item.id === posts.userID)
                                .map((item) => item.imageLink)[0]
                        }
                    />
                    {/* 昵称+标题+时间 */}
                    <div className="post-name-timestamp">
                        <p className="post-name" onClick={() => {
                            navigate('/profile', {
                                state: {
                                    id: posts?.userID,
                                    email: posts.userEmail
                                }
                            })
                        }}>
                            {allUsers.filter((user) => user.id === posts.userID)[0]?.name}
                        </p>

                        <p className="post-headline">
                            {allUsers.filter((user) => user.id === posts.userID)[0]?.headline}
                        </p>

                        <p className="post-timestamp">
                            {posts.timeStamp}
                        </p>
                    </div>
                    {/* 修改+删除 */}
                    {currentUser.id === posts.userID ? (
                        <div className="action-container">
                            <BiPencil size={20} className='action-icon' onClick={() => getEditData(posts)} />
                            <BiTrash size={20} className='action-icon'
                                onClick={() => deletePost(posts.id)} />
                        </div>
                    ) : (<></>)
                    }
                </div>
                {/* 内容 */}
                <p className="status" > {posts.status} </p >
                {/* 图片 */}
                {
                    posts.postImage && posts.postImage.length > 0 ? (
                        <div className='post-image'>
                            {Array.isArray(posts.postImage) ? posts.postImage.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`post-image-${index}`}
                                />
                            )) : []}
                        </div>
                    ) : (
                        <></>
                    )
                }

                {/* 点赞+评论 */}
                <LikeButton userId={currentUser?.id} postId={posts.id} currentUser={currentUser} />
            </div >) : (<></>)
    )
}
