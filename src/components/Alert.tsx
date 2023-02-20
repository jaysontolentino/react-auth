import { PropsWithChildren } from "react"

interface IAlertProps extends PropsWithChildren {
    message?: string
    type: 'error' | 'success'
    children: string
}

const Alert: React.FunctionComponent<IAlertProps> = function({type, message, children}) {

    let alert = null

    if(type === 'error') {
        alert = <div className='flex bg-red-200 text-red-600 py-3 justify-center items-center border border-red-400 rounded-lg w-full'>{message || children}</div>
    } else if(type === 'success') {
        alert = <div className='flex bg-green-200 text-green-600 py-3 justify-center items-center border border-green-400 rounded-lg w-full'>{message || children}</div>
    } else {
        alert =  <div className='flex bg-blue-200 text-blue-600 py-3 justify-center items-center border border-blue-400 rounded-lg w-full'>{message || children}</div>
    }

    return alert
}

export default Alert