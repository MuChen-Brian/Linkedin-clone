import React, { useState } from 'react';
import { Modal, Button, Progress } from 'antd';
import { ImFilePicture } from 'react-icons/im';
import { AiOutlineClose } from 'react-icons/ai';
import { deletePostImage, deletePostImagesByUserId } from '../../../api/FirestoreAPI'
import './index.scss'

export const ModalComponent = ({
    status,
    setStatus,
    modalOpen,
    setModalOpen,
    sendStatus,
    isEdit,
    updateStatus,
    uploadPostImage,
    setPostImage,
    postImage,
    currentUser,
    timeStamp,
}) => {
    const [progress, setProgress] = useState(0)
    return (
        <>
            {/* 对话框模板 */}
            <Modal
                title="创建帖子"
                centered
                open={modalOpen}
                onOk={async () => {
                    setModalOpen(false);
                    setStatus('');
                }}
                onCancel={() => {
                    setModalOpen(false);
                    setStatus('');
                    deletePostImagesByUserId(currentUser.id);
                }}
                footer={[
                    <Button
                        onClick={() => {
                            if (isEdit) {
                                updateStatus()
                            }
                            else {
                                sendStatus()
                            }
                            deletePostImagesByUserId(currentUser.id)
                        }}
                        key="submit"
                        type="primary"
                        disabled={status.replace(/ /g, '').length > 0 ? false : true}>
                        {isEdit ? '更新' : '发送'}
                    </Button>,//控制发送按钮的启用
                ]}
            >
                <>
                    {/* 输入框 */}
                    <input
                        className='modal-ipt'
                        placeholder='你发布什么?'
                        onChange={(e) => setStatus(e.target.value)}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                if (isEdit) {
                                    updateStatus();
                                } else {
                                    sendStatus();
                                }
                                deletePostImagesByUserId(currentUser.id)
                            }
                        }}
                        value={status} />
                    {/* 加载动画 */}
                    {progress === 0 || progress === 100 ? (
                        <></>
                    ) : (
                        <div className="progress-bar">
                            <Progress type="circle" percent={progress} />
                        </div>
                    )}
                    {/* 显示图片 */}

                    {postImage !== '' ? (
                        Array.isArray(postImage) ? postImage.map((e) => {
                            return (
                                <div className='postImage' key={e.id}>
                                    <img
                                        src={e.postImages} alt='postImage'
                                    />
                                    < AiOutlineClose
                                        onClick={() => deletePostImage(e.id)}
                                        className='close-icon' />
                                </div>
                            )
                        }) : []
                    ) : (
                        <></>
                    )}
                </>
                {/*打开文件 */}
                <label htmlFor="pic-upload">
                    <ImFilePicture
                        className='picture-icon'
                        size={32} />
                </label>
                <input
                    hidden
                    id='pic-upload'
                    type={"file"}
                    onChange={(e) => {
                        if (e.target.files.length !== 0) {
                            uploadPostImage(e.target.files[0], setPostImage, currentUser, setProgress, timeStamp);
                        }
                        e.target.value = '';
                    }
                    } />
            </Modal >
        </>
    );
};
