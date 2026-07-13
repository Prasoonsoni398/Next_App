interface Blogprops {
    params: Promise<{
    slug: string;
  }>;
}


 const Page =async (props:Blogprops) => {
    const {slug} = await props.params
    console.log(slug);
    
  return (
    <>Page</>
  );
};

export default Page
