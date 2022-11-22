import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'
import { addLike, removeLike, deltePost } from '../../actions/post'
import { Link } from 'react-router-dom'

const PostItem = ({ post }) => {
    
    const dispatch = useDispatch()
    const { loading, user } = useSelector(state => state.auth)
    const { likes, comments } = post
    return (
        <>
            <div className="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profile/${post.user}`}>
                        <img className="round-img" src={post.avatar} alt="" />
                        <h4>{post.name}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">
                        {post.text}
                    </p>
                    <p className="post-date">
                        Posted on <Moment format='YYYY/MM/DD'>{post.date}</Moment>
                    </p>
                    <button onClick={() => dispatch(addLike(post._id))} type="button" className="btn btn-light">
                        <i className="fas fa-thumbs-up"></i>{" "}
                        {likes.length > 0 && (
                            <span>{likes.length}</span>
                        )}
                    </button>
                    <button onClick={() => dispatch(removeLike(post._id))} type="button" className="btn btn-light">
                        <i className="fas fa-thumbs-down"></i>
                    </button>
                    <Link to={`/post/${post._id}`} className="btn btn-primary">
                        Discussion{" "}
                        {comments.length > 0 && (
                            <span className='comment-count'>{comments.length}</span>
                        )}
                    </Link>
                    {!loading && user._id === post.user && (
                        <button onClick={() => dispatch(deltePost(post._id))} type="button" className="btn btn-danger">
                            <i className="fas fa-times"></i>
                        </button>
                    )}

                </div>
            </div>
        </>
    )
}

export default PostItem