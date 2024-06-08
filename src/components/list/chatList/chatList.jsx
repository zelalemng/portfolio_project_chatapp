// Importing necessary libraries and components
import React, { useEffect, useState } from 'react';
import './chatList.css';
import Adduser from './addUser/adduser';
import { useUserStore } from '../../../lib/userStore';
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from '../../../lib/firebase';
import { useChatStore } from '../../../lib/chatStore';

// chatList component
export const ChatList = () => {
    const [chats, setChats] = useState([]);
    const [addMode, setAddMode] = useState(false);
    const [input, setInput] = useState("");

    const { currentUser } = useUserStore();
    const { chatId, changeChat } = useChatStore();

    // Fetch user chats when the component mounts
    useEffect(() => {
        const unSub = onSnapshot(
            doc(db, "userchats", currentUser.id), 
            async (res) => {
                const items = res.data().chats;
                const promises = items.map(async (item) => {
                    const userDocRef = doc(db, "users", item.receiverId);
                    const userDocSnap = await getDoc(userDocRef);

                    const user = userDocSnap.data();

                    return { ...item, user };
                });
                const chatData = await Promise.all(promises);
                setChats(chatData.sort((a, b) => b.updateAt - a.updateAt));
            }
        );

        return () => {
            unSub();
        };
    }, [currentUser.id]);

    const handleSelect = async (chat) => {
        const userChats = chats.map((item) => {
            const { user, ...rest } = item; // Removing user data from chat item
            return rest;
        });

        const chatIndex = userChats.findIndex(
            (item) => item.chatId === chat.chatId // Finding the index of the selected
        );
        userChats[chatIndex].isSeen = true;

        const userChatsRef = doc(db, "userchats", currentUser.id); // Reference to the user's chats document
        
        try {
            await updateDoc(userChatsRef, {
                chats: userChats, // Updating the user's chats document
            });
            changeChat(chat.chatId, chat.user); // Changing the current chat
        } catch (err) {
            console.log(err);
        }
    };

    // Filter chats based on search input
    const filteredChats = chats.filter((c) => c.user.username.toLowerCase().includes(input.toLowerCase()));

    // JSX for ChatList component
    return (
        <div className='chatlist'>
            <div className='search'>
                <div className='searchBar'>
                    <img src="./search.png" alt="" />
                    <input type="text" placeholder='Search' onChange={(e) => setInput(e.target.value)} />
                </div>
                <img src={addMode ? "./minus.png" : "./plus1.png"} alt="" className='add' onClick={() => setAddMode((prev) => !prev)} />
            </div>
            {filteredChats.map((chat) => (
                <div 
                    className='item' 
                    key={chat.chatId}
                    onClick={() => handleSelect(chat)}
                    style={{ backgroundColor: chat?.isSeen ? "transparent" : 'rgb(237, 181, 232, 0.3)',
                    }}>

                        <img
                            src={
                                chat.user.blocked.includes(currentUser.id)
                                ? "./avator.jpg"
                                : chat.user.avatar || "./avator.jpg"
                            } 
                            alt="" 
                        />
                        <div className='texts'>
                            <span>
                                {chat.user.blocked.includes(currentUser.id)
                                ? "User"
                                : chat.user.username}
                            </span>
                            <p>{chat.lastMessage}</p>
                        </div>
                </div>
             ))}
            {addMode && <Adduser />} {/* AddUser component */}
        </div>
    );
};

// Exporting chatList component as default
export default ChatList;