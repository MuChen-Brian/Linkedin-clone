import React, { useState } from 'react'
import { editProfile } from '../../../api/FirestoreAPI'
import { AiOutlineClose } from 'react-icons/ai'
import './index.scss'

export default function ProfileEdit({ onEdit, currentUser }) {
    /* 获取到input输入的数据 */
    const [editInputs, setEditInputs] = useState({
        name: currentUser?.name || '',
        headline: currentUser?.headline || '',
        country: currentUser?.country || '',
        city: currentUser?.city || '',
        company: currentUser?.company || '',
        college: currentUser?.college || '',
        skills: currentUser?.skills || '',
        about: currentUser?.about || ''
    })
    const getInput = (e) => {
        let { name, value } = e.target;
        let input = { [name]: value };
        setEditInputs({ ...editInputs, ...input })

    }
    /* 更新数据 */
    const updateProfileData = async () => {
        await editProfile(currentUser?.id, editInputs);
        await onEdit();
    }
    return (
        <div className='profile-edit-main'>
            <div className='profile-edit'>
                {/* 关闭按钮 */}
                <div className='close-btn'>
                    <AiOutlineClose className='close-icon' onClick={onEdit} />
                </div>
                <div className='profile-edit-ipts'>
                    {/* 用户名输入框 */}
                    <label>用户名</label>
                    <input
                        onChange={getInput}
                        className='edit-ipt'
                        placeholder='Name'
                        name='name'
                        autoComplete='off'
                        value={editInputs.name}
                    />
                    {/* 标题输入框 */}
                    <label>标题</label>
                    <input
                        onChange={getInput}
                        className='edit-ipt'
                        placeholder='Headline'
                        name='headline'
                        autoComplete='off'
                        value={editInputs.headline}
                    />
                    {/* 国家输入框 */}
                    <label>国家</label>
                    <input
                        onChange={getInput}
                        className='edit-ipt'
                        placeholder='Country'
                        name='country'
                        autoComplete='off'
                        value={editInputs.country}
                    />
                    {/* 城市输入框 */}
                    <label>城市</label>
                    <input
                        onChange={getInput}
                        className="edit-ipt"
                        placeholder="City"
                        name="city"
                        autoComplete='off'
                        value={editInputs.city}
                    />
                    {/* 公司输入框 */}
                    <label>公司</label>
                    <input
                        onChange={getInput}
                        className='edit-ipt'
                        placeholder='Company'
                        name='company'
                        autoComplete='off'
                        value={editInputs.company}
                    />
                    {/* 大学输入框 */}
                    <label>大学</label>
                    <input
                        onChange={getInput}
                        className='edit-ipt'
                        placeholder='College'
                        name='college'
                        autoComplete='off'
                        value={editInputs.college}
                    />
                    {/* 技能输入框 */}
                    <label>技能</label>
                    <input
                        onChange={getInput}
                        className='edit-ipt'
                        placeholder='Skills'
                        name='skills'
                        autoComplete='off'
                        value={editInputs.skills}
                    />
                    {/* 个人简介输入框 */}
                    <label>个人简介</label>
                    <textarea
                        onChange={getInput}
                        className='edit-textarea'
                        placeholder='About Me'
                        name='about'
                        rows={5}
                        autoComplete='off'
                        value={editInputs.about}
                    />

                </div>
                {/* 保存按钮*/}
                <div className='save-container'>
                    <button onClick={updateProfileData} className='save-btn'>保 存</button>
                </div>
            </div>
        </div>
    )
}
