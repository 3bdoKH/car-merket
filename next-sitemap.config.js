module.exports = {
    siteUrl: 'https://yourdomain.com', 
    generateRobotsTxt: true,
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 7000,
    exclude: ['/admin/*'],
    robotsTxtOptions: {
        policies: [
        { userAgent: '*', allow: '/' },
        { userAgent: '*', disallow: '/admin/' },
        ],
        additionalSitemaps: [
        'https://yourdomain.com/sitemap.xml',
        ],
    },
    i18n: {
        locales: ['en', 'ar'],
        defaultLocale: 'en',
    },
}; 