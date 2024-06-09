// Importing necessary libraries and functions
import React from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { db } from "./firebase";
import { create } from "zustand";

// creating a Zustand store for user state management
export const useUserStore = create((set) => ({
    // Initial state
    currentUser: null,
    isLoading: true,

    // Function to fetch user information
    fetchUserInfo: async (uid) => {
        if (!uid) return set({ currentUser: null, isLoading: false });

        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                set({ currentUser: docSnap.data(), isLoading: false });
            } else {
                set({ currentUser: null, isLoading: false });
            }
        } catch (err) {
            // If an error occurs, log the error and set the current user to null and loading to false
            console.log(err);
            return set({ currentUser: null, isLoading: false });
        }
    },

    
}));
