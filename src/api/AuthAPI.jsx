import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from 'firebase/auth'
import { auth } from '../firebaseConfig'

/* 登录 */
export const LoginAPI = (email, password) => {
    try {
        let response = signInWithEmailAndPassword(auth, email, password)
        return response;
    } catch (err) {
        alert(err.errors.message)
    }
}

/* 邮箱创建用户 */
export const RegisterAPI = (email, password) => {
    try {
        let response = createUserWithEmailAndPassword(auth, email, password)
        return response;
    } catch (err) {
        alert(err.errors.message)
    }
}

/* google创建用户 */
export const GoogleSingAPI = () => {
    try {
        let googleProvider = new GoogleAuthProvider();
        let res = signInWithPopup(auth, googleProvider)
        return res;
    } catch (err) {
        alert(err.errors.message)
    }
}

/* 注销 */
export const onLogout = () => {
    try {
        signOut(auth)
    } catch (error) {
        return error
    }
}


