import React, { useMemo, useRef, useState } from 'react'
import { BiLike, BiSolidLike, BiComment } from 'react-icons/bi';
import { LikePost, getLikesByUser, postComment, getPostComments } from '../../../api/FirestoreAPI';
import { getCurrentTimeStamp } from '../../../helpers/useMoment';
import './index.scss'

export default function LikeButton({ userId, postId, currentUser }) {
    const [likesCount, setLikesCount] = useState(0)
    const [liked, setLiked] = useState(false)
    const [showCommentBox, setShowCommentBox] = useState(false)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    /* 引用textarea元素 */
    const textareaRef = useRef(null)
    /* 添加点赞信息 */
    const handleLike = () => {
        LikePost(userId, postId, liked)
    }
    /* 获得评论内容 */
    const getComment = (event) => {
        setComment(event.target.value);
    }
    /* 添加评论信息 */
    const addComment = async () => {
        let object = {
            postId: postId,
            comment: comment,
            timeStamp: [getCurrentTimeStamp('l'), ('  '), getCurrentTimeStamp('LT'),],
            name: currentUser.name,
        }
        await postComment(object)
        await setComment('')
    }
    /* textarea自动高度 */
    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    useMemo(() => {
        getLikesByUser(userId, postId, setLikesCount, setLiked);
        getPostComments(postId, setComments)
    }, [userId, postId]);
    return (
        <div className='like-container-main'>
            <hr />
            {/* 点赞按钮 */}
            <div className='like-container' >
                <div className='like-icon' >
                    {liked ? <BiSolidLike className='like-btn' size={25} onClick={handleLike} /> : <BiLike className='like-btn' size={25} onClick={handleLike} />}
                    <span className='count'>
                        {likesCount}
                    </span>

                </div>
                {/* 评论按钮 */}
                <div className='comment-icon' onClick={() => setShowCommentBox(!showCommentBox)}>
                    <BiComment size={25} />
                </div>
            </div>
            {
                showCommentBox ? (
                    <>
                        <div className='comment-container'>
                            <div className='comment-content'>
                                {<textarea className='comment-textarea'
                                    ref={textareaRef}
                                    placeholder='添加评论'
                                    rows="1"
                                    onChange={(e) => {
                                        getComment(e);
                                        adjustTextareaHeight()
                                    }}
                                ></textarea>}
                            </div>

                            <button
                                className='comment-btn'
                                onClick={addComment}
                                disabled={comment.replace(/ /g, '').length > 0 ? false : true}
                            >发送</button>
                        </div>
                        {comments.length > 0 ? (
                            comments.map((comment) => {
                                return (
                                    <div className="all-comments" key={comment.id}>
                                        <p className="comment-name">{comment.name}</p>
                                        <p className="comment-timestamp">{comment.timeStamp}</p>
                                        <p className="comment-content">{comment.comment}</p>
                                    </div>
                                );
                            })
                        ) : (
                            <></>
                        )}
                    </>
                ) : (
                    <></>
                )
            }
        </div >

    )
}
