export const ServerComponent = async () => {
    const URL = "https://jsonplaceholder.typicode.com/posts"
    const res = await fetch(URL);
    const data = await res.json()
    console.log(data)

      return (
        <>
            <div className="text-5xl font-black text-blue-500">Server Component</div>
            

            <ul className="grid grid-cols-4 gap-4 mt-4">
                {data.map((curElem, index) =>
                    (<li key={index} className="bg-gray-200 p-4 rounded-md hover:bg-gray-400 hover:text-blue-800  transition-colors duration-300">
                        {curElem.body}
                    </li>)
                )}
            </ul>

        </>
    )
}
export default ServerComponent