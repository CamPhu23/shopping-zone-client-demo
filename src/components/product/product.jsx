import React from 'react'
import { BASE_URL } from '../../constants/http'
import { Star } from '../star/star'

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
        <div className="px-5 py-3 flex justify-between w-full">
          <div className='truncate flex space-x-5 w-full'>
            <h3 className="text-gray-700 truncate text-xl w-full">
              <a href={`${BASE_URL}/product/${product.id}`} className='space-y-3'>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
                <div className='flex items-center justify-between'>
                  <Star rate={product.rating}></Star>
                  <p className="font-medium text-gray-900">{product.price.toLocaleString('it-IT')} đ</p>
                </div>
              </a>
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}
