// I
import { useState } from 'react';
import './login.css';
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import upload from '../../lib/upload';

/* login and Register page*/

// Login component
export const Login = () => {
    // State to manage avatar file and URl
    const [avatar, setAvatar] = useState({
        file: null,
        url: "",
    });
    // State to manage loading status
    const [loading, setLoading] = useState(false);
    // Handle avatar upload and set state
    const handleAvatar = (e) => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
            });
        }
    };

    // Handle user registration
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);

        const { username, email, password } = Object.fromEntries(formData);

        //Input validation
        if (!username || !email || !password) return toast.warn("Please enter info correctly");
        if (!avatar.file) return toast.warn("Please upload profile image");

        toast.success("Account Created! You can login now!")
        try {

            // Create a new yser with email and password
            const res = await createUserWithEmailAndPassword(auth, email, password);
            // Upload avstar and get the URL
            const imgUrl = await upload(avatar.file);
            // Set user document in Firestore
            await setDoc(doc(db, "users", res.user.uid), {
                username,
                email,
                avatar: imgUrl,
                id: res.user.uid,
                blocked: [],
            });

            // Set user chats document in Firestore
            await setDoc(doc(db, "userchats", res.user.uid), {
                chats: [],
            });

            ;
        } catch (err) {
            console.log(err);
            toast.error(err.massege);
        } finally {
            setLoading(false);
        }
    };

    // Handle user login
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);

        const { email, password } = Object.fromEntries(formData);

        // Input validation
        if (!email || !password) return toast.warn("Please enter info correctly");

        toast.success("Welcome back!")
        try {
            // Sign in user with email and password
            await signInWithEmailAndPassword(auth, email, password);
           
        } catch (err) {
            console.log(err);
            toast.error(err.massege);
        } finally {
            setLoading(false);
        }
        
    };

    // JSX for login and register forms
    return(
        <div>
            <div className='login'>
                <div className='item'>
                    <h2>Welcome back</h2>
                    <form onSubmit={handleLogin}>
                        <input type="text" placeholder='Email' name='email' />
                        <input type="password" placeholder='Password' name='password' />
                        <button disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
                    </form>
                </div>
                <div className='separator'></div>
                <div className='item'>
                <h2>Create an Account</h2>
                    <form onSubmit={handleRegister}>
                        <label htmlFor="file">
                            <img src={avatar.url || "./avator.jpg"} alt="" />
                            Upload profile image</label>
                        <input type="file" id='file' style={{ display: "none" }} onChange={handleAvatar} />
                        <input type="text" placeholder='Username' name='username' />
                        <input type="text" placeholder='Email' name='email' />
                        <input type="password" placeholder='Password' name='password' />
                        <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
// Exporting Login component as default
export default Login;