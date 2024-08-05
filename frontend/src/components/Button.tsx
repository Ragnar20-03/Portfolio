import { ReactNode } from "react"

export const   Button =  ({onClick , children } : {onClick : () => void , children : ReactNode} ) => {
    return <button onClick={ onClick} className=" bg-slate-900 text-lg p-3 m-2 rounded-md hover:bg-slate-800 hover: duration-300 text-white">
        {children}
    </button>
}