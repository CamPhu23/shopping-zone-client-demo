import React from 'react'
import { BASE_URL } from '../../constants/http'

export const Product = ({ product }) => {
  return (
    <div className="group relative">
      <div className="scale-100 transition-all duration-400 hover:scale-110 border rounded-md h-full">
        <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-t-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
          <img
            src={product.image.url}
            alt={product.image.name}
            className="w-full h-full lg:w-full lg:h-full object-cover object-center"
          />
        </div>
        <div className="px-5 py-3 flex justify-between">
          <div className='truncate flex space-x-5'>
            <h3 className="text-gray-700 truncate">
              <a href={`${BASE_URL}/product/${product.id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
                <p className="font-medium text-gray-900 mt-3">{product.price.toLocaleString('it-IT')} đ</p>
              </a>
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}
