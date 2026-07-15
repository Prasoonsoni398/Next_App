interface Post {
    id: number,
    body: string;
}

const ServerComponent = async () => {
    const URL = "https://jsonplaceholder.typicode.com/posts";

    const res = await fetch(URL);

    if (!res.ok) {
        throw new Error("Failed to fetch posts");
    }

    const data: Post[] = await res.json();

    return (
        <>
            <div className="text-5xl font-black text-blue-500 text-center my-8">
                Server Component
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                {data.map((post) => (
                    <li
                        key={post.id}
                        className="bg-gray-100 rounded-lg shadow-md p-5 hover:bg-blue-100 hover:shadow-xl transition-all duration-300">
                        <p className="text-gray-700">{post.body}</p>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ServerComponent;