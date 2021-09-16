import { gql } from "@apollo/client";
import { getCategoryBySlug } from "../../lib/api/getCategoryBySlug";
import { initializeApollo } from "../../services/apollo";
import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";
import PostsContainer from "../../components/PostsContainer";

import styles from '../blog/blog.module.scss'

const Category = ({ category } = props) => {
  const { posts } = category;
//   console.log(posts);
//   console.log(category);
  return (
    <>
      <NextSeo
        title={`${category.name}`}
        description={`${category.description ? category.description : category.name}`}
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
  const slugs = await getCategorySlug();
  const paths = slugs.map((slug) => {
    return { params: { slug } };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getCategorySlug = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: gql`
      query getCategories {
        categories(first: 10000) {
          nodes {
            slug
          }
        }
      }
    `,
  });

  return data.categories?.nodes?.map((node) => node.slug);
};

export const getStaticProps = async (context) => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: getCategoryBySlug,
    variables: {
      slug: context?.params?.slug,
    },
  });

  return {
    props: {
      category: data?.category,
    },
  };
};
