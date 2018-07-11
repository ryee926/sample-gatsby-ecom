/* eslint-disable */

import React from 'react'
import get from 'lodash/get'
import { Image, Header } from 'semantic-ui-react'
import Helmet from 'react-helmet'
import ProductList from '../components/ProductList'
import logo from '../images/meowify_logo_v1.png'

class StoreIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const products = get(this, 'props.data.allMoltinProduct.edges')
    const filterProductsWithoutImages = products.filter(
      v => v.node.includedData.main_image.link.href
    )
    return (
      <div>
        <Helmet title={siteTitle} />
        <Header as="h3" icon textAlign="center" style={{ marginBottom: '2em' }}>
          <Header.Content style={{ width: '60%', margin: '0 auto' }}>
            <Image src={logo} alt={'logo'}/>
          </Header.Content>
        </Header>
        <ProductList products={filterProductsWithoutImages} />
      </div>
    )
  }
}

export default StoreIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMoltinProduct {
      edges {
        node {
          originalId
          name
          description
          slug
          meta {
            display_price {
              with_tax {
                amount
                currency
                formatted
              }
            }
          }
          includedData {
            main_image {
              id
              type
              link {
                href
              }
            }
          }
          mainImage {
            childImageSharp {
              resolutions("(max-width: 500px) 100vw, 500px") {
                ...GatsbyImageSharpResolutions
              }
            }
          }
        }
      }
    }
  }
`
