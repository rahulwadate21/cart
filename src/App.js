import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import firebase from 'firebase/compat/app';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true
    };
       this.db = firebase.firestore();
  }

  componentDidMount() {
    firebase.firestore().collection("products").onSnapshot(snap => {
      const products = snap.docs.map(doc => {
        const data = doc.data();
        data["id"] = doc.id;
        return data;
      });
      this.setState({ products: products, loading: false });
    });
  }

  handleIncreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    // products[index].qty += 1;
    // this.setState({
    //   products
    // })
    const docRef = this.db.collection("products").doc(products[index].id);
    docRef
      .update({ qty: products[index].qty + 1 })
      .then(() => {
        console.log("Document updated sucessfully");
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }
    // products[index].qty -= 1;
    // this.setState({
    //   products
    // })
    const docRef = this.db.collection("products").doc(products[index].id);
    docRef
      .update({ qty: products[index].qty - 1 })
      .then(() => {
        console.log("Document updated sucessfully");
      })
      .catch(error => {
        console.log(error);
      });

  }

  handleDeleteProduct = (id) => {
    const { products } = this.state;
    // const items = products.filter((item) => item.id !== id); // [{}]
    // this.setState({
    //   products: items
    // })
    const docRef = this.db.collection("products").doc(id);

    docRef
      .delete()
      .then(() => {
        console.log("Product Deleted sucessfully");
      })
      .catch(error => {
        console.log(error);
      });
  }

  getcountOfCartItems = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    })

    return count;
  }

  getcartTotal = () => {
    const { products } = this.state;
    let cartTotal = 0;

    products.map(product => {
      if (product.qty > 0) {
        cartTotal = cartTotal + product.qty * product.price;
      }
      return "";
    });

    return cartTotal;
  };

  addProduct = () => {
    firebase.firestore()
      .collection("products")
      .add({
        img: "",
        price: 39999,
        qty: 1,
        title: "Led TV"
      })
      .then(docRef => {  
        docRef.get().then(doc => {
        console.log("Product has been added", doc.data());
    });
     
    })
  };


  render () {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getcountOfCartItems()} />
        <button onClick={this.addProduct} style={{ padding: 20, fontSize: 20 }}>
          Add a Product
        </button>
        <Cart
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
          products={products}
        />
         {loading && <h1>Loading Products...</h1>}
        <div style={{ padding: 10, fontSize: 20}}>
          TOTAL : {this.getcartTotal()}
        </div>
      </div>
    );
  }
}

export default App;
