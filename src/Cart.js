import React from 'react';
import CartItem from './CartItem';

class Cart extends React.Component {
  constructor () {
    super();
    this.state = {
      products:[
        {
           price: 9999,
           title: 'Mobile Phone',
           qty: 1,
           img: '',
           id: 1
        },
        {
           price: 999,
           title: 'Watch',
           qty: 1,
           img: '',
            id: 2
        },
        {
           price: 99999,
           title: 'Laptop',
           qty: 1,
           img: '',
            id: 3
        },
        
      ]
     
    }
  }

  //Increase Qty Function
  handleIncreaseQuantity = (product) => {
    console.log('Heyy please increase the qty of ', product);
    const {products}= this.state;
    const index = products.indexOf(product);

    products[index].qty +=1;
    this.setState({
      product:product
    })
  }

  //Decrease Qty Function
  handleDecreaseQuantity = (product) => {
    console.log('Heyy please increase the qty of ', product);
    const {products}= this.state;
    const index = products.indexOf(product);
    if(products[index].qty !== 0){
      products[index].qty -=1;
      this.setState({
        product:product
      })
    }
    
  }
  // delete product function
  handleDeleteProduct = (id) => {
    const { products } = this.state;

    const items = products.filter((item) => item.id !== id); // [{}]

    this.setState({
      products: items
    })
  }

  render () {
    const {products} = this.state
    return (
      <div className="cart">
        {products.map((product) =>{
          return(
            <CartItem 
             product = {product}
             key={product.id} 
             onIncreaseQuantity={this.handleIncreaseQuantity}
             onDecreaseQuantity = {this.handleDecreaseQuantity}
             onDeleteProduct = {this.handleDeleteProduct}
            />
          )
        })}
      </div>
    );
  }
}

export default Cart;