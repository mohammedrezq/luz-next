import Image from "next/image";
import Link from "next/link";
import { gql } from "@apollo/client";
import { NextSeo } from "next-seo";

import client from "../../lib/api/apollo";
import { getPostBySlug } from "../../lib/api/getPostBySlug";
import styles from "./blog.module.scss";

const Post = ({ post } = props) => {
  const { title } = post;
  const { featuredImage } = post;
  const { content } = post;
  const { next } = post;
  const { previous } = post;

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
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <div className={styles.postPagination}>
        {next ? (
          <>
          <Link href={`/blog/${next.slug}`}>
            <a className={styles.next}>
          <span>السابق: </span>
              <div className={styles.nextUrl}><span className={styles.nextIcon}>&#8594;</span><span className={styles.nextTitle}>{next.title}</span></div>
            </a>
          </Link>
          </>
        ) : null}
        {previous ? (
          <>
          <Link href={`/blog/${previous.slug}`}>
            <a className={styles.previous}>
          <span>التالي: </span>
              <div className={styles.previousUrl}><span className={styles.previousTitle}>{previous.title}</span><span className={styles.previousIcon}>&#8592;</span>	</div>
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
  const { data } = await client.query({
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
  const { data } = await client.query({
    query: getPostBySlug,
    variables: {
      slug: context?.params?.slug,
    },
  });

  return {
    props: {
      post: data?.post,
    },
  };
}
