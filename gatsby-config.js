const { isPublished } = require('./src/utils/dateFns')

module.exports = {
  siteMetadata: {
    title: `/* Code-Comments */`,
    author: `Stephen Weiss`,
    description: `Notes on software and life.`,
    siteUrl: `https://stephencharlesweiss.com/`,
    social: {
      twitter: `stephencweiss`,
    },
  },
  plugins: [
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-netlify-cache',
      options: {
        cachePublic: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/list`,
        name: `list`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/annual-review`,
        name: `annual-review`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/books`,
        name: `books`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/stats`,
        name: `stats`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `auto-link`,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            resolve: 'gatsby-remark-code-titles',
            options: {
              className: 'code-title',
            },
          },
          {
            resolve: `gatsby-remark-embed-snippet`,
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: '>',
              aliases: { zsh: 'shell' },
              noInlineHighlight: false,
            },
          },
          {
            resolve: `gatsby-plugin-facebook-pixel`,
            options: {
              pixelId: 'pixel id here',
            },
          },
          {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
              //trackingId: `ADD YOUR TRACKING ID HERE`,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          { resolve: 'gatsby-remark-embedder' },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  date: edge.node.frontmatter.date,
                  publish: edge.node.frontmatter.publish,
                  updated: edge.node.frontmatter.updated,
                  draft: edge.node.frontmatter.draft,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              })
            },
            query: `
                  {
                    allMarkdownRemark(
                      limit: 1000,
                      sort: { order: DESC, fields: [fields___publishDate] },
                      filter: {fields: {isPublished: {eq: true}, sourceInstance: {eq: "blog"}}}
                    ) {
                      edges {
                        node {
                          excerpt
                          html
                          fields { slug }
                          frontmatter {
                            title
                            date
                            publish
                            updated
                          }
                        }
                      }
                    }
                  }
                `,
            output: '/rss.xml',
            title: 'Code-Comments RSS Feed',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `/* Code-Comments */`,
        short_name: `{CC}`,
        start_url: `/`,
        background_color: `#FDF6E3`,
        display: `minimal-ui`,
        // icon: `content/assets/all_inclusive.svg`,
        icon: `content/assets/initials.svg`,
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
          `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  date: edge.node.frontmatter.date,
                  publish: edge.node.frontmatter.publish,
                  updated: edge.node.frontmatter.updated,
                  draft: edge.node.frontmatter.draft,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [fields___publishDate] },
                  filter: {fields: {isPublished: {eq: true}, sourceInstance: {eq: "blog"}}}
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                        publish
                        updated
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Code-Comments RSS Feed',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: true,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [
          { name: `title`, store: true, attributes: { boost: 20 } },
          `category`,
          `content`,
          `date`,
          `publish`,
          `tags`,
          `title`,
          `updated`,
        ],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          MarkdownRemark: {
            category: node => node.frontmatter.category,
            content: node => node.internal.content,
            date: node => node.frontmatter.date,
            path: node => node.fields.slug,
            publish: node => node.frontmatter.publish,
            tags: node => node.frontmatter.tags,
            title: node => node.frontmatter.title,
            updated: node => node.frontmatter.updated,
          },
        },
        filter: node => {
          if (
            !node.internal.type === 'MarkdownRemark' ||
            (node && node.fields && !node.fields.sourceInstance === 'blog')
          )
            return false
          return isPublished(node)
        },
      },
    },
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyzer',
      options: {
        production: true,
        disable: !process.env.ANALYZE_BUNDLE_SIZE,
        generateStatsFile: true,
        analyzerMode: 'static',
      },
    },
    {
      resolve: 'gatsby-source-xkcd',
      options: {
        comicQuantity: 5,
        latest: true,
      },
    },
  ],
}
