import createObjId from "../../Constan/createObjId"

const toastBox = document.getElementById('toast')
const clsx = (className, classOBj) => {
    let currentClass = className
    for (let key in classOBj) {
        if (classOBj[key]) currentClass += ' ' + key
    }
    return currentClass
}

const resultIcon = (type) => {

    if (type === 'warning') return `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="text-yellow-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11.001 10h2v5h-2zM11 16h2v2h-2z"></path><path d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"></path></svg>`
    if (type === 'error') return `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="text-red-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM19 14.9L14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1v5.8z"></path><path d="M11 7h2v6h-2zM11 15h2v2h-2z"></path></svg>`
    return ` <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="text-green-600" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"></path></svg>`
}
async function createToast(message, type = 'success', time = 3000) {
    const toastItem = document.createElement('div')
    const itemClass = clsx('flex bg-white border-l-4 px-4 items-center shadow min-w-400px max-w-450px border-solid py-5 animate-toast-show mt-2 mb-4', {
        'border-l-green-600': type === 'success',
        'border-l-yellow-400': type === 'warning',
        'border-l-red-400': type === 'error',
    })
    const toastId = 'toast' + createObjId()
    toastItem.innerHTML =
        `<div id='${toastId}' class='${itemClass}'>
      ${resultIcon(type)}
        <div class="flex-1 px-4">
            <p class="">
               ${message}
            </p>
            <p class="">Chao mung ban den voi facebook</p>
        </div>
        <div class="btn-close">    
        <svg  stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="2" d="M3,3 L21,21 M3,21 L21,3"></path></svg>
        </div>
        </div>`;
    toastBox.appendChild(toastItem)
    const closeElm = document.querySelector(`#${toastId} .btn-close`)
    closeElm.addEventListener('click', onClickClose)
    const timeOutId = setTimeout(onClickClose, time)
    function onClickClose() {
        closeElm.removeEventListener('click', onClickClose)
        toastBox.removeChild(toastItem)
        timeOutId && clearTimeout(timeOutId)
    }

}

// {type === 'success' && <BsCheckCircle class='text-green-600' />}
// {type === 'warning' && <BiError class='text-yellow-400' />}
// {type === 'error' && <MdReportGmailerrorred class='text-red-400' />}
// <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="text-green-600" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"></path></svg>
export default createToast