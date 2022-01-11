import * as React from "react"
import {graphql } from "gatsby"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'
import Layout from "../components/layout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const option = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p className="paragraph">{children}</p>},
//  [MARKS.BOLD]: (node, children) => {
//    <p>{children}</p>
//  },
//}
}

const BlogPostTemplate = ({ data, location }) => {
  const post = data.contentfulPosts
  const siteTitle ="Post"
  const { previous, next } = data
  const json=JSON.parse(post.description.raw)
  const img = getImage(post.image)
  
  console.log('json    ',json)
  
  return (
    <Layout location={location} title={siteTitle}>
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
      
         {documentToReactComponents(json,option)} 
         

         <h5>{post.image.description}</h5>
         <br/>
         <GatsbyImage image={img} alt={post.title} />

        </section>
        <footer>
          
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
    contentfulPosts(id: {eq: $id}) {
      title
      createdAt(formatString: "DD/MM/YYYY")
      description {
        raw
      }
      image {
        gatsbyImageData(layout: FULL_WIDTH, height: 50, width: 50)
        description
      }
    }
  }
`
