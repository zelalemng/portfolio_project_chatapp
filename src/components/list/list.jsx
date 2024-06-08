// Importing necessary libraries and components
import React from 'react'
import './list.css';
import { UserInfo } from './userinfo/userInfo';
import { ChatList } from './chatList/chatList';

// List component
export const List = () => {
    return(
        <div className='list'>
            <UserInfo /> {/* Rendering UserInfo component */}
            <ChatList /> {/* Rendering UserInfo component */}
        </div>
    )
}

// Exporting List component as default
export default List