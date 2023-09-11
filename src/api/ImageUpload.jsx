import { storage } from "../firebaseConfig"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { editProfile, addPostImage } from "./FirestoreAPI"

/* 上传图片 */
export const uploadImage = (
    file,
    id,
    currentUser,
    setModal1Open,
    setProgress,
    setCurrentImage
) => {
    const profilePicsRef = ref(storage, `profileImages/${currentUser.name}/${time}-${file.name}`)
    const uploadTask = uploadBytesResumable(profilePicsRef, file)

    uploadTask.on('state_changed',
        (snapshot) => {
            const Progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(Progress);
        },
        (error) => {
            console.log(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
                (res) => {
                    editProfile(id, { imageLink: res }); // 将图片的URL保存到users对应id中
                    setModal1Open(false);
                    setCurrentImage({});
                    setProgress(0);
                })
        }
    )
}


/* 上传帖子图片 */
export const uploadPostImage = (
    file,
    setPostImage,
    currentUser,
    setProgress,
) => {
    let time = Date.now()
    const postPicsRef = ref(storage, `postImages/${currentUser.name}/${time}-${file.name}`)
    const uploadTask = uploadBytesResumable(postPicsRef, file)

    uploadTask.on('state_changed',
        (snapshot) => {
            const Progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(Progress);
        },
        (error) => {
            setProgress(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
                (res) => {
                    if (res !== '') {
                        addPostImage(
                            {
                                userId: currentUser.id,
                                postImages: res,
                                time: time
                            });
                        setPostImage();
                    }
                })
        }
    )
}