import { gql } from "@apollo/client";
import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";

import client from "../../lib/api/apollo";

import { getAllPostsQuery } from "../../lib/api/getAllPostsQuery";

const test = ({ data: { data } }) => {
  const { posts } = data;
  return posts.edges.map((post) => {
    const { featuredImage } = post.node;

    return (
      <Fragment key={post.node.id}>
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
        <div dangerouslySetInnerHTML={{__html: post.node.excerpt}} />
      </Fragment>
    );
  });
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
