'use client'
import {use} from 'react'

interface ProfileProps {
  params: Promise<{
    username:string
    postId: string;
  }>;
}

const SingleProfile =  (props: ProfileProps) => {
  const  user  = use(props.params);

  console.log(user);
  
  return <h1>User: {user.username} <br />  UserId: {user.postId}</h1>;
};

export default SingleProfile;