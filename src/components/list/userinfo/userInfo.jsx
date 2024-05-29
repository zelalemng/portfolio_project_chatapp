import React from 'react'
import './userInfo.css';
import { useUserStore } from '../../../lib/userStore';

export const UserInfo = () => {

    const { currentUser } = useUserStore();

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

export default UserInfo;