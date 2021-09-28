/**
 * getRelatedPosts
 */

import { initializeApollo } from "../../services/apollo";
import { getPostsByCategoryId } from "../api/getPostsByCategoryId";
import { sortObjectsByDate } from "./sortObjectsByDate";

export async function getRelatedPosts(category, postId, count = 6) {
  let relatedPosts = [];

  if (category) {
    const { posts } = await getPostsByCategoryIdFN(category.node.databaseId);
    const filtered = posts.filter((post) => post.databaseId !== postId);
    const sorted = sortObjectsByDate(filtered);
    relatedPosts = sorted.map((post) => ({
      title: post.title,
      slug: post.slug,
      featuredImage: post.featuredImage,
      id: post.id,
      modified: post.modified,
      databaseId: post.databaseId,
    }));
  }

  if (relatedPosts.length > count) {
    return relatedPosts.slice(0, count);
  }

  // console.log(relatedPosts);
  return relatedPosts;
}

export async function getPostsByCategoryIdFN(categoryId) {
  const apolloClient = initializeApollo();

  let postData;

  try {
    postData = await apolloClient.query({
      query: getPostsByCategoryId,
      variables: {
        categoryId,
      },
    });
  } catch (e) {
    console.log(`Failed to query post data: ${e.message}`);
    throw e;
  }

  // console.log("POST DATA: ", postData);

  const posts = postData?.data.posts.edges.map(({ node = {} }) => node);
  return {
    posts,
  };
}
