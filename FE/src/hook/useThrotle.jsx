import { useRef, useState } from "react"
const useInput = (fn, delay) => {
    let delayTime = delay || 0
    const [last, setlast] = useState(0)
    const timeOutId = useRef(null)
    return () => {
        if (timeOutId.current) {
            clearTimeout(timeOutId.current)
        }
        timeOutId.current = setTimeout(() => {
            console.log(22222)
            fn()
        }, delay)
        const dateNow = new Date().getTime()
        if (dateNow - last < delayTime) return
        clearTimeout(timeOutId.current)
        fn()
        setlast(dateNow)

    }
}

export default useInput
