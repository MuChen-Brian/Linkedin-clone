import React, { useState, useMemo, useEffect } from 'react'
import { ModalComponent } from '../Modal';
import { postStatus, getPosts, updatePost, getPostImages, addPostImage } from '../../../api/FirestoreAPI';
import { uploadPostImage } from '../../../api/ImageUpload'
import PostsCard from '../PostsCard';
import { getCurrentTimeStamp } from '../../../helpers/useMoment';
import "./index.scss"

export default function PostStatus({ currentUser }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [status, setStatus] = useState('');
    const [allStatus, setAllStatus] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [currentPost, setCurrentPost] = useState({});
    const [postImage, setPostImage] = useState([])
    const [button, setButton] = useState('推荐')
    const [select, setSelect] = useState(true)
    const timeStamp = [getCurrentTimeStamp('l'), ('  '), getCurrentTimeStamp('LTS')]
    const imag = Array.isArray(postImage) ? (postImage.map((e) => e.postImages)) : ([])
    /* 定义传送数据，传送完后关闭窗口、清空输入框 */
    const sendStatus = async () => {
        let object = {
            status: status,
            timeStamp: timeStamp,
            userEmail: currentUser.email,
            userName: currentUser.name,
            userID: currentUser.id,
            postImage: Array.isArray(postImage) ? (postImage.map((e) => e.postImages)) : ([]),
            time: Array.isArray(postImage) ? (postImage.map((e) => e.time)) : ([]),
        }
        await postStatus(object)
        await setModalOpen(false)
        await setIsEdit(false)
        await setStatus('')
    };
    /* 获取当前帖子的内容 */
    const getEditData = (posts) => {
        setModalOpen(true)
        setStatus(posts?.status);
        setCurrentPost(posts)
        setIsEdit(true)
        {
            posts.postImage.forEach((e) => {
                addPostImage({ userId: currentUser.id, postImages: e, time: Date.now() })
            })
        }
    }
    /*   console.log(postImage); */
    /*更新帖子内容 */
    const updateStatus = () => {
        updatePost(currentPost.id, status, timeStamp, setStatus, imag)
        setModalOpen(false)
    }
    /*  */
    const handleButtonClick = (text) => {
        setButton(text)
    }
    /* 将获取到的值传给setAllStatus*/
    useMemo(() => {
        getPosts(setAllStatus)
    }, []);
    useEffect(() => {
        getPostImages(setPostImage, currentUser)
    }, [postImage]);
    {
        return (
            <div className="post-status-main">
                {/* 个人资料 */}
                <div className='user-details'><div className='user-bg'>
                </div>
                    <img className='user-image' src={currentUser?.imageLink} />
                    <p className='userName'>{currentUser?.name}</p>
                    <p className="headline">{currentUser?.headline}</p>
                </div>
                {/* 动态按钮 */}
                <div className='post-status'>
                    <img className='post-image' src={currentUser?.imageLink} />
                    <button className='open-post-modal' onClick={() => { setModalOpen(true); setIsEdit(false) }}>发布帖子
                    </button>
                </div>
                {/* 页面 */}
                <div className='selector'>
                    <button
                        onClick={() => { handleButtonClick('推荐'); setSelect(true) }}
                        style={{ color: button === '推荐' ? ' rgb(11, 171, 211)' : '' }}
                    >推荐</button>
                    <button
                        onClick={() => { handleButtonClick('关注'); setSelect(false) }}
                        style={{ color: button === '关注' ? ' rgb(11, 171, 211)' : '' }}>关注</button>
                </div>
                {/* 对话框 */}
                <ModalComponent
                    status={status}
                    setStatus={setStatus}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    sendStatus={sendStatus}
                    isEdit={isEdit}
                    updateStatus={updateStatus}
                    uploadPostImage={uploadPostImage}
                    currentUser={currentUser}
                    setPostImage={setPostImage}
                    postImage={postImage}
                    timeStamp={timeStamp}
                />
                {/* 将文本显示在页面上 */}
                <div className='post-contents-main'>
                    {allStatus.map((posts) => {
                        return (
                            <div className='post-content' key={posts.id}>
                                <PostsCard posts={posts} getEditData={getEditData}
                                    select={select}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
