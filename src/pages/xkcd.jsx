import React from 'react'
import { graphql, Link } from 'gatsby'

import { ImageGallery } from '../components/ImageGallery'
import Layout from '../components/Layout'
import useSiteMetadata from '../hooks/useSiteMetadata'
import { Title } from '../components/Headers'

export function XKCDGallery(props) {
  const { title } = useSiteMetadata()

  const { comicQuantity, latest } = props.data.allXkcd.nodes[0]
  const xkcdComics = [latest, ...comicQuantity]

  return (
    <Layout location={props.location} title={title}>
      <Title>
        XKCD Daily Digest<sup>1</sup>
      </Title>
      <ImageGallery images={xkcdComics} />
      <p>
        <em>Why this page exists</em>
      </p>
      <p>
        I love Randall Munroe's XKCD comic. Maybe too much. If I go to xkcd.com,
        I can blink and an hour will have passed. This page is intended to allow
        me to keep up to date while also catching the backlog... overtime.
      </p>
      <p>
        This is a true digest. I cannot press random. There is no refresh to get
        a new set of comics, no infinite scroll, no easy rush of endorphines.
      </p>
      <footer>
        <h2>Footnotes</h2>
        <ul>
          <li>
            <p>
              <sup>1</sup>I wrote about building this page on my blog. You can
              find it&nbsp;
              <Link to="/blog/2020-01-25/building-xkcd-daily-digest">here</Link>
              .
            </p>
          </li>
        </ul>
      </footer>
    </Layout>
  )
}

export default XKCDGallery

export const xkcdPageQuery = graphql`
  query getLatest {
    allXkcd {
      nodes {
        id
        latest {
          month
          num
          link
          year
          news
          safe_title
          transcript
          alt
          img
          title
          day
        }
        comicQuantity {
          month
          num
          link
          year
          news
          safe_title
          transcript
          alt
          img
          title
          day
        }
      }
    }
  }
`
