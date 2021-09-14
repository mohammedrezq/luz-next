import { useRouter } from "next/router";
import Image from "next/image";
import { gql } from "@apollo/client";
import client from "../../lib/api/apollo";
import { getPostBySlug } from "../../lib/api/getPostBySlug";

const Post = ({ post } = props) => {

  const { title } = post;
  const { featuredImage } = post;
  const { content } = post;

  return (
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
