import { fetchAPI } from "../../lib/utils/fetchAPI";

// Reference : https://dev.to/emil_priver/sitemap-with-next-js-539
const sitemapXML = (data) => {
  let latestPost = 0;
  let projectsXML = "";

  data.edges.map((post) => {
    const postDate = new Date(post.node.modified);
    if (!latestPost || postDate > latestPost) {
      latestPost = postDate;
    }

    const projectURL = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/blog/${post.node.slug}/`;
    projectsXML += `
      <url>
        <loc>${projectURL}</loc>
        <lastmod>${postDate.toISOString().split('T')[0]}</lastmod>
        <priority>0.50</priority>
        </url>`;
    });
    // <changefreq>monthly</changefreq>

  

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${process.env.NEXT_PUBLIC_WORDPRESS_URL}</loc>
        <lastmod>${latestPost}</lastmod>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>${process.env.NEXT_PUBLIC_WORDPRESS_URL}/blog/</loc>
        <priority>1.00</priority>
      </url>
      ${projectsXML}
    </urlset>`;

  //   return <div>Hello</div>
};

export default sitemapXML;

const allPosts = async () => {
  const data = await fetchAPI(
    `
        query PostsQuery {
          posts(first: 10000) {
            edges {
              node {
                title
                uri
                slug
                id
                modified
              }
            }
          }
        }
      `
  );
  return data?.posts;
};

export async function getServerSideProps(context) {
  const data = await allPosts();

  context.res.setHeader("Content-Type", "text/xml");
  context.res.write(sitemapXML(data));
  context.res.end();

  // Empty since we don't render anything
  return {
    props: {},
  };
}
