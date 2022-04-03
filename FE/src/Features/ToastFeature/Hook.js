import { useDispatch } from "react-redux"
import { addToast } from "./toastSlice"
import createId from '../../Constan/createObjId'
export default function useToast() {
    const dispatch = useDispatch()

    const handleAddToast = (message, type = 'success', time = 3000,) => {
        const action = addToast({ message, type, time, id: createId() })
        dispatch(action)
    }

    return handleAddToast
}