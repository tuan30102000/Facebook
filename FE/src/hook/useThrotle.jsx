import { useState } from "react"
let timeOutId
const useInput = (fn, delay) => {
    let delayTime = delay || 0
    const [last, setlast] = useState(0)
    const [timeOutId, settimeOutId] = useState()
    return () => {
        if(timeOutId) {
            clearTimeout(timeOutId)
        }
        settimeOutId(setTimeout(fn,delay))
        // timeOutId
        const dateNow = new Date().getTime()
        if (dateNow - last < delayTime) return
        fn()
        setlast(dateNow)

    }
}

export default useInput