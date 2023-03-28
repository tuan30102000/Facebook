import { useEffect } from "react"
import { useState } from "react"

export default function (apiFnc) {
    const [isLoading, setisLoading] = useState(false)

    useEffect(() => {
        return () => {
            setisLoading(false)
        }
    }, [])

    async function callApi(data = []) {
        if (isLoading) return
        try {
            setisLoading(true)
            const newData = await apiFnc(...data)
            return newData
        } catch (error) {
            console.log(error)
            throw Error(error.message)
        } finally {
            setisLoading(false)
        }
        // return valueFalse
    }
    return { isLoading, callApi }

}