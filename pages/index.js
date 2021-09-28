import { initializeApollo } from "../services/apollo";
import { getPrimaryMenu } from "../lib/api/getMenus";
import Layout from "../components/Layout";
import { flatListToHierarchical } from "../lib/utils/menus";

let $hierarchicalList = [];

export default function Home({ menus } = porps) {
  $hierarchicalList = flatListToHierarchical(menus?.menu?.menuItems?.nodes);
  return (
    <Layout menus={$hierarchicalList}>
      <div>
        <h1>Home Page</h1>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: getPrimaryMenu,
  });

  return {
    props: {
      menus: data,
    },
    revalidate: 10,
  };
}
