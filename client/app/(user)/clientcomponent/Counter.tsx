import { useState } from "react";

export const Counter = () => {
    const [count, setCount] = useState(0);
    return <button onClick={() => {
        setCount((prev) => prev + 1)
    }} className="bg-blue-500 p-2 rounded-full w-30" >Add - {count}</button>
}