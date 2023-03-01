import createTotalCount from "./createTotalCount.js"

export default async function (callback, queryObj) {

    try {
        const page = queryObj.page * 1 || 1
        const limit = queryObj.limit * 1 || 9
        const skip = (page - 1) * limit
        const arr = [callback().skip(skip).limit(limit), /* callback().count() */]
        const list = await Promise.all(arr)
        // const total = createTotalCount(list[1], queryObj)
        return { result: list[0], total: null }
    } catch (error) {
        throw new Error(error)
    }
    return
}