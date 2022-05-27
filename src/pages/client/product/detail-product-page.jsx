import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Comments from "../../../components/comment/comments";
import { BASE_URL } from '../../../constants/http';

export default function DetailProductPage() {

  const [nameProduct, setNameProduct] = useState('');
  const [price, setPrice] = useState();
  const [rate, setRate] = useState();
  const [numberRates, setNumberRates] = useState();
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [qty, setQty] = useState(1);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([])
  

  // function to get size of product from db 
  const getSize = (warehouses) => {
    const sizeArray = [] 
    for(let i = 0; i< warehouses.length; i++){
      if(!sizeArray.includes(warehouses[i].size)){
        sizeArray.push(warehouses[i].size)
      }
    }
    return sizeArray
  }
  // function to get colors from db
  const getColors= (warehouses) => {
    const colorArray = [] 
    for(let i = 0; i< warehouses.length; i++){
      if(!colorArray.includes(warehouses[i].color)){
        colorArray.push(warehouses[i].color)
      }
    }
    return colorArray
  }

  // function to increase 1 step of amount product need to buy
  const increaseStep = () => {
    if(qty <  30) {
      setQty(prev => prev+1)
    }
  }
// function to decrease 1 step of amount product need to buy
  const decreaseStep = () => {
    if(qty > 1) {
      setQty(prev => prev-1)
    }
  }

  let apiDetailProduct = `${BASE_URL}/products/624570fbee34ac4d28c4b979`;
  // let apiProduct = `${BASE_URL}/products`;
  let numberOfRates = 0
  useEffect(()=> {
    axios.get(apiDetailProduct)
    .then(function(res){
      const response = res.data
      setNameProduct(response.name) //Set name of detail product
      setPrice(response.price)
      setRate(response.ratings[0].rate)
      numberOfRates = response.ratings.length
      setNumberRates(numberOfRates)
      setDescription(response.description)
      setImages(response.images)
      setSizes(getSize(response.warehouses))
      setColors(getColors(response.warehouses))
      console.log(getColors(response.warehouses))

      // return response
    })
    .catch(error => console.log(error))
    
  },[])


  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 m-5 mx-auto">
        <div className="max-h-full lg:w-4/5 mx-auto flex flex-wrap">
                    
          {/* <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400"/> */}
          <div className="text-center max-h-full lg:w-1/2 lg:h-auto object-cover object-center rounded">
            <Carousel showStatus="false" showArrows="false">
                {
                  images.map(img=>(
                    <div key={img.id}>
                      <img src={img.url} className="rounded-lg" />
                    </div>
                  ))
                }
                  
            </Carousel>
          </div>
          
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-2 pt-24 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1" >{nameProduct}</h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">| {numberRates} đánh giá</span>
              </span>
              {/* <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span> */}
            </div>
            <span className="title-font font-medium text-2xl text-gray-900">{price} đồng</span>
            {/* <p className="leading-relaxed text-justify">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.</p> */}
            <div className="flex mt-6 items-center pb-5 border-gray-100 mb-3">
              <div className="flex">
                <span className="mr-3">Màu sắc</span>
                {colors.map(color => (
                  <button className="border-2 border-gray-300 ml-1 rounded-full w-20 h-8 focus:bg-gray-600 focus:text-white">{color}</button>
                ))
                }         
                
                {/* <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none">Trắng</button>
                <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button> */}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                    {
                      sizes.map(size => (
                        <option>{size}</option>
                      ))
                    }
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="">
              <div className="float-left mb-5">
                <span>Chọn số lượng </span>
                <button type="button" onClick={decreaseStep} class="bg-gray-300 hover:bg-slate-800 text-xl w-10 h-10 rounded-md hover:text-white">−</button>
                <input type="text" className="text-center w-20 h-10 border-gray-500 border-2 rounded mx-2" value={qty}/>
                <button type="button" onClick={increaseStep} class="bg-gray-300 hover:bg-slate-800 text-xl w-10 h-10 rounded-md hover:text-white">+</button>
                <span className="ml-5">120 Sản phẩm có sẵn</span>
              </div>
              <button className="flex float-left text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-sky-800 rounded">
                <img src="https://bizweb.sapocdn.net/100/438/408/themes/862334/assets/shopping-cart.svg?1653552843173" alt="cart" className="mr-1"/>
                Thêm vào giỏ hàng
              </button>
              {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button> */}
            </div>
          </div>
        </div>
      </div>
  
  {/* Description */}
  <div className="bg-white">
      <div className="max-w-2xl mx-auto py-2 px-4 grid grid-cols-1 text-justify sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Mô tả sản phẩm</h2>
          <p className="mt-4 text-gray-500 text-justify">
            {description}
          </p>
        </div>
      </div>
    </div>
  {/* Q&A */}

  <div className="bg-grey px-2 w-full max-w-5xl mx-auto">
    <div className="max-w-5xl mx-auto mt-10"> 
      <div className="bg-white p-1 modal__content rounded">
        
        <div className="modal__body my-1">
          <h2 className="text-gray-900 font-bold mb-1 text-lg"> Leave a Comment</h2>
          <div className="mt-2 border border-grey w-full border-1 rounded-lg p-2 relative focus:border-red">
            <textarea placeholder="Add your comment..." className="w-full p-2 focus:outline-1 focus:outline-blue-500 font-bold border-[0.1px] resize-none h-[120px] border-[#9EA5B1] rounded-md"></textarea>
            {/* <input type="text" className="pl-2 text-grey-dark font-light w-full text-sm tracking-wide" placeholder="Type your commnet..."> */}
          </div>       
        </div>
        {/* Confirm or not */}
        <div className="modal__footer mt-3">
          <div className="text-right">
            {/* <button className="bg-white text-black border-2 p-3 rounded text-sm font-semibold hover:bg-grey-light">Cancel</button> */}
            <button className="bg-purple text-black border-2 border-purple p-3 rounded-md text-xs font-semibold hover:bg-sky-700 hover:border-purple-dark hover:text-white">Gửi đánh giá</button>
          </div>
        </div>
      </div>  
    </div>
  </div>

  {/* <!-- component --> */}
  <Comments />
  {/* <div className="antialiased mx-auto max-w-5xl px-2">
    <h2 className="mb-4 text-lg font-bold text-gray-900">Comments</h2>
      <div className="space-y-4">
        <div className="flex">
          <div className="flex-shrink-0 mr-3">
            <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt=""/>
          </div>
          <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
            <strong>tên</strong> <span className="text-xs text-gray-400">3:34 PM</span>
            <p className="text-sm md:text-base">nội dung cmt</p>
            <h4 className="my-5 uppercase tracking-wide text-gray-400 font-bold text-xs">Replies</h4>
            <div className="space-y-4" >
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <img className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt=""/>
                </div>
                <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                  <strong >tên ai</strong> <span className="text-xs text-gray-400">3:34 PM</span>
                  <p className="text-sm md:text-base">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore
                    magna aliquyam erat, sed diam voluptua.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>    
  </div> */}
</section>
    
  )
}
