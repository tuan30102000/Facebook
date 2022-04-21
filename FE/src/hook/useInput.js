import { useState } from "react"

const useInput = (callback) => {
    const [value, setvalue] = useState('')
    const onChange = (e) => {
        if (callback) {
            const change = () => {
                setvalue(e.target.value)
            }
            return callback(change)
        }
        setvalue(e.target.value)
    }
    return { value, onChange }
}

export default useInput