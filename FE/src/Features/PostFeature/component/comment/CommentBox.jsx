import React from 'react'
import PropTypes from 'prop-types'
import CommentForm from './CommentForm'
import UserCurrentInfoMini from '../../../../Components/UserCurrentInfoMini'
import { useEffect } from 'react'
import postApi from '../../../../Api/postApi'
import Comments from './Comments'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import useCallApi from '../../../../hook/useCallApi'
import { LoadIcon } from '../../../../Components/IconCustom/IconCustom'



function CommentBox({ postId, ownerPost }) {
    const [comments, setcomments] = useState([])
    const userCurrent = useSelector(state => state.user)
    const socket = userCurrent.socket
    const { isLoading, callApi } = useCallApi(postApi.getCommentInPost)
    useEffect(() => {
        (async () => {
            const data = await callApi([postId])
            setcomments(data)
        })()

        return () => {
        }
    }, [])
    useEffect(() => {
        if (!socket) return
        socket.emit('join-post', postId)
        socket.on('create-comment', (newCmt) => {
            if (newCmt.post != postId) return
            // const newCommentList = [...comments, newCmt]
            setcomments(state => [...state, newCmt])
        })
        socket.on('delete-comment', (cmtId) => {
            setcomments(state => state.filter(item => item._id != cmtId))
        })
        socket.on('edit-comment', (cmtEdited) => {
            // console.log(cmtEdited)
            setcomments(state => {
                const newState = [...state]
                const index = newState.findIndex(item => item._id == cmtEdited._id)
                newState[index] = { ...cmtEdited }
                return newState
            })
        })
        return () => {
            socket.removeListener('create-comment');
            socket.removeListener('delete-comment');
            socket.removeListener('edit-comment');
            socket.emit('leave-post', postId)
        }
    }, [])

    const submit = async (value) => {
        try {
            const newCm = await postApi.createComment(postId, value.comment)
        } catch (error) {
            throw new Error(error)
        }
    }
    return (
        <div className='px-4 py-3'>
            <Comments ownerPost={ownerPost} postId={postId} user={userCurrent.current.data} comments={comments} />
            <LoadIcon className={'my-3 text-[20px]'} isLoading={isLoading} />
            <div className="flex">
                <UserCurrentInfoMini isShowName={false} />
                <CommentForm submit={submit} postId={postId} /></div>
        </div>
    )
}

CommentBox.propTypes = {

}

export default CommentBox
