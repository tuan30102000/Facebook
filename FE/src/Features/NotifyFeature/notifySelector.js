import { createSelector } from "@reduxjs/toolkit";
import method from "../../Constan/method";

const state = (state) => state
export const countNotifyNotRead = createSelector(state, count)
function count(state) {
    const userId = state.user.current.data._id
    return state.notify.notifies.reduce((x, item) => {
        const isRead = item.reads.includes(userId)

        if (isRead) return x + 0
        return x + (!isRead)
    }, 0)
}

