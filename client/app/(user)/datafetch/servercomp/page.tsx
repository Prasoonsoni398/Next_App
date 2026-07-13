interface ServercompProps {
    searchParams: Promise<{
        name?: string
        probability?:number
    }>
}

const DatafetchServer = async ({ searchParams }: ServercompProps) => {

    const params = await searchParams;
    const userName = params.name
    

    if (!userName) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-blue-100">
                <div className="bg-white p-6 rounded-2xl gap-4 flex flex-col shadow-lg hover:shadow-xl transition-all border border-gray-300 hover:border-blue-500 hover:-translate-1.5 duration-300 text-center">
                    <h1 className="text-xl font-semibold">No name provided</h1>
                    <p className="text-gray-600">Please add ?name=yourname to the URL</p>
                </div>
            </div>
        )
    }

    const res = await fetch(`https://api.genderize.io?name=${userName}`)
    const userData = await res.json()

    console.log(userData);
    const probability = userData.probability*100

    return (
        <>
            <div className="flex flex-col gap-2">
                <p className="capitalize"><span className="font-bold">  Name:</span> <span className="text-md text-blue-500 font-bold">{userData.name}</span></p>
                <span> Gender - {userData.gender}</span>
                <span> Probability - {probability}</span>
            </div>
        </>
    );
};

export default DatafetchServer;