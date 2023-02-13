import React from 'react'
import PropTypes from 'prop-types'
import CommentForm from './CommentForm'
import UserCurrentInfoMini from '../../../../Components/UserCurrentInfoMini'
import { useEffect } from 'react'
import postApi from '../../../../Api/postApi'
import Comments from './Comments'
import { useState } from 'react'
import UserInfoMini from '../../../../Components/UserInfoMini'


function CommentBox({ postId, owner }) {
    const [comments, setcomments] = useState([])
    useEffect(() => {
        (async () => {
            const data = await postApi.getCommentInPost(postId)
            setcomments(data)
        })()

        return () => {
        }
    }, [])

    const submit = async (value, callback) => {
        try {
            const newCm = await postApi.createComment(postId, value.comment)
            callback()
        } catch (error) {

        }
    }
    return (
        <div className='px-4 py-3' >
            <Comments postId={postId} comments={comments} />
            <div className="flex">
                <UserCurrentInfoMini isShowName={false} />
                <CommentForm submit={submit} postId={postId} /></div>
        </div>
    )
}

CommentBox.propTypes = {

}

export default CommentBox
