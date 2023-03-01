import React, { useEffect, useState } from 'react';
import postApi from '../../../Api/postApi';
import Header from '../../../Components/Header/Header';
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

    return (
        <>
            <Header />
            <div className='flex justify-center'>
                <div className="basis-[1024px]">
                    <CreatePostLayout setPosts={setpostData} />
                    <ListPost listPost={postData} setPostData={setpostData} />
                </div>
            </div>
        </>
    );
}

export default HomePage;