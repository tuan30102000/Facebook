export default (function createObjecId() {
    const listId = new Set()
    const createId = () => {
        let id = 0
        let check
        do {
            id = Math.floor(Math.random() * 100000)
            check = listId.has(id)
        }while (check)
        listId.add(id)
        return id
    }

    return createId
})()