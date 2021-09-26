import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { BsSearch } from "react-icons/bs";

import { fetchAPI } from "../../lib/utils/fetchAPI";
import styles from "./Search.module.scss";

// Rest API
export const SearchREST = () => {
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

  return (
    <div className={styles.searchContainer}>
      <input onChange={onChangeHandler} value={value} />
      <button onClick={onSubmitHandler}>Submit</button>

      {/**Posts */}
      {posts &&
        posts.length > 0 &&
        value.length > 2 &&
        posts.map((post, index) => {
          /**https://stackoverflow.com/questions/3216013/get-the-last-item-in-an-array */
          const i = -2;
          const splittedUrl = post.url.split("/");
          const URLslug = splittedUrl.slice(i)[0];
          return (
            <div key={post.id}>
              <Link href={`/blog/${URLslug}`}>{post.title}</Link>
            </div>
          );
        })}
    </div>
  );
};

// GraphQL
export const SearchGraphQL = () => {
  const [value, setValue] = useState("");
  const [posts, setPosts] = useState([]);
  const [loadPosts, setLoadPosts] = useState(false);

  const divRef = useRef(null);

  const useOutsideElem = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        // console.log(ref.current);
        if (ref.current && !ref.current.contains(event.target)) {
          setLoadPosts(false);
        }
      }
      document.addEventListener("click", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("click", handleClickOutside);
      };
    }, [ref]);
  };

  useOutsideElem(divRef);

  const onChangeHandler = (e) => {
    e.preventDefault();
    setValue(e.target.value);
    if (e.target.value.length < 3) {
      setLoadPosts(false);
    } else {
      setLoadPosts(true);
    }
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
  };

  useEffect(() => {
    onSubmitHandler(value);
  }, [value]);

  const clickHandler = (e) => {
    e.preventDefault();
    setLoadPosts(!loadPosts);
  };

  return (
    <div className={styles.searchContainer}>
      <input autoFocus type="text" role="search" className={styles.searchBox} onClick={clickHandler} onChange={onChangeHandler} value={value} />
      <button className={styles.searchSubmitBtn}><BsSearch size={32} color={"#ddd"}/></button>
      {/**Posts */}
      {loadPosts && posts.edges && posts.edges.length > 0 && (
        <div ref={divRef} className={styles.searchResultsContainer}>
          {posts.edges &&
            value.length > 2 &&
            posts.edges.map((post, index) => {
              return (
                <Link key={post.node.id} href={`/blog/${post.node.slug}`}>
                  <div className={styles.searchResult} key={post.node.id}>
                    {post.node.title}
                  </div>
                </Link>
              );
            })}
        </div>
      )}
      {loadPosts && posts.edges && posts.edges.length === 0 && (
        <div className={styles.searchResultsContainer}>
          لا يوجد نتائج بحث لـ: {value}
        </div>
      )}
    </div>
  );
};
