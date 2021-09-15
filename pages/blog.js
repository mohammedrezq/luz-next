import { useQuery } from "@apollo/client";
import { GetStaticPropsContext } from "next";

// import { client } from "../services/apollo";

import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";

import { initializeApollo, addApolloState } from "../services/apollo";
import InfiniteScroll from "react-infinite-scroll-component";

import { GET_POSTS } from "../lib/api/getPaginatedPostsQuery";
import BlogContainer from "../components/BlogContainer";
import styles from "./blog/blog.module.scss";

const POSTS_PER_PAGE = 6;

const Blog2 = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      first: POSTS_PER_PAGE,
      after: null,
    },
    notifyOnNetworkStatusChange: true,
  });
  const { posts } = data;
  // const posts = data?.posts?.map((post) => edge.node) || [];
  const havePosts = Boolean(posts.edges.length);
  const haveMorePosts = Boolean(data?.posts?.pageInfo?.hasNextPage);

  // console.log(data);
  // console.log(posts);
  // console.log(havePosts);
  // console.log(posts.edges.length);
  // console.log(error);
  // console.log(haveMorePosts);
  // console.log(loading);

  const fetchMorePosts = () => {
    fetchMore({
      variables: {
        first: 3,
        after: data.posts.pageInfo.endCursor,
      },
    });
  };

  
  if (error) {
    return <p>Sorry, an error has occurred. Please reload the page.</p>;
  }

  if (!data && loading) {
    return <p>Loading...</p>;
  }

  if (!data?.posts.edges.length) {
    return <p>No posts have been published.</p>;
  }

  return (
    <>
      <NextSeo
        title={`المدونة - موقع لوز`}
        description={`مدونة المواضيع المطروحة من موقع لوز!`}
      />
        <InfiniteScroll
          dataLength={posts.edges.length}
          next={fetchMorePosts}
          hasMore={haveMorePosts}
          loader={<p>Loading...</p>}
          endMessage={null}
        >
      <BlogContainer>
          {posts.edges.map((post) => {
            const { featuredImage } = post.node;

            return (
              <div className={styles.blogContent} key={post.node.id}>
                <Link href={`/blog/${post.node.slug}`}>
                  <a>
                    {featuredImage && (
                      <Image
                        width="350"
                        height="250"
                        layout="responsive"
                        src={featuredImage?.node?.sourceUrl}
                        blurDataURL={`/_next/image?url=${featuredImage?.node?.sourceUrl}&w=16&q=1`}
                        placeholder="blur"
                        loading="lazy"
                      />
                    )}
                  </a>
                </Link>
                <Link href={`/blog/${post.node.slug}`}>
                  <a>
                    <h1>{post.node.title}</h1>
                  </a>
                </Link>
                <div dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
              </div>
            );
          })}
      </BlogContainer>
        </InfiniteScroll>
    </>
  );
};

export default Blog2;

export async function getStaticProps(context) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_POSTS,
    variables: {
      first: POSTS_PER_PAGE,
      after: null,
    },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}

// export async function getStaticProps() {
//   const data = await client.query({
//     query: getAllPostsQuery,
//   });

//   return {
//     props: {
//       data,
//     },
//   };
// }
