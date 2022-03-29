import React, { useEffect, useState } from 'react';
import postApi from '../../../Api/postApi';
import CreatePostLayout from '../component/createPost/CreatePostLayout';
import ListPost from '../component/ListPost';

HomePage.propTypes = {

};

function HomePage() {
    const [postData, setpostData] = useState([])
    useEffect(() => {

        // 
        (async () => {

            try {
                const data = await postApi.getAllPost()
                setpostData(data)
            } catch (error) {

            }
        })()
        return () => {
            // 
        }
    }, []);
    const addToStartPost = (post) => {
        const clonePost = [...postData]
        const newPostData = [post, ...clonePost]
        setpostData(newPostData)
    }
    return (
        <>
            <CreatePostLayout addToStartPost={addToStartPost} />
            <ListPost listPost={postData} setPostData={setpostData} />
        </>
    );
}

export default HomePage;