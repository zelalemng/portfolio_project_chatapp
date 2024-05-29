import { useState } from 'react';
import './login.css';
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import upload from '../../lib/upload';


export const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: "",
    });

    const [loading, setLoading] = useState(false);

    const handleAvatar = (e) => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
            });
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);

        const { username, email, password } = Object.fromEntries(formData);

        //Input
        if (!username || !email || !password) return toast.warn("Please enter info correctly");
        if (!avatar.file) return toast.warn("Please upload profile image");

        toast.success("Account Created! You can login now!")
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const imgUrl = await upload(avatar.file);
            await setDoc(doc(db, "users", res.user.uid), {
                username,
                email,
                avatar: imgUrl,
                id: res.user.uid,
                blocked: [],
            });

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

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);

        const { email, password } = Object.fromEntries(formData);
        
        if (!email || !password) return toast.warn("Please enter info correctly");

        toast.success("Welcome back!")
        try {
            await signInWithEmailAndPassword(auth, email, password);
           
        } catch (err) {
            console.log(err);
            toast.error(err.massege);
        } finally {
            setLoading(false);
        }
        
    };

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
                <div className='separator'>
                    <div className='logo'>
                        <img src="./chat.png" alt="" />
                    </div>
                </div>
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

export default Login;