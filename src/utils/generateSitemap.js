import { createWriteStream } from 'fs';
import { SitemapStream } from 'sitemap';

const sitemap = new SitemapStream({ hostname: 'https://colorchoreographer.com' });
const writeStream = createWriteStream('./dist/sitemap.xml');

sitemap.pipe(writeStream);

// Add URLs to the sitemap
sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
sitemap.write({ url: '/tools/palette', changefreq: 'weekly', priority: 0.8 });
sitemap.write({ url: '/tools/shapes', changefreq: 'weekly', priority: 0.8 });
sitemap.write({ url: '/articles', changefreq: 'weekly', priority: 0.7 });

// Articles
const articles = [
  'color-combinations',
  'animation-principles',
  'color-psychology'
];

articles.forEach(slug => {
  sitemap.write({ 
    url: `/articles/${slug}`, 
    changefreq: 'monthly', 
    priority: 0.6 
  });
});

sitemap.end();