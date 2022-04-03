import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import postApi from '../../../Api/postApi';
import useToast from '../../ToastFeature/Hook';
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
    const addToast = useToast()
    return (
        <>
            <CreatePostLayout addToStartPost={addToStartPost} />
            <ListPost listPost={postData} setPostData={setpostData} />
            <Link to={'/profile'} >
                profile
            </Link>
            <div className="" onClick={() => { addToast('helloeoee', 'warning') }}>add Toast </div>
        </>
    );
}

export default HomePage;