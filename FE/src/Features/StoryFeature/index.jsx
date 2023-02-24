import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Header from '../../Components/Header/Header';
import { useRef } from 'react';
import { useEffect, useState } from 'react';

Story.propTypes = {

};

function Story(props) {
    const canvas = useRef(null)
    const fileRef = useRef({})
    const [imgPreview, setimgPreview] = useState('')
    const [file, setfile] = useState(null)
    const [canMove, setcanMove] = useState(false)
    const onMouseMove = () => {
        if (!canMove) return

    }
    const ctx = useMemo(() => {
        if (canvas.current) return canvas.current.getContext('2d')
        return null
    }, [canvas.current])
    useEffect(() => {
        // const listUrl = file.map(item => URL.createObjectURL(item))
        // console.log(file)
        if (!file) return
        const url = URL.createObjectURL(file)
        setimgPreview(url)
        return () => {
            // listUrl.map(item => URL.revokeObjectURL(item))
            URL.revokeObjectURL(imgPreview)
        }
    }, [file])
    useEffect(() => {
        return
        const img = new Image()
        img.src = imgPreview
        img.onload = () => {
            ctx.clearRect(0, 0, 500, 500)
            ctx.drawImage(img, 0, 0, 1000, 1000)
        }
        return () => {
        }
    }, [imgPreview, ctx])


    return (
        <div>
            <Header />
            <div className="relative w-[1000px] h-[800px]" >
                <input ref={fileRef} multiple={false} accept="image/png, image/jpeg" onChange={e => setfile(e.target.files[0])} type={'file'} />
                {/* <canvas width={500} height={500} ref={canvas} /> */}
                {imgPreview && <img className='w-[500px] h-auto' src={imgPreview} alt="" />}
                <div onMouseDown={() => setcanMove(true)} onMouseUp={() => setcanMove(false)} onMouseMove={onMouseMove} className="rounded-crical bg-black absolute w-6 h-6 top-full right-[50%]">

                </div>
            </div>
        </div>
    );
}

export default Story;