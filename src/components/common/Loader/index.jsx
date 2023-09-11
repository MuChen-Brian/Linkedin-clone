import React from 'react'
import { Space, Spin } from 'antd';
import "./index.scss"
export default function Loader() {
    return (
        /* 加载动画 */
        <div className='loader'>
            <p>正在加载...请等待...</p>
            <Space size="middle">
                <Spin size="large" />
            </Space>
        </div>
    )
}
