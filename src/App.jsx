// import necessary libraries and components.
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

//Main App component
function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();
  //const user = false;

  // useEffect hook to handle authentication state changes
  useEffect(() => {
    // subscribing to authentication state changes
    const unSub = onAuthStateChanged(auth, (user) => {
      // feching user Id
      fetchUserInfo(user?.uid)
      //console.log(user.uid);
    });

    return () => {
      unSub();
    }; 
  }, [fetchUserInfo]);
  
  // conditional rendering based on loading state and current user
 if (isLoading) return <div className='loading'>Loading...</div>;

  return (
    <>
      <div className='container'> 
      
        {currentUser ? (
          <>
            <List />
            {chatId && <Chat />}  {/* Render Chat component if chatId exists */}
            {chatId && <Detail />} {/* Render Chat component if chatId exists */}
          </>
        ) : (
          <Login /> // Render Login component if no user is logged in
        )}
        <Notification />
      </div>
    </>
  );
};

// Exporting App component as default
export default App;
