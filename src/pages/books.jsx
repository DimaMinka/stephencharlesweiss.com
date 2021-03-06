import React from 'react'
import { graphql } from 'gatsby'
import PostLink from '../components/PostLink'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import useSiteMetadata from '../hooks/useSiteMetadata'

function Books(props) {
  const { data } = props
  const { title: siteTitle } = useSiteMetadata()
  const books = data.books.edges

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="Books" keywords={['reading', 'notes', 'books']} />
      {books.map(({ node }) => {
        const { author, bookTitle } = node.frontmatter
        const { slug } = node.fields
        return (
          <div key={slug}>
            <PostLink slug={slug} title={`${bookTitle} by ${author}`} />
          </div>
        )
      })}

      <Bio />
    </Layout>
  )
}

export default Books

export const pageQuery = graphql`
  query {
    books: allMarkdownRemark(
      filter: { fields: { sourceInstance: { eq: "books" } } }
      sort: { order: ASC, fields: [frontmatter___authorLast, frontmatter___author, frontmatter___bookTitle] }
    ) {
      edges {
        node {
          id
          html
          fields {
            slug
          }
          frontmatter {
            title
            author
            bookTitle
          }
        }
      }
    }
  }
`
