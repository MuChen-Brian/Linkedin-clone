import React, { useState, useEffect } from 'react'
import LinkedinLogo from '../../../assets/linkedinLogo.png'
import { AiOutlineHome, AiOutlineUser, AiOutlineMessage, AiOutlineUserSwitch } from 'react-icons/ai'
import { FiSearch } from 'react-icons/fi'
import { BiBriefcase, BiBell } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import ProfilePopup from '../ProfilePopup'
import SearchUsers from '../SearchUsers'
import { getAllUsers } from '../../../api/FirestoreAPI'
import './index.scss'

export default function TopBar() {
    const [popupVisible, setPopupVisible] = useState(false)
    const [isSearch, setIsSearch] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [allUsers, setAllUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])

    let navigate = useNavigate()
    const gotoRote = (route) => {
        navigate(route)
    }

    /* 获取搜索的用户 */
    const handleSearch = () => {
        if (searchInput.length !== 0) {
            let searched = allUsers.filter((user) => {
                return Object.values(user.name)
                    .join("")
                    .toLowerCase()
                    .includes(searchInput.toLowerCase());
            });
            setFilteredUsers(searched);
        }
    }

    useEffect(() => {
        handleSearch()
    }, [searchInput]);

    useEffect(() => {
        getAllUsers(setAllUsers)
    }, []);
    return (
        <div className='topbar-main'>
            {/* logo */}
            <img className='top-linkedinLogo' src={LinkedinLogo} alt="" />
            {isSearch ? (
                <div className='search'>
                    <SearchUsers
                        setIsSearch={setIsSearch}
                        setSearchInput={setSearchInput}
                        setFilteredUsers={setFilteredUsers} />
                </div>) : (
                /* 图标 */
                <div className='top-icons'>
                    <AiOutlineHome size={35} className='icon' onClick={() => gotoRote("/home")} />

                    <FiSearch size={35} className='icon'
                        onClick={() => {
                            setIsSearch(true);
                        }} />

                    <AiOutlineUserSwitch size={35} className='icon' onClick={() => gotoRote("/connection")} />

                    {/*  <BiBriefcase size={35} className='icon' onClick={() => gotoRote("")} />

                    <AiOutlineMessage size={35} className='icon' />

                    <BiBell size={35} className='icon' /> */}
                </div>
            )}


            <div className='top-user' >
                <div className='user' onClick={() => setPopupVisible(!popupVisible)}> <AiOutlineUser size={35} />
                </div>
            </div>
            {/* 判断是否显示弹窗 */}
            {popupVisible && <div className="popup-position">
                <ProfilePopup />
            </div>
            }

            {/* 搜索结果 */}
            {searchInput.length === 0 ? (
                <></>
            ) : (
                <div className='search-result'>
                    {filteredUsers.length === 0 ? (
                        <div className='search-inner'>
                            未找到该用户
                        </div>
                    ) : (
                        filteredUsers.map((user) => {
                            return (
                                <div
                                    className='search-inner'
                                    key={user.id}
                                    onClick={() => {
                                        navigate("/profile", {
                                            state: {
                                                id: user.id,
                                                email: user.email,
                                            }

                                        })
                                        console.log(user.id);
                                    }

                                    }>
                                    <img src={user.imageLink} alt={user.name} />
                                    <p className='name'>{user.name}</p>
                                </div>
                            );
                        })
                    )}

                </div>
            )}
        </div>
    )
}