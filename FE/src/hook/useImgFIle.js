import { useEffect, useState } from "react";

export default function useImgFile(imgPreviewInit) {
    const [isChange, setisChange] = useState(false)
    const [file, setfile] = useState({})
    const [imgPreview, setimgPreview] = useState(imgPreviewInit)
    const onChange = (e) => {
        setfile(e.target.files[0])
        setisChange(true)
    }
    useEffect(() => {
        if (isChange) {
            const urlBlob = URL.createObjectURL(file)
            setimgPreview(urlBlob)
            return () => {
                URL.revokeObjectURL(urlBlob)
            }
        }


    }, [file])

    return {
        imgPreview, onChange, file, isChange
    }
}