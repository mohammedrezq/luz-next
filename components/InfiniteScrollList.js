import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";

const GET_POSTS = gql`
  query getPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          title
          uri
          slug
          id
          databaseId
          featuredImage {
            node {
              sourceUrl
              srcSet
              uri
              id
              altText
              caption
            }
          }
          excerpt
        }
      }
    }
  }
`;

const BATCH_SIZE = 3;

export default function InfiniteScrollList() {
  const { data, loading, error, fetchMore } = useQuery(GET_POSTS, {
    variables: { first: BATCH_SIZE, after: null },
    notifyOnNetworkStatusChange: true,
  });

  function fetchMorePosts() {
    fetchMore({ variables: { after: data.posts.pageInfo.endCursor } });
  }

  if (error) {
    return <p>Sorry, an error has occurred. Please reload the page.</p>;
  }

  if (!data && loading) {
    return <p>Loading...</p>;
  }

  if (!data?.posts.edges.length) {
    return <p>No posts have been published.</p>;
  }

  const posts = data.posts.edges.map((edge) => edge.node);
  const haveMorePosts = Boolean(data.posts?.pageInfo?.hasNextPage);

  // console.log(posts);
  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchMorePosts}
      hasMore={haveMorePosts}
      loader={<p>Loading...</p>}
      endMessage={<p>✅ All posts loaded.</p>}
    >
      {posts.map((post) => {
        const { databaseId, title, slug, id, uri, excerpt } =
          post;
        // console.log(post?.featuredImage?.node?.sourceUrl);
        return (
          <li
            key={databaseId}
            style={{
              border: "2px solid #ededed",
              borderRadius: "10px",
              padding: "2rem",
              listStyle: "none",
              marginBottom: "1rem",
            }}
          >
            <Link href={`/blog/${slug}`}>
              <a>
                {post?.featuredImage && (
                  <Image
                    alt={post?.featuredImage?.node?.altText ? post?.featuredImage?.node?.altText : `صورة ل${title}` }
                    width="350"
                    height="250"
                    layout="responsive"
                    src={post?.featuredImage?.node?.sourceUrl}
                    blurDataURL={`/_next/image?url=${post?.featuredImage?.node?.sourceUrl}&w=16&q=1`}
                    placeholder="blur"
                    loading="lazy"
                  />
                )}
              </a>
            </Link>
            <Link href={`/blog/${slug}`}>
              <a>
                <h1>{title}</h1>
              </a>
            </Link>
            <div dangerouslySetInnerHTML={{ __html: excerpt }} />
          </li>
        );
      })}
    </InfiniteScroll>
  );
}
