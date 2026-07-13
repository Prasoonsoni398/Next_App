import ProductLlist from "./ProducList"

interface ProductsProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
    category?:string;
    sort?: string;
    
  }>;
}

const Products = async ({ searchParams }: ProductsProps) => {
  const params = await searchParams;

  const category = params?.category || "all"
  const sort = params?.sort || "default"
  const page = params?.page || "1"
  
  console.log("outside:",params);
  console.log(category, sort , page)

  return <div className="text-2xl font-medium text-blue-500">
    <ProductLlist/>
    showing {category} <br /> Products sorted by {sort} <br /> Page {page}
  </div>;
};

export default Products;