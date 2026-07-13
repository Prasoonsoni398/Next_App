import Image from "next/image"
import photo1 from "@/public/photo1.jpeg"
export const metadata = {
    title: "Service Page",
    description: "This is service page"
}


const Service = () => {
    return (
        <>
            <div className="h-screen flex justify-center items-center">
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-5 bg-red-200  w-50 rounded-lg p-5 hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
                        <div className="h-28 w-28 rounded-full mx-auto flex justify-center items-center">
                            <Image src="/photo1.jpeg" alt="my pic" width={128} height={128} className="w-full h-full rounded-full object-cover" />
                        </div>
                        <div className="text-center flex flex-col gap-2">
                            <h1 className="text-lg font-bold">Prasoon Soni</h1>
                            <h4 className="text-md text-gray-600">Frontend Developer</h4>
                            <p className="text-sm text-gray-500">React Developer</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 bg-red-200  w-50 rounded-lg  hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
                        <div className="relative h-full w-full rounded-full mx-auto flex justify-center items-center">
                            <Image src={photo1} alt="my pic" fill={true} quality={100} priority={false} placeholder="blur" blurDataURL="" className="w-full rounded-lg h-full object-cover " />
                        </div>
                        
                    </div>
                    <div className="flex flex-col gap-5 bg-red-200  w-50 rounded-lg p-5 hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
                        <div className="h-28 w-28 rounded-full mx-auto flex justify-center items-center">
                            <Image src="/photo1.jpeg" alt="my pic" width={128} height={128} className="w-full h-full rounded-full object-cover" />
                        </div>
                        <div className="text-center flex flex-col gap-2">
                            <h1 className="text-lg font-bold">Prasoon Soni</h1>
                            <h4 className="text-md text-gray-600">Frontend Developer</h4>
                            <p className="text-sm text-gray-500">React Developer</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 bg-red-200  w-50 rounded-lg p-5 hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
                        <div className="h-28 w-28 rounded-full mx-auto flex justify-center items-center">
                            <Image src="/photo1.jpeg" alt="my pic" width={128} height={128} className="w-full h-full rounded-full object-cover" />
                        </div>
                        <div className="text-center flex flex-col gap-2">
                            <h1 className="text-lg font-bold">Prasoon Soni</h1>
                            <h4 className="text-md text-gray-600">Frontend Developer</h4>
                            <p className="text-sm text-gray-500">React Developer</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 bg-red-200  w-50 rounded-lg p-5 hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
                        <div className="h-28 w-28 rounded-full mx-auto flex justify-center items-center">
                            <Image src="/photo1.jpeg" alt="my pic" width={128} height={128} className="w-full h-full rounded-full object-cover" />
                        </div>
                        <div className="text-center flex flex-col gap-2">
                            <h1 className="text-lg font-bold">Prasoon Soni</h1>
                            <h4 className="text-md text-gray-600">Frontend Developer</h4>
                            <p className="text-sm text-gray-500">React Developer</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 bg-red-200  w-50 rounded-lg p-5 hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
                        <div className="h-28 w-28 rounded-full mx-auto flex justify-center items-center">
                            <Image src="/photo1.jpeg" alt="my pic" width={128} height={128} className="w-full h-full rounded-full object-cover" />
                        </div>
                        <div className="text-center flex flex-col gap-2">
                            <h1 className="text-lg font-bold">Prasoon Soni</h1>
                            <h4 className="text-md text-gray-600">Frontend Developer</h4>
                            <p className="text-sm text-gray-500">React Developer</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Service