import React from 'react'
import ProductItem from './ProductItem'

function ProductList({productList}) {
  return (
    <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 
    md:grid-cols-4 '>
        {productList.map(item=>(
          <div key={item?.id}>
            <ProductItem product={item} key={item?.id}/>
          </div>
        ))}
    </div>
  )
}

export default ProductList
