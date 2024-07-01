import React from 'react'
import productsAndOffersstyle from '../stylee/productsAndOffersstyle.module.css'
import { Col, Container, Row } from 'react-bootstrap';
import Offers from './Offers';
import TrendingProducts from './TrendingProducts';
export const ProductsAndOffers = () => {
  return (
    <div className={productsAndOffersstyle.productsAndOffers}>
        <Container>
           <Row className={productsAndOffersstyle.row}>
            <Col sm={6} md={5} lg={4} xl={3}><Offers/></Col>
            <Col sm={6} md={7} lg={8} xl={8}><TrendingProducts/></Col>
           </Row>
        </Container>
    </div>
  )
}
export default ProductsAndOffers;