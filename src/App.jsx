import { useEffect, useState } from 'react'
import reactLogo from './chat.png'
import viteLogo from '/chat.png'
import './App.css';
import List from './components/list/list';
import Chat from './components/chat/chat';
import Detail from './components/detail/detail';
import Login from './components/login/login';
import Notification from './components/notification/notification';
import { onAuthStateChanged } from 'firebase/auth';
import { useUserStore } from './lib/userStore';
import { auth } from './lib/firebase';
import { useChatStore } from './lib/chatStore'

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();
  //const user = false;

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid)
      //console.log(user.uid);
    });

    return () => {
      unSub();
    }; 
  }, [fetchUserInfo]);
  //console.log(currentUser);

 if (isLoading) return <div className='loading'>Loading...</div>;

  return (
    <>
      <div className='container'>
        {currentUser ? (
          <>
            <List />
            {chatId && <Chat />}
            {chatId && <Detail />}
          </>
        ) : (
          <Login />
        )}
        <Notification />
      </div>
    </>
  );
};

export default App;
