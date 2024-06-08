// Importing necessary libraries and components
import React from 'react'
import './adduser.css'; //Importing CSS for Adduser component
import { db } from '../../../../lib/firebase';
import {
    arrayUnion,
    collection,
    doc,
    getDoc,
    query,
    getDocs,
    serverTimestamp,
    setDoc,
    updateDoc,
    where
} from "firebase/firestore";
import { useState  } from 'react';
import { useUserStore } from '../../../../lib/userStore';

// Adduser component
export const Adduser = () => {
    const [user, setUser] = useState(null);

    const { currentUser } = useUserStore();

    // Handle search for a user by username
    const handleSearch = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get("username");

        try {
            const userRef = collection(db, "users");

            const q = query(userRef, where("username", "==", username));

            const querySnapShot = await getDocs(q);

            if (!querySnapShot.empty) {
                setUser(querySnapShot.docs[0].data());
            }
        } catch (err) {
            console.log(err); // Log any errors
        }
    };

    // Handle adding a user to the chat
    const handleAdd =async () => {
        const chatRef = collection(db, "chats");
        const userChatsRef = collection(db, "userchats");

        try {
            const newChatRef = doc(chatRef); // Create a new document reference in the chats collection

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(), // Set the createAt field to the server timestamp
                messages: [],
            });

            // Update the userchats document for the found user
            await updateDoc(doc(userChatsRef, user.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: currentUser.id,
                    updateAt: Date.now(),
                }),
            });

            // Update the userchats document for the current user
            await updateDoc(doc(userChatsRef, currentUser.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: user.id,
                    updateAt: Date.now(),
                }),
            });
        } catch (err) {
            console.log(err); // Log any errors
        }
    };

    // Jsx for Adduser component
    return(
        <div className='addUser'>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder='Username' name='username' />
                <button>Search</button>
            </form>
            {user && (
                <div className='user'>
                    <div className='detail'>
                        <img src={user.avatar || "./avator.jpg" } alt="" />
                        <span>{user.username}</span>
                    </div>
                    <button onClick={handleAdd}>Add User</button>
                </div>
            )}
            
        </div>
    );
};

// Exporting Adduser component as default
export default Adduser;