import { gql } from "@apollo/client";
import { getCategoryBySlug } from "../../lib/api/getCategoryBySlug";
import { initializeApollo } from "../../services/apollo";

const Category = ({category} = props) => {
  console.log(category);
  return <div>Hello Category</div>;
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
