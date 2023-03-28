import React, { useEffect, useState } from 'react';
import postApi from '../../../Api/postApi';
import Header from '../../../Components/Header/Header';
import { LoadIcon } from '../../../Components/IconCustom/IconCustom';
import useCallApi from '../../../hook/useCallApi';
import CreatePostLayout from '../component/createPost/CreatePostLayout';
import ListPost from '../component/ListPost';
HomePage.propTypes = {

};

function HomePage() {
    const [postData, setpostData] = useState([])

    const { isLoading, callApi } = useCallApi(postApi.getAllPost)
    useEffect(() => {
        // 
        (async () => {
            try {
                const data = await callApi()
                setpostData(data)
            } catch (error) {
            }
        })()
        return () => {
            // 
        }
    }, []);

    return (
        <>
            <Header />
            <div className='w-full flex justify-center'>
                <div className="basis-[1024px]">
                    <CreatePostLayout setPosts={setpostData} />
                    <LoadIcon isLoading={isLoading} />
                    <ListPost listPost={postData} setPostData={setpostData} />
                </div>
            </div>
        </>
    );
}

export default HomePage;