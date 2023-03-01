import { createSelector } from "@reduxjs/toolkit";
import method from "../../Constan/method";

const state = (state) => state
export const countMessageNotSeen = createSelector(state, count)
function count(state) {
    const userId = state.user.current.data._id


    return state.chat.conversations.reduce((x, item) => {
        if (item.newMessage.sender === userId) return x + 0
        return x + (!item.seen)
    }, 0)
}