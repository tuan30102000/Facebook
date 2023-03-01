import { createSelector } from "@reduxjs/toolkit";
import method from "../../Constan/method";

const userData = (state) => state.user.current.data
export const friendSetSelector = createSelector(userData, userData => method.createSet(userData.friend, '_id'))
export const friendRequestSetSelector = createSelector(userData, userData => method.createSet(userData.friendRequest, '_id'))
export const myFriendRequestSetSelector = createSelector(userData, userData => method.createSet(userData.myRequestFriends,))

