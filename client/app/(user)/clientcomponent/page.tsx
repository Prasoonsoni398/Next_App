'use client'

import { useEffect, useState } from "react"
import { Counter } from "./Counter"

const URL = "https://jsonplaceholder.typicode.com/posts"

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const clientComponent = () => {
    const [postData, setPostData] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(URL);
            const data = await res.json()
            setPostData(data)
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <div className="text-5xl font-black text-blue-500">Client Component</div>
            <button className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full text-white mt-4 transition-colors duration-300 w-50"
                onClick={() => alert("Hii")}>
                Click Me
            </button>
            <Counter />

            <ul className="grid grid-cols-4 gap-4 mt-4  ">
                <div className="bg-gray-800 col-span-4 rounded-xl p-4 gap-4 grid grid-cols-4">
                    {isLoading ? (
                        Array.from({ length: 8 }).map((_, index) => (
                            <li key={index} className="bg-gray-700 h-24 p-4 rounded-md animate-pulse"></li>
                        ))
                    ) : (
                        postData.map((curElem, index) =>
                        (<li key={index} className="bg-gray-200 p-4 rounded-md hover:bg-gray-400 hover:text-blue-800  transition-colors duration-300">
                            {curElem.body}
                        </li>)
                        )
                    )}
                </div>
            </ul>

        </>
    )
}

export default clientComponent