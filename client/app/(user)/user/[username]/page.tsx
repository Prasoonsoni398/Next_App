interface ProfileProps {
  params: Promise<{
    username: string;
  }>;
}

const SingleProfile = async (props: ProfileProps) => {
  const  user  = await props.params;

  console.log(user);

  return <h1>User: {user.username}</h1>;
};

export default SingleProfile;