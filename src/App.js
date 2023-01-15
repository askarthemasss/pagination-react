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

  // console.log(Math.ceil(100/9));


  return (
    <>
      <div className="products">
        {
          // 9 Products per page
          // For page - 1 (First Index = 0, Last Index = 9)
          // First Index -  page * 9 - 9  =   1 * 9 - 9   = 0
          // Last index -   page * 9      =   1 * 9       = 9
          // products.slice(0,9) - for page no. 1 and so on.
          products && products.slice(page * 9 - 9, page * 9).map(product => {
            return (
              <div key={product.id} className='product__single'>
                <img src={product.thumbnail} alt={product.title}/>
                <h3 >{product.title}</h3>
              </div>
            )
          })
        } 
      </div>
      <div className='pagination'>
        {
          
        }
        <button onClick={page !== 1 ? () => setPage(page - 1) : null}>Prev</button>
        {
          /* 
            Total products = 100, products per page = 9
            No. of pages =  Math.ceil(Total_products/products_per_page) = 100/9 = 12
            Create an empty array of 12 elements to generate page numbers
          */
          [...Array(Math.ceil(100/9))].map((_,i) => {
            return (
              <button
                key={i}
                className={page === i+1 ? "current__page" : ""}
                onClick={() => setPage(i+1)}
              >
                {i+1}
              </button>
            )
          })
        }
        <button onClick={page !== Math.ceil(100/9) ? () => setPage(page + 1) : null}>Next</button>
      </div>
    </>
  );
}

export default App;
