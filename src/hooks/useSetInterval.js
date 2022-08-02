import { useEffect } from "react"

function useSetInterval(fn, time, dependecies) {
    useEffect(() => {
        const timer = setInterval(fn, time)

        return () => {
            clearInterval(timer)
        }
    }, dependecies)
}

export default useSetInterval