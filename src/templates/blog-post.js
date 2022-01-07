import * as React from "react"
import { Link, graphql } from "gatsby"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'


import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const RICHTEXT_OPTIONS = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
    return
    <p>{children}</p>
  },
  [MARKS.BOLD]: (node, children) => {
    return
    <p>{children}</p>
  },
}}

const BlogPostTemplate = ({ data, location }) => {
  const post = data.contentfulPosts
  const siteTitle ="Post"
  const { previous, next } = data
  const json=JSON.parse(post.description.raw)

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.title}
        description={post.description.raw || post.title}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.title}</h1>
          <p>{post.createdAt}</p>
        </header>
      
        <section>
        
          {documentToReactComponents(json,RICHTEXT_OPTIONS)}
        </section>
        <footer>
          <Bio />
        </footer>
      </article>
      
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query MyQuery(
    $id: String!)
     {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPosts(id: { eq: $id }) {
       id
    title
    slug
    createdAt(formatString: "DD/MM/YYYY")
    description {
      raw
    }
    image {
      gatsbyImageData(height: 300, width: 200)
    }
    }
  }
`
