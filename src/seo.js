import blogContent from './data/blogContent'
import { projects } from './components/Portfolio/Portfolio'

export const SITE_ORIGIN = 'https://freetownpress.com'
export const SITE_NAME = 'Freetown Press'
export const DEFAULT_OG_IMAGE = '/images/freetown-press-og.png'

const corePages = {
  '/': {
    title: 'Freetown Press | Corporate Branding & Printing in Ghana',
    description: 'Freetown Press delivers corporate branding, premium printing, professional training, and dependable business supplies across Ghana.',
    image: DEFAULT_OG_IMAGE,
    imageAlt: 'Freetown Press — Elevating Brands. Delivering Excellence.',
    imageWidth: 1200,
    imageHeight: 630,
    priority: 1,
    changefreq: 'monthly',
  },
  '/services': {
    title: 'Branding, Printing, Training & Business Supplies | Freetown Press',
    description: 'Explore corporate branding, premium printing, merchandise, professional training, and business supply services from Freetown Press in Ghana.',
    image: DEFAULT_OG_IMAGE,
    imageAlt: 'Freetown Press branding, printing, training, and business supply services',
    imageWidth: 1200,
    imageHeight: 630,
    priority: 0.9,
    changefreq: 'monthly',
  },
  '/portfolio': {
    title: 'Corporate Branding & Printing Portfolio | Freetown Press',
    description: 'See corporate branding, merchandise, event signage, office branding, and print projects delivered by Freetown Press for organisations in Ghana.',
    image: DEFAULT_OG_IMAGE,
    imageAlt: 'Selected corporate branding and printing projects by Freetown Press',
    imageWidth: 1200,
    imageHeight: 630,
    priority: 0.9,
    changefreq: 'monthly',
  },
}

const normalizePath = (pathname = '/') => {
  const path = pathname.split(/[?#]/)[0] || '/'
  return path !== '/' ? path.replace(/\/+$/, '') : path
}

const absoluteUrl = (value) => {
  if (!value) return `${SITE_ORIGIN}${DEFAULT_OG_IMAGE}`
  if (/^https?:\/\//i.test(value)) return value
  return `${SITE_ORIGIN}${value.startsWith('/') ? value : `/${value}`}`
}

const portfolioDescription = (project) => (
  project.desc
  || `Explore ${project.title}, a ${project.category.toLowerCase()} project by Freetown Press in Ghana.`
)

const isoDate = (date) => {
  const parsed = new Date(date)
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString()
}

const breadcrumbs = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE_ORIGIN}${item.path}`,
  })),
})

const organisationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_ORIGIN,
  logo: `${SITE_ORIGIN}/images/Freetown-Logo-Ico-Text.webp`,
  email: 'request@thefreetownpress.com',
  telephone: '+233244069157',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Accra',
    addressCountry: 'GH',
  },
  sameAs: [
    'https://facebook.com/freetownpress',
    'https://instagram.com/freetownpress',
    'https://x.com/freetownpress',
    'https://linkedin.com/company/freetownpress',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_ORIGIN,
}

export const routeManifest = [
  ...Object.entries(corePages).map(([path, page]) => ({
    path,
    lastmod: '2026-06-22',
    priority: page.priority,
    changefreq: page.changefreq,
  })),
  ...projects.map((project) => ({
    path: `/portfolio/${project.id}`,
    lastmod: '2026-06-22',
    priority: 0.8,
    changefreq: 'yearly',
  })),
  ...blogContent.map((post) => ({
    path: `/blog/${post.slug}`,
    lastmod: isoDate(post.date)?.slice(0, 10) || '2026-06-22',
    priority: 0.8,
    changefreq: 'yearly',
  })),
]

export function getSeoForPath(pathname) {
  const path = normalizePath(pathname)
  const corePage = corePages[path]

  if (corePage) {
    return {
      ...corePage,
      path,
      canonical: `${SITE_ORIGIN}${path === '/' ? '/' : path}`,
      type: 'website',
      image: absoluteUrl(corePage.image),
      robots: 'index, follow',
      jsonLd: path === '/' ? [organisationSchema, websiteSchema] : [],
      status: 200,
    }
  }

  if (path.startsWith('/portfolio/')) {
    const id = path.slice('/portfolio/'.length)
    const project = projects.find((item) => item.id === id)

    if (project) {
      const description = portfolioDescription(project)
      return {
        path,
        title: `${project.title} | Freetown Press Portfolio`,
        description,
        canonical: `${SITE_ORIGIN}${path}`,
        type: 'website',
        image: absoluteUrl(project.image || DEFAULT_OG_IMAGE),
        imageAlt: project.title,
        robots: 'index, follow',
        jsonLd: [breadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'Portfolio', path: '/portfolio' },
          { name: project.title, path },
        ])],
        status: 200,
      }
    }
  }

  if (path.startsWith('/blog/')) {
    const slug = path.slice('/blog/'.length)
    const post = blogContent.find((item) => item.slug === slug)

    if (post) {
      const publishedTime = isoDate(post.date)
      return {
        path,
        title: `${post.title} | Freetown Press`,
        description: post.desc,
        canonical: `${SITE_ORIGIN}${path}`,
        type: 'article',
        image: absoluteUrl(post.img),
        imageAlt: post.title,
        robots: 'index, follow',
        publishedTime,
        section: post.cat,
        jsonLd: [
          breadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/#blog' },
            { name: post.title, path },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.desc,
            image: [absoluteUrl(post.img)],
            datePublished: publishedTime,
            dateModified: publishedTime,
            author: {
              '@type': 'Organization',
              name: SITE_NAME,
              url: SITE_ORIGIN,
            },
            publisher: {
              '@type': 'Organization',
              name: SITE_NAME,
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_ORIGIN}/images/Freetown-Logo-Ico-Text.webp`,
              },
            },
            mainEntityOfPage: `${SITE_ORIGIN}${path}`,
            articleSection: post.cat,
          },
        ],
        status: 200,
      }
    }
  }

  return {
    path,
    title: `Page Not Found | ${SITE_NAME}`,
    description: 'The page you requested could not be found.',
    canonical: `${SITE_ORIGIN}${path}`,
    type: 'website',
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    imageAlt: 'Freetown Press',
    imageWidth: 1200,
    imageHeight: 630,
    robots: 'noindex, nofollow',
    jsonLd: [],
    status: 404,
  }
}
