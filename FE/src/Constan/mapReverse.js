export default function (arr, Callback) {
    const arrr = []
    const length = arr.length
    for (let i = length - 1; i >= 0; i--) {
        const newCpn = Callback(arr[i],i,arr)

        arrr.push(newCpn)
    }
    return arrr
}