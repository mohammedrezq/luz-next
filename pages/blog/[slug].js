import Image from "next/image";
import Link from "next/link";
import { gql } from "@apollo/client";
import { NextSeo } from "next-seo";

import { client } from "../../services/apollo";
import { initializeApollo, addApolloState } from "../../services/apollo";
import { getPostBySlug } from "../../lib/api/getPostBySlug";
import styles from "./blog.module.scss";

const Post = ({ post } = props) => {
  const { title } = post;
  const { featuredImage } = post;
  const { content } = post;
  const { next } = post;
  const { previous } = post;
  const { tags } = post;
  const { categories } = post;

  return (
    <>
      <NextSeo
        title={`${title} - موقع لوز`}
        description="A short description goes here."
      />
      <div>
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
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
        {categories.edges &&
          categories.edges.map((cat) => {
            return (
              <div key={cat.node.id}>
                <Link href={`/category/${cat.node.slug}`}>
                  <a>
                    <div>{cat.node.name}</div>
                  </a>
                </Link>
              </div>
            );
          })}
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <h1>الوسوم</h1>
        {tags.edges && tags.edges.map((tag) => {
          return(
            <div key={tag.node.id}>
              <Link href={`/tag/${tag.node.slug}`}>
                <a>
                  <div>{tag.node.name}</div>
                </a>
              </Link>
            </div>
          )
        })}
      </div>
      <div className={styles.postPagination}>
        {next ? (
          <>
            <Link href={`/blog/${next.slug}`}>
              <a className={styles.next}>
                <span>السابق: </span>
                <div className={styles.nextUrl}>
                  <span className={styles.nextIcon}>&#8594;</span>
                  <span className={styles.nextTitle}>{next.title}</span>
                </div>
              </a>
            </Link>
          </>
        ) : null}
        {previous ? (
          <>
            <Link href={`/blog/${previous.slug}`}>
              <a className={styles.previous}>
                <span>التالي: </span>
                <div className={styles.previousUrl}>
                  <span className={styles.previousTitle}>{previous.title}</span>
                  <span className={styles.previousIcon}>&#8592;</span>{" "}
                </div>
              </a>
            </Link>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Post;

export async function getStaticPaths() {
  const slugs = await getPostSlugs();
  const paths = slugs.map((slug) => {
    return { params: { slug } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getPostSlugs() {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: gql`
      query getPosts {
        posts(first: 100000) {
          nodes {
            slug
          }
        }
      }
    `,
  });

  return data.posts?.nodes?.map((node) => node.slug);
}

export async function getStaticProps(context) {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: getPostBySlug,
    variables: {
      slug: context?.params?.slug,
    },
  });

  return {
    props: {
      post: data?.post,
    },
    revalidate: 10,
  };
}
