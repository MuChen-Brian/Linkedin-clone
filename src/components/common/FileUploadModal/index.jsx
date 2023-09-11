import React from 'react';
import { Button, Modal, Progress } from 'antd';
import "./index.scss"

export default function FileUploadModal({
    modalOpen,
    setModalOpen,
    getImage,
    uploadImage,
    currentImage,
    progress,
    setCurrentImage
}) {
    return (
        <Modal
            title="更改头像"
            centered
            open={modalOpen}
            onOk={() => setModalOpen(false)}
            onCancel={() => {
                setModalOpen(false);
                setCurrentImage({})
            }}
            footer={[
                <Button
                    disabled={currentImage ? false : true} // 按钮失效
                    key="submit"
                    type="primary"
                    onClick={uploadImage}>
                    上传图片
                </Button>,
            ]}
        >
            <div className='image-upload-main'>
                {<p>{currentImage ? currentImage.name : ''}</p>}
                <label className='upload-btn' htmlFor="image-upload">选择本地图片</label>
                {progress === 0 ? (
                    <></>
                ) : (
                    <div className='progress-bar'>
                        <Progress
                            type="circle"
                            percent={progress}
                        />
                    </div>
                )}
                <input hidden id='image-upload' type={'file'} onChange={getImage} />
            </div>
        </Modal>
    )
}

