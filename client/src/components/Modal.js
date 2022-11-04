import { React, useEffect, useRef, useState } from 'react'

const Modal = ({ socket, showModal, setshowModal, selectedItemID }) => {

    const modalRef = useRef();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            setshowModal(!showModal);
        }
    }
    const addComment = (e) => {
        e.preventDefault();
        socket.emit("updateComment", {
            todoId : selectedItemID,
            comment,
            user : localStorage.getItem("_username"),
        });
        setComment("");
    };

    useEffect(() => {
        socket.on("commentReceived", (todo) => setComments(todo.comments));
    }, [socket]);
    
    return (
        <div className='modal' onClick={(closeModal)} ref={modalRef}>
            <div className='modal__container'>
                <h2>Comments</h2>
                <form className='comment__form' onSubmit={addComment}>
                    <input
                        className='comment__input'
                        type='text'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                    <button>Add Comment</button>
                </form>
                <div className='comments__container'>
                    {comments.length > 0 ? (
                        comments.map((item, index) => (
                            <div className='comment' key={index}>
                                <p>
                                    <strong>{item.name} - </strong> {item.text}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No comments available yet...</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Modal