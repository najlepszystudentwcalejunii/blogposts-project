/** @type {import('next-sitemap').IConfig} */
const config = {
   siteUrl: process.env.SITE_URL || "http://localhost:3000", // Replace with your site's URL
   generateRobotsTxt: true, // (optional) Generate robots.txt file
   generateIndexSitemap: false,
};

module.exports = config;
