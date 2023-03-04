import { useEffect } from "react"
import { useState } from "react"

export default function (apiFnc, valueFalse) {
    const [isLoading, setisLoading] = useState(false)
    async function callApi(data = []) {
        if (isLoading) return
        try {
            setisLoading(true)
            const newData = await apiFnc(...data)
            setisLoading(false)
            return newData
        } catch (error) {
            setisLoading(false)
            console.log(error)
            throw Error(error.message)
        }
        // return valueFalse
    }
    return { isLoading, callApi }

}