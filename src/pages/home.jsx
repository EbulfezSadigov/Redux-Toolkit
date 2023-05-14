import React from 'react'
import Products from '../components/Products'

const Home = () => {
  return (
    <div>
        <h2 className="heading" style={{textAlign:'center'}}>Welcome to store</h2>
            <section>
                <h3 style={{fontSize:40}}>Products</h3>
                <Products />
            </section>
    </div>
  )
}

export default Home