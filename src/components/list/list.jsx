import React from 'react'
import './list.css';
import { UserInfo } from './userinfo/userInfo';
import { ChatList } from './chatList/chatList';

export const List = () => {
    return(
        <div className='list'>
            <UserInfo />
            <ChatList />
        </div>
    )
}

export default List