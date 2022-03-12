import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import postApi from '../../Api/postApi';
import PostLayout from './component/createPost/PostLayout';
import Post from './component/editPost/Post';


HomPage.propTypes = {

};

function HomPage() {
    const user = useSelector(state => state.user)
    const [postData, setpostData] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const data = await postApi.getAllPost()
                console.log(data)
                setpostData(data)
            } catch (error) {
                console.log(error)
            }
        })()
        return () => {
        }
    }, [])
    return (
        <>
            {
                !user.login && <Navigate to='/auth/login' />
            }
            {
                user.login &&
                <>
                    <PostLayout />
                    {postData.map((item) => <Post key={item._id} avatarUrl={item.avatarUrl} content={item.content} urlList={item.imgUrl} displayName={item.displayName} postId={item._id} ownerId={item.ownerId} />)}
                </>
            }
        </>
    );
}

export default HomPage;