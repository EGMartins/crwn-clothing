import React from 'react';

import { connect } from 'react-redux'

import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions'

import './checkout-item.styles.scss'

const CheckouItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return(
  <div className="checkout-item">
    <div className="image-container">
      <img src={imageUrl} alt="Item"/>
    </div>
    <span className="name">{name}</span>
    <span className="quantity">
    <div onClick={() => removeItem(cartItem)} className="arrow">&#10094;</div>
      <span className="value">{quantity}</span>  
    <div onClick={() => addItem(cartItem)} className="arrow">&#10095;</div>
    </span>
    <span className="price">{price}</span>
    <span onClick={() => clearItem(cartItem)} className="remove-button">&#10005;</span>
  </div>
)}

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItemFromCart(item)),
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item))
})

export default connect(null, mapDispatchToProps)(CheckouItem)