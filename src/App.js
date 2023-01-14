import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)

  useEffect(()=> {
    getProducts()
  },[])


  async function getProducts() {
    let res = await fetch(`https://dummyjson.com/products?limit=100`)
    let data = await res.json()

    setProducts(data.products)
  }

  // console.log(products);


  return (
    <div className="products">
      {
        products && products.map(product => {
          return (
            <div key={product.id} className='product__single'>
              <img src={product.thumbnail} alt={product.title}/>
              <h3 >{product.title}</h3>
            </div>
          )
        })
      } 
    </div>
  );
}

export default App;
