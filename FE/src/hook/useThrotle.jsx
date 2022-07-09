import { useState } from "react"

const useInput = (fn, delay) => {
    let delayTime = delay || 0
    const [last, setlast] = useState(0)

    return () => {
        const dateNow = new Date().getTime()
        if (dateNow - last < delayTime) return
        fn()
        setlast(dateNow)

    }
}

export default useInput