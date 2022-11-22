import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../../actions/post'

const CommentForm = ({ postId }) => {

    const dispatch = useDispatch()
    const [formData, setFormData] = useState([])

    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const addComments = (e) => {
        e.preventDefault()
        dispatch(addComment(postId, formData))
    }

    return (
        <>
            <div className="post-form">
                <div className="bg-primary p">
                    <h3>Leave a comment...</h3>
                </div>
                <form className="form my-1" onSubmit={addComments}>
                    <textarea
                        name="comment"
                        cols="30"
                        rows="5"
                        placeholder="Create a post"
                        onChange={(e) => handleInput(e)}
                        required
                    ></textarea>
                    <input type="submit" className="btn btn-dark my-1" value="Submit" />
                </form>
            </div>
        </>
    )
}

export default CommentForm