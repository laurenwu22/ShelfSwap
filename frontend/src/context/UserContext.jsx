import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, googleSignIn, googleSignOut } from "../services/userService";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Get current user after component is rendered
    useEffect(() => {
        async function fetchUser() {
            try {
              const currentUser = await getCurrentUser();
              setUser(currentUser);
              console.log(`current user: ${currentUser}`);
            } catch (error) {
              console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // Sign in user, update useState
    function signIn() {
        googleSignIn();
    }

    // Sign out, set user to null
    async function signOut() {
        await googleSignOut();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };