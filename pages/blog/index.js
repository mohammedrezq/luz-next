import { gql } from "@apollo/client";
import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";

import client from "../../lib/api/apollo";

import { getAllPostsQuery } from "../../lib/api/getAllPostsQuery";
import BlogContainer from "../../components/BlogContainer";
import styles from './blog.module.scss'
import { NextSeo } from "next-seo";
const test = ({ data: { data } }) => {
  const { posts } = data;

  return (
    <>
    <NextSeo
      title={`المدونة - موقع لوز`}
      description={`مدونة المواضيع المطروحة من موقع لوز!`}
    />
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
            <Link href={`/blog/${encodeURIComponent(post.node.slug)}`}>
              <a>
                <h1>{post.node.title}</h1>
              </a>
            </Link>
            <div dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
          </div>
        );
      })}
    </BlogContainer>
    </>
  );
};

export default test;

export async function getStaticProps() {
  const data = await client.query({
    query: getAllPostsQuery,
  });

  return {
    props: {
      data,
    },
  };
}
