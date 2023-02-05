import { useState } from "react"

const useInput = (callback) => {
    const [value, setvalue] = useState('')
    const onChange = (e) => {
        console.log("onChange")
        if (callback) {
            const change = () => {
                setvalue(e.target.value)
            }
            return callback(change,value)
        }
        setvalue(e.target.value)
    }
    return { value, onChange, setvalue }
}

export default useInput