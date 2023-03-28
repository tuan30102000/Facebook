import createTotalCount from "./createTotalCount.js"

export default async function (callback, queryObj) {

    try {
        const page = queryObj.page * 1 || 1
        const limit = queryObj.limit * 1 || 9
        const skip = (page - 1) * limit
        const arr = []
        arr.push(callback().skip(skip).limit(limit))
        if (page == 1) arr.push(callback().count())
        const list = await Promise.all(arr)
        let total = page === 1 ? createTotalCount(list[1], queryObj) : null

        return { result: list[0], total: total }
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}