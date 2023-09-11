import React, { useState, useMemo } from 'react';
import { getSingleStatus, getSingleUser, postStatus, updatePost } from '../../../api/FirestoreAPI';
import PostsCard from '../PostsCard';
import { BiPencil } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';
import { uploadImage as uploadImageAPI } from '../../../api/ImageUpload';
import { getCurrentTimeStamp } from '../../../helpers/useMoment';
import FileUploadModal from '../FileUploadModal';
import { ModalComponent } from '../Modal';
import './index.scss'


export default function ProfileCard({ currentUser, onEdit }) {
    let location = useLocation();
    const [allStatus, setAllStatus] = useState([])
    const [currentProfile, setCurrentProfile] = useState({})
    const [currentImage, setCurrentImage] = useState({})
    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    const [progress, setProgress] = useState(0)
    const [status, setStatus] = useState('');
    const [isEdit, setIsEdit] = useState(false)
    const [currentPost, setCurrentPost] = useState({})
    const timeStamp = [getCurrentTimeStamp('l'), ('  '), getCurrentTimeStamp('LTS'),]
    /* 获取照片的数据 */
    const getImage = (e) => {
        setCurrentImage(e.target.files[0]);
    }
    /* 上传照片数据 */
    const uploadImage = () => {
        uploadImageAPI(currentImage, currentUser.id, currentUser, setModal1Open, setProgress, setCurrentImage)

    }
    /* 定义传送数据，传送完后关闭窗口、清空输入框 */
    const sendStatus = async () => {
        let object = {
            status: status,
            timeStamp: timeStamp,
            userEmail: currentUser.email,
            userName: currentUser.name,
            postID: getUniqueID(),
            userID: currentUser.id,
        }
        await postStatus(object)
        await setModal2Open(false)
        await setIsEdit(false)
        await setStatus('')
    };
    /* 获取当前帖子的内容 */
    const getEditData = (posts) => {
        setModal2Open(true)
        setStatus(posts?.status);
        setCurrentPost(posts)
        setIsEdit(true)
    }
    /*更新帖子内容 */
    const updateStatus = () => {
        updatePost(currentPost.id, status, timeStamp)
        setModal2Open(false)
    }
    useMemo(() => {
        /* 获取单个用户信息 */
        if (location?.state?.email) {
            getSingleUser(setCurrentProfile, location?.state?.email)
        }
        /* 获取单个用户帖子 */
        if (location?.state?.id) {
            getSingleStatus(setAllStatus, location?.state?.id)
        }
    }, [location.state])
    return (
        <>
            <FileUploadModal
                modalOpen={modal1Open}
                setModalOpen={setModal1Open}
                getImage={getImage}
                uploadImage={uploadImage}
                currentImage={currentImage}
                progress={progress}
                setCurrentImage={setCurrentImage}
            />
            {/* 对话框 */}
            <ModalComponent
                status={status}
                setStatus={setStatus}
                modalOpen={modal2Open}
                setModalOpen={setModal2Open}
                sendStatus={sendStatus}
                isEdit={isEdit}
                updateStatus={updateStatus}
            />
            <div className='profile-card-main'>
                <div className='profile-card'>
                    <div className='profile-bgc-main'>
                        {/* 头像 */}
                        <img className='profile-image'
                            src={Object.values(currentProfile).length === 0 ? currentUser?.imageLink : currentProfile?.imageLink}
                            onClick={currentUser.id === location?.state?.id ? () => { setModal1Open(true) } : () => { setModal1Open(false) }}
                        />
                    </div>

                    {/* 编辑按钮 */}
                    {currentUser.id === location?.state?.id ? (
                        <div className='edit-btn'>
                            <BiPencil className='edit-icon' onClick={onEdit} size={20} />
                        </div>
                    ) : (
                        <></>
                    )
                    }
                    <div className='profile-info'>

                        <div className='left-info'>
                            {/* 用户名 */}
                            <h3 className='username'>
                                {Object.values(currentProfile).length === 0 ? currentUser.name : currentProfile?.name}
                            </h3>
                            {/* 标题 */}
                            <p className='headline'>
                                {Object.values(currentProfile).length === 0 ? currentUser?.headline : currentProfile?.headline}
                            </p>
                            {/* 地址 */}
                            {(currentUser.country || currentUser.city) || (currentProfile?.country || currentProfile?.city) ? (
                                <p className='location'>
                                    {Object.values(currentProfile).length === 0 ? `${currentUser.country},${currentUser.city}` : `${currentProfile.country},${currentProfile.city}`}
                                </p>
                            ) : (
                                <></>
                            )}
                        </div>

                        <div className='right-info'>
                            {/* 学校 */}
                            <p className='college'>
                                {Object.values(currentProfile).length === 0 ? currentUser?.college : currentProfile?.college}
                            </p>
                            {/* 公司 */}
                            <p className='company'>
                                {Object.values(currentProfile).length === 0 ? currentUser.company : currentProfile?.company}
                            </p>
                        </div>
                    </div>
                    {/* 技能 */}
                    <p className='skills'>

                        {Object.values(currentProfile).length === 0 ? currentUser.skills : currentProfile?.skills}
                    </p>
                    {/* 关于自己 */}
                    <p className='about'>
                        {Object.values(currentProfile).length === 0 ? currentUser.about : currentProfile?.about}
                    </p>

                </div>
            </div >
            {/* 显示所有帖子 */}
            <div className='profile-contents-main' >
                {allStatus?.map((posts) => {
                    return (
                        <div className='profile-constent' key={posts.id}>
                            <PostsCard posts={posts} getEditData={getEditData} />
                        </div>
                    )
                })
                }
            </div >
        </>
    )
}
