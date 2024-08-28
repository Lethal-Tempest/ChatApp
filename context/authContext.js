import { auth, db } from "@/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid)
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unsub
    }, []);

    const updateUserData=async(userId)=>{
        const docRef=doc(db, 'users', userId);
        const docSnap=await getDoc(docRef);
        if(docSnap.exists()){
            let data=docSnap.data()
            setUser({...user, username:data.username, profileUrl:data.profileUrl, userId: data.userId})
        }
    }

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, data: response.user };
        } catch (e) {
            let errMsg = e.message;
            if (errMsg.includes("(auth/invalid-email)")) {
                errMsg = "Invalid email";
            } else if (errMsg.includes("(auth/user-not-found)")) {
                errMsg = "User not found";
            } else if (errMsg.includes("(auth/wrong-password)")) {
                errMsg = "Wrong password";
            }
            return { success: false, msg: errMsg };
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            await AsyncStorage.clear();
            return { success: true };
        } catch (e) {
            return { success: false, msg: e.message, error: e };
        }
    };

    const register = async (username, profileUrl, email, password) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", response.user.uid), {
                username,
                profileUrl,
                userId: response.user.uid
            });
            return { success: true, data: response.user };
        } catch (e) {
            let errMsg = e.message;
            if (errMsg.includes("(auth/invalid-email)")) {
                errMsg = "Invalid email";
            } else if (errMsg.includes("(auth/email-already-in-use)")) {
                errMsg = "Email already in use";
            }
            return { success: false, msg: errMsg };
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error('useAuth must be used within an AuthContextProvider');
    }
    return value;
};
