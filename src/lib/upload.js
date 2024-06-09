// importing necessary fuctions from firebase storate
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";

// Function to upload a file to firebase storage
const upload = async (file) => {
    const date = new Date(); // Getting the current date
    const storageRef = ref(storage, `images/${date + file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Returning a promise that resolves with the download URL of the uploaded file 
    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // calculating and logging the upload progress
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress +'% done');
            },
            (error) => {
                reject('Something Wrong!' + error.code);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    });

};
// Exporting the upload function as the default export
export default upload;