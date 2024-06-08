// import necessary libraries and components.
import React from 'react'
import './userInfo.css';
import { useUserStore } from '../../../lib/userStore';

// UserInfo component
export const UserInfo = () => {

    const { currentUser } = useUserStore(); // Destructuring currentUser from user store

    return(
        <div className='userinfo'>
            <div className='user'>
                <img src={currentUser.avatar || "./avator.jpg"} alt="" />
                <h2>{currentUser.username}</h2>
            </div>
            <div className='icons'>
                <img src='./more.png' alt='' />
                <img src='./video.png' alt='' />
                <img src='./edit1.png' alt='' />
            </div>
        </div>
    );
};

// Exporting UserInfo component as default
export default UserInfo;