import React, { useEffect, useState } from "react";
import Link from "next/link";
import  {fetchAPI } from '../lib/utils/fetchAPI'
const search = () => {
  const [value, setValue] = useState("");
  const [posts, setPosts] = useState([]);


  const onChangeHandler = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  const onSubmitHandler = async (searchTerm) => {
    let data = await fetchAPI(
      `query($searchTerm: String) {
        posts(where: { search: $searchTerm }) {
          edges {
            node {
              id
              uri
              title
              excerpt
              slug
            }
          }
        }
      }`,
      {
        variables: {
          searchTerm,
        },
      }
    );
    return setPosts(data?.posts);
    // response = await data.json();
    // setPosts(response);
  };

  useEffect(() => {
    onSubmitHandler(value);
  }, [value]);

  console.log(posts.edges);

  //   const onSubmitHandler = (e) => {
  //       e.preventDefault();
  //       setValue(value)
  //   }
  //   console.log(value);

  return (
    <div>
      {/* <form action="" onSubmit={}> */}
      <input onChange={onChangeHandler} value={value} />
      <button onClick={onSubmitHandler}>Submit</button>
      {/* </form> */}
      {/**Posts */}
      {posts.edges &&
        posts.edges.length > 0 &&
        value.length > 2 &&
        posts.edges.map((post, index) => {
          console.log(post.node.title);
          // const i = -2;
          // const splittedUrl = post.url.split("/");
          // const URLslug = splittedUrl.at(i);
          // console.log(splittedUrl);
          return (
            <div key={post.node.id}>
              <Link href={`/blog/${post.node.slug}`}>{post.node.title}</Link>
            </div>
          );
        })}
    </div>
  );
};

export default search;
