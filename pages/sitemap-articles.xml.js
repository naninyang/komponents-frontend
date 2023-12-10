const ArticleAPI = 'https://komponent.dev1stud.io/api/sitemapArticle';

function generateSiteMap(articles) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${articles
    .map(({ id, created }) => {
      return `
        <url>
          <loc>https://komponent.dev1stud.io/article/${id}</loc>
          <lastmod>${created}</lastmod>
        </url>
      `;
    })
    .join('')}
    </urlset>
  `;
}

function SiteMap() {}

export async function getServerSideProps({ res }) {
  const articleRequest = await fetch(ArticleAPI);
  const articleResponse = await articleRequest.json();
  const articles = articleResponse.data;

  if (!Array.isArray(articles)) {
    throw new Error('Invalid data format');
  }

  const sitemap = generateSiteMap(articles);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
