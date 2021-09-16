import { gql } from "@apollo/client";
import { getTagBySlug } from "../../lib/api/getTagBySlug";
import { initializeApollo } from "../../services/apollo";
import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";
import PostsContainer from "../../components/PostsContainer";

import styles from '../blog/blog.module.scss'

const Category = ({ tag } = props) => {
  const { posts } = tag;
//   console.log(posts);
//   console.log(tag);
  return (
    <>
      <NextSeo
        title={`${tag.name}`}
        description={`${tag.description ? tag.description : tag.name}`}
      />

        <PostsContainer>
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
        </PostsContainer>
    </>
  );
};

export default Category;

export const getStaticPaths = async () => {
  const slugs = await getTagSlug();
  const paths = slugs.map((slug) => {
    return { params: { slug } };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getTagSlug = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: gql`
      query getTags {
        tags(first: 10000) {
          nodes {
            slug
          }
        }
      }
    `,
  });

  return data.tags?.nodes?.map((node) => node.slug);
};

export const getStaticProps = async (context) => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: getTagBySlug,
    variables: {
      slug: context?.params?.slug,
    },
  });

  return {
    props: {
      tag: data?.tag,
    },
  };
};
