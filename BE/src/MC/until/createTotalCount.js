export default function (size, queryObj) {

    const page = queryObj.page * 1 || 1
    const limit = queryObj.limit * 1 || 9
    const skip = (page - 1) * limit

    const maxPage = Math.floor(size / limit) + 1
    return { total: size, maxPage, page, limit }
}