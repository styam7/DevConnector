import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPost } from '../../actions/post'

const PostForm = () => {

    const dispatch = useDispatch()
    const [formData, setFormData] = useState([])

    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const createPost = (e) => {
        e.preventDefault()
        dispatch(addPost(formData))
    }

    return (
        <>
            <div className="post-form">
                <div className="bg-primary p">
                    <h3>Say Something...</h3>
                </div>
                <form className="form my-1" onSubmit={createPost}>
                    <textarea
                        name="text"
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

export default PostForm