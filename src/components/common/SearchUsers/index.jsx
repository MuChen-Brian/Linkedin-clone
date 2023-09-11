import React from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai";
import './index.scss'

export default function SearchUsers({ setIsSearch, setSearchInput }) {
    return (
        <div className='search-users'>
            <input placeholder='查找用户'
                onChange={(e) => {
                    setSearchInput(e.target.value)
                }
                }
            />
            <AiOutlineCloseCircle
                className="close-icon"
                size={25}
                onClick={() => {
                    setIsSearch(false)
                    setSearchInput('')
                }} />
        </div>
    )
}
