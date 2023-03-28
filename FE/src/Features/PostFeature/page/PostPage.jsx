import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import userApi from '../../../Api/userApi';
import postApi from '../../../Api/postApi';
import { useState } from 'react';
import Post from '../component/Post';
import useCallApi from '../../../hook/useCallApi';
import Loading from '../../../Components/Loading';

PostPage.propTypes = {

};

function PostPage() {
    const params = useParams()
    const [post, setpost] = useState(null)
    const { loading, callApi } = useCallApi(postApi.getPost)
    const deletePost = () => {
        setpost(null)
    }
    const updatePost = (post) => {
        setpost(post)
    }
    const updateFieldPost = (postId, pushItem, field, isAdd) => {
        const clonePost = { ...post }
        if (isAdd) clonePost[field].push(pushItem)
        if (!isAdd) clonePost[field] = clonePost[field].filter(item => item != pushItem)
        setpost(clonePost)
    }
    useEffect(() => {
        (async () => {
            try {
                const data = await callApi([params.postId])
                setpost(data)
            } catch (error) {
                setpost(null)

            }
        })()

        return () => {
        }
    }, [params.postId])

    return (
        <div>
            <Loading isLoading={loading} />
            {post && <Post
                key={post._id}
                initIsShowComment={true}
                {...post}
                {...{ deletePost, updatePost, updateFieldPost }}
            />}
            {!post &&
                <div className="">
                    <p>Bai viet khong ton tai</p>
                    <Link to='/' replace={true} >Tro ve trang chu</Link>
                </div>}
        </div>
    );
}

export default PostPage;