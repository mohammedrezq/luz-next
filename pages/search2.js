import React, { useEffect, useState } from "react";
import Link from "next/link";
const search = () => {
  const [value, setValue] = useState("");
  const [posts, setPosts] = useState([]);

  async function fetchAPI(query, { variables } = {}) {
    const headers = { "Content-Type": "application/json" };

    const res = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();
    if (json.errors) {
      console.error(json.errors);
      throw new Error("Failed to fetch API");
    }
    return json.data;
  }

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

  console.log(posts);

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
      {posts &&
        posts.length > 0 &&
        value.length > 2 &&
        posts.map((post, index) => {
          const i = -2;
          const splittedUrl = post.url.split("/");
          const URLslug = splittedUrl.at(i);
          // console.log(splittedUrl);
          return (
            <div key={post.id}>
              <Link href={`/blog/${URLslug}`}>{post.title}</Link>
            </div>
          );
        })}
    </div>
  );
};

export default search;
