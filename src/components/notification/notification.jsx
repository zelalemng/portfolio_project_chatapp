import React from 'react'

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const Notification = () => {
    return(
        <div className=''>
            <ToastContainer />
        </div>
    )
};

export default Notification