import React, { useEffect } from 'react'
import PostItem from '../posts/PostItem'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '../../actions/post'
import Spinner from '../layouts/Spinner'
import { useParams } from 'react-router-dom'
import CommentForm from './CommentForm'

const Post = () => {
    const { post, loading } = useSelector(state => state.post)
    const dispatch = useDispatch()
    const {id}  = useParams()
    useEffect(() => {
        dispatch(getPost(id))
    }, [])
    return (
        loading && post === null ? <Spinner />
            :
            <>
                <PostItem post={post} />
                <CommentForm postId={post._id} />
            </>
    )
}

export default Post