import React from 'react'
import './detail.css';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { useUserStore } from '../../lib/userStore';
import { useChatStore } from '../../lib/chatStore';

export const Detail = () => {
    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock, resetChat } = useChatStore();
    const { currentUser } = useUserStore();

    const handleBlock = async () => {
        if (!user) return;

        const userDocRef = doc(db, "users", currentUser.id);

        try {
            await updateDoc(userDocRef, {
                blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
            });
            changeBlock();
        } catch (err) {
            console.log(err);
        }
    };

    const handleLogout = () => {
        auth.signOut();
        resetChat()
    };

    return(
        <div className='detail'>
            <div className='user'>
                <img src={user?.avatar || "./avator.jpg"} alt="" />
                <h2>{user?.username}</h2>
                <p></p>
            </div>
            <div className='info'>
                <div className='option'>
                    <div className='title'>
                        <span>Chat Settings</span>
                        <img src="./arrowup.png" alt="" />
                    </div>
                </div>
                <div className='option'>
                    <div className='title'>
                        <span>privacy & help</span>
                        <img src="./arrowup.png" alt="" />
                    </div>
                </div>
                <div className='option'>
                    <div className='title'>
                        <span>Shared photos</span>
                        <img src="./arrowdown.png" alt="" />
                    </div>
                    <div className='photos'>
                        <div className='photoItem'>
                            <div className='photoDetail'>
                                <img src="./bg.jpg" alt="" />
                                <span>photo_2024_2.jpg</span>
                            </div>
                            <img src="./download.png" alt="" className='icon' />
                        </div>
                        <div className='photoItem'>
                            <div className='photoDetail'>
                                <img src="./bg.jpg" alt="" />
                                <span>photo_2024_2.jpg</span>
                            </div>
                            <img src="./download.png" alt="" className='icon' />
                        </div>
                        
                    </div>
                    <div className='option'>
                        <div className='title'>
                            <span>Shared Files</span>
                            <img src="./arrowup.png" alt="" />
                        </div>
                    </div>
                </div>
                <button onClick={handleBlock}>{isCurrentUserBlocked ? "You are Blocked!" : isReceiverBlocked ? "User blocked" : "Block User"}</button>
                <button className='logout' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Detail