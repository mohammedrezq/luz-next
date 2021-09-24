import React, { useEffect, useState } from "react";
import Link from "next/link";
const search = () => {
  const [value, setValue] = useState("");
  const [posts, setPosts] = useState([]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  const onSubmitHandler = async (e) => {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_SEARCH_REST}?search=${value}`
    );
    response = await response.json();
    setPosts(response);
  };

  useEffect(() => {
    onSubmitHandler();
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
          /**https://stackoverflow.com/questions/3216013/get-the-last-item-in-an-array */
          const i = -2;
          const splittedUrl = post.url.split("/");
          const URLslug = splittedUrl.slice(i)[0];
          // console.log(URLslug);
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
