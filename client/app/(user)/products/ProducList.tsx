"use client"

import { useSearchParams } from "next/navigation"


const ProducList = () => {
    const searchParams = useSearchParams();

    const pages = searchParams.getAll("page")
    const category = searchParams.get("category")

      console.log(pages);
  console.log(category);

    // console.log("inside:", searchParams);
    return (
        <>
            Product - {category}
            <br />
        </>
    );
};

export default ProducList;