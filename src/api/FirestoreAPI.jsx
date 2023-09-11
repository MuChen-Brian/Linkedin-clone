import {
    addDoc,
    collection,
    onSnapshot,
    doc,
    updateDoc,
    query,
    where,
    setDoc,
    deleteDoc,
    orderBy,
    getDocs,
} from 'firebase/firestore'
import { firestore } from '../firebaseConfig'
import { toast } from 'react-toastify'

/* 将文本添加到服务器posts */
let postsRef = collection(firestore, "posts")
export const postStatus = (object) => {
    addDoc(postsRef, object)
        .then(() => {
            toast.success('发布成功!', { autoClose: 1000, draggable: false, pauseOnFocusLoss: false })
        })
        .catch((error) => {
            console.log(error);
        })
}
/* 获取服务器posts的文本*/
export const getPosts = (setAllStatus) => {
    const getpostQuery = query(postsRef, orderBy('timeStamp', 'desc'));//根据时间排序
    onSnapshot(getpostQuery, (response) => {
        setAllStatus(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id }
            })
        )
    })
}

/* 添加数据到服务器user */
let userRef = collection(firestore, "users")
export const postUserData = (object) => {
    addDoc(userRef, object)
        .then(() => { })
        .catch((error) => {
            console.log(error);
        })
}

/* 获取所有user数据 */
export const getAllUsers = (setAllUsers) => {
    onSnapshot(userRef, (response) => {
        setAllUsers(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id }
            })
        )
    })
}

/* 获取当前用户user的文本*/
export const getCurrentUser = (setCurrentUser) => {
    onSnapshot(userRef, (response) => {
        setCurrentUser(
            response.docs
                .map((docs) => {
                    return { ...docs.data(), id: docs.id };
                })
                .filter((item) => {
                    return item.email === localStorage.getItem("userEmail");
                })[0]
        );
    });
};


/* 更新数据 */
export const editProfile = (userID, payload) => {
    let userToEdit = doc(userRef, userID)
    updateDoc(userToEdit, payload)
        .then(() => { })
        .catch((error) => {
            console.log(error);
        })
}

/* 查找id相同的数据 */
export const getSingleStatus = (setAllStatus, id) => {
    const singlePostQuery = query(postsRef, where("userID", "==", id));
    onSnapshot(singlePostQuery, (response) => {
        setAllStatus(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id }
            })
        )
    })
}

/* 查找email相同的数据 */
export const getSingleUser = (setCurrentProfile, email) => {
    const singleUserQuery = query(userRef, where("email", "==", email));
    onSnapshot(singleUserQuery, (response) => {
        setCurrentProfile(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id }
            })[0]
        )
    })
}

/* 获取点赞的id */
let likeRef = collection(firestore, 'likes')
export const LikePost = (userId, postId, liked) => {
    try {
        let docToLike = doc(likeRef, `${userId}_${postId}`)
        if (liked) {
            deleteDoc(docToLike)
        }
        else {
            setDoc(docToLike, { userId, postId })
        }
    } catch (error) {
        console.log(error);
    }
}

/* 获得用户的点赞数量 */
export const getLikesByUser = (userId, postId, setLikesCount, setLiked) => {
    try {
        let likesQuery = query(likeRef, where('postId', '==', postId))
        onSnapshot(likesQuery, (response) => {
            let likes = response.docs.map((doc) => doc.data())
            let likesCount = likes.length
            const isLiked = likes.some((like) => like.userId === userId)
            setLikesCount(likesCount)
            setLiked(isLiked)
        })

    } catch (error) {
        console.log(error);
    }
}

/* 添加评论的内容 */
let commentRef = collection(firestore, 'comments')
export const postComment = (object) => {
    addDoc(commentRef, object)
        .then(() => { })
        .catch((error) => {
            console.log(error);
        })
}

/* 获取评论的内容 */
export const getPostComments = (postId, setComments) => {
    try {
        let singlePostQuery = query(commentRef, where('postId', '==', postId))
        onSnapshot(singlePostQuery, (response) => {
            setComments(
                response.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id };
                })
            )
        })
    } catch (error) {
        console.log(error);
    }
}

/* 更新对应帖子posts中的数据 */
export const updatePost = (id, status, timeStamp, setStatus, postImage) => {
    let docToUpdate = doc(postsRef, id)
    updateDoc(docToUpdate, { status, timeStamp, postImage })
        .then(() => {
            toast.success('更新成功!', { autoClose: 1000, draggable: false, pauseOnFocusLoss: false })
            setStatus('')
        })
        .catch((error) => {
            console.log(error);
        })
}

/* 删除对应帖子 */
export const deletePost = (id) => {
    let docToDelete = doc(postsRef, id)
    try {
        deleteDoc(docToDelete)
        toast.success('删除成功!', { autoClose: 1000, draggable: false, pauseOnFocusLoss: false })
    } catch (error) {
        console.log(error);
    }
}

/* 添加关注用户信息*/
let connectionRef = collection(firestore, 'connections')
export const addConnection = (userId, targetId, isConnected) => {
    try {
        let connectionToAdd = doc(connectionRef, `${userId}_${targetId}`)
        if (!isConnected) {
            setDoc(connectionToAdd, { userId, targetId })
        }
        else (
            deleteDoc(connectionToAdd)
        )
    } catch (error) {
        console.log(error);
    }
}

/* 获取关注的用户 */
export const getConnection = (userId, targetId, setIsConnected) => {
    try {
        let connectionsQuery = query(connectionRef, where('targetId', '==', targetId))
        onSnapshot(connectionsQuery, (response) => {
            let connections = response.docs.map((doc) => doc.data())
            const isConnected = connections.some((connection) => connection.userId === userId)
            setIsConnected(isConnected)
        })
    } catch (error) {
        console.log(error);
    }
}

/* 添加post图片信息 */
let postImagesRef = collection(firestore, 'postImages')
export const addPostImage = (object) => {
    addDoc(postImagesRef, object)
        .then(() => { })
        .catch((error) => {
            console.log(error);
        })
}

/* 获取图片信息 */
export const getPostImages = (setPostImages, currentUser) => {
    try {
        let getPostImageQuery = query(postImagesRef, where('userId', '==', currentUser.id), orderBy('time', 'asc'))
        onSnapshot(getPostImageQuery, (response) => {
            setPostImages(
                response.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id };
                })
            )
        })
    } catch (error) {
        console.log(error);
    }
}

/* 删除对应id的图片 */
export const deletePostImage = (id) => {
    let docToDelete = doc(postImagesRef, id)
    try {
        deleteDoc(docToDelete)
        toast.success('删除成功!', { autoClose: 1000, draggable: false, pauseOnFocusLoss: false })
    } catch (error) {
        console.log(error);
    }
}

/* 删除对应用户id的图片 */
export const deletePostImagesByUserId = async (userId) => {
    try {
        const q = query(postImagesRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((docToDelete) => {
            deleteDoc(docToDelete.ref);
        });
    } catch (error) {
        console.log(error);
    }
}
