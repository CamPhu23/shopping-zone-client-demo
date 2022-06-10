import { RadioGroup } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Icon1 from '../../../assets/Icon1.png';
import Icon2 from '../../../assets/Icon2.png';
import Icon3 from '../../../assets/Icon3.png';
import { Star } from '../../../components/star/star';
import { addToCartRequest } from '../../../services/actions/product-action';
import { productService } from '../../../services/modules';
import { useParams } from 'react-router-dom'

const COLOR_CODES = {
  trang: {
    displayName: "Trắng",
    class: "bg-white",
    selectedClass: "ring-gray-400",
  },
  den: {
    displayName: "Đen",
    class: "bg-gray-900",
    selectedClass: "ring-gray-900",
  },
  xam: {
    displayName: "Xám",
    class: "bg-gray-200",
    selectedClass: "ring-gray-400",
  },
  xanh: {
    displayName: "Xanh",
    class: "bg-blue-200",
    selectedClass: "ring-blue-400",
  },
};

export default function DetailProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState({})
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [sizes, setSizes] = useState([]);
  const [qty, setQty] = useState(1);

  const { register, handleSubmit, formState: { errors }, watch, reset, setFocus } = useForm();
  // const [nameofCustomer, setNameofCustomer] = useState('');
  // const [content, setContent] = useState('');

  const dispatch = useDispatch();

  const classNames = (...classes) => classes.filter(Boolean).join(" ");

  useEffect(() => {
    productService.getProductById(id)
    .then(product => {
      setProduct(product);
    })
  }, [id]);

  useEffect(() => {
    if (product && product.warehouses) {
      const selectedItem = product.warehouses.info.find(
        (item) => item.color === selectedColor
      );

      if (selectedItem) setSizes(selectedItem.sizes);
      setSelectedSize(null);
    }
  }, [selectedColor]);

  const onAddToCartClicked = () => {
    dispatch(addToCartRequest({
      id: product.id,
      name: product.name,
      price: product.price,
      discountPrice: product.price * (product.discount / 100),
      image: product.images[0].url,
      color: selectedColor,
      size: selectedSize,
      quantity: qty,
    }));
  };

  const renderProductImage = (images) => {
    return (
      images && (
        <div className="text-center object-cover object-center rounded w-full md:w-1/2 md:mr-3">
          <Carousel showStatus={false} showArrows={false} autoPlay={true} thumbWidth={60} >
            {images.map((img) => (
              <div key={img.id}>
                <img src={img.url} className="rounded-lg" alt={img.name} />
              </div>
            ))}
          </Carousel>
        </div>
      )
    );
  };

  const renderProductRating = (ratings, totalSold) => {
    if (!ratings) return null;

    const { stars, totalRatings } = ratings;
    return (
      <div className="flex mb-4">
        <span className="flex items-center">
          <Star rate={stars}/> 
          <span className="ml-3">|</span>
          <span className="text-gray-600 mx-3">{totalRatings} đánh giá</span>
          {/* <span className="text-gray-600 ml-3">
            {totalSold} sản phẩm đã bán
          </span> */}
        </span>
      </div>
    );
  };

  const renderProductPrices = (price, discount) => {
    if (!price) return null;

    let finalPrices = price;
    if (discount > 0) {
      finalPrices = Math.ceil(price - (price * discount) / 100);
    }

    const getCurrency = (prices) =>
      prices.toLocaleString("it-IT");

    return (
      <div className="flex my-4 lg:mt-6 lg:mb-8">
        <span className="font-medium text-xl text-gray-700">
          {getCurrency(finalPrices)}đ
        </span>

        {discount && discount > 0 ? (
          <>
            <span className="mx-6 font-medium text-xl text-gray-300 line-through">
              {getCurrency(price)}đ
            </span>

            <span className="font-medium text-xl text-rose-600">{discount}%</span>
          </>
        ) : <></>}
      </div>
    );
  };

  const renderProductColors = (data) => {
    if (!data) return null;
    const colors = data.map((item) => item.color);

    return (
      colors && (
        <div className="flex items-center my-4 lg:mt-5 lg:mb-4">
          <span className="mr-8">Màu sắc:</span>
          <RadioGroup value={selectedColor} onChange={setSelectedColor}>
            <RadioGroup.Label className="sr-only">
              Choose a color
            </RadioGroup.Label>
            <span className="flex items-center space-x-3">
              {colors.map((color) => (
                <RadioGroup.Option
                  key={COLOR_CODES[color].displayName}
                  value={color}
                  className={({ checked }) =>
                    classNames(
                      COLOR_CODES[color].selectedClass,
                      checked ? "ring-2" : "",
                      "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
                    )
                  }
                >
                  <RadioGroup.Label as="span" className="sr-only">
                    {COLOR_CODES[color].displayName}
                  </RadioGroup.Label>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      COLOR_CODES[color].class,
                      "h-8 w-8 border border-black border-opacity-10 rounded-full"
                    )}
                  />
                </RadioGroup.Option>
              ))}
            </span>
          </RadioGroup>
        </div>
      )
    );
  };

  const renderProductSizes = (sizes) => {
    return (
      <div className="flex items-center my-4">
        <span className="mr-8">Kích cỡ:</span>

        {sizes && sizes.length > 0 ? (
          <RadioGroup value={selectedSize} onChange={setSelectedSize}>
            <RadioGroup.Label className="sr-only">
              Choose a size
            </RadioGroup.Label>
            <div className="grid grid-cols-4 gap-4">
              {sizes.map((size) => (
                <RadioGroup.Option
                  key={size}
                  value={size}
                  className={({ checked }) =>
                    classNames(
                      "bg-white shadow-sm text-gray-900 cursor-pointer",
                      checked ? "ring-2 ring-blue-500" : "",
                      "group relative border rounded-md py-2 px-5 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
                    )
                  }
                >
                  {({ checked }) => (
                    <>
                      <RadioGroup.Label as="span">{size}</RadioGroup.Label>
                      {
                        <span
                          className={
                            "absolute -inset-px rounded-md pointer-events-none"
                          }
                          aria-hidden="true"
                        />
                      }
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        ) : (
          <div className="text-sm text-gray-400">Vui lòng chọn màu áo</div>
        )}
      </div>
    );
  };

  const renderQuantity = () => {
    const increaseStep = () => {
      if (qty < 30) {
        setQty((prev) => prev + 1);
      }
    };

    const decreaseStep = () => {
      if (qty > 1) {
        setQty((prev) => prev - 1);
      }
    };

    return (
      <div className="my-4">
        <div className="flex items-center h-10">
          <div className="flex flex-row h-10 rounded-lg relative bg-transparent mt-1 w-40">
            <button
              className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
              onClick={decreaseStep}
            >
              <span className="m-auto text-2xl font-thin">−</span>
            </button>
            <input
              type="number"
              className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md flex items-center text-gray-600  outline-none"
              value={qty}
              readOnly
            ></input>
            <button
              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
              onClick={increaseStep}
            >
              <span className="m-auto text-2xl font-thin">+</span>
            </button>
          </div>
          <div className="ml-3 text-sm text-gray-400">(Đơn vị: cái)</div>
        </div>
      </div>
    );
  };

  const renderAddToCartButton = () => {
    
    return (
      <button
        className="flex text-white justify-center bg-teal-600 border-0 py-2 px-10 focus:outline-none hover:bg-teal-700 rounded mt-6 mb-4 w-full lg:mt-12 lg:mb-10"
        onClick={onAddToCartClicked}
        disabled={qty == 0 || !selectedColor || !selectedSize}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        Thêm vào giỏ hàng
      </button>
    );
  };

  const renderCommitment = () => {
    return (
      <div className="mt-6">
        <hr />
        <div className="flex">
          <div className="flex-1 border mt-2 p-2 transition ease-in-out hover:-translate-y-1 hover:shadow-lg">
            <img src={Icon1} className="w-full" alt="..." />
            <div className="card-body">
              <p className="text-center">Đổi trả cực dễ chỉ cần số điện thoại</p>
            </div>
          </div>

          <div className="flex-1 border mt-2 p-2 mx-2 transition ease-in-out hover:-translate-y-1 hover:shadow-lg">
            <img src={Icon2} className="w-full" alt="..." />
            <div className="card-body">
              <p className="text-center">60 ngày đổi trả vì bất kỳ lý do gì</p>
            </div>
          </div>

          <div className="flex-1 border mt-2 p-2 transition ease-in-out hover:-translate-y-1 hover:shadow-lg">
            <img src={Icon3} className="w-full" alt="..." />
            <div className="card-body">
              <p className="text-center">
                Giao hàng 2-5 ngày (có thể lâu hơn do Covid19)
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  
  const renderProductInfo = (product) => {
    return (
      product && (
        <div className="flex-1 w-full sm:pt-7 md:py-0 md:ml-3 lg:py-0 lg:w-1/2 lg:pl-10 lg:mt-0">
          <h2 className="text-sm title-font text-gray-500 tracking-widest">
            {product.category}
          </h2>
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
            {product.name}
          </h1>
          {product.warehouses &&
            renderProductRating(product.ratings, product.warehouses.sold)}
          {renderProductPrices(product.price, product.discount)}
          {product.warehouses && renderProductColors(product.warehouses.info)}
          {renderProductSizes(sizes)}
          {renderQuantity()}
          {renderAddToCartButton()}
          {renderCommitment()}
        </div>
      )
    );
  };

  const renderProductDescription = (description) => {
    return (
      description && (
        <div className="max-w-full lg:w-4/5 mx-auto ">
          <div className="max-w-2xl grid grid-cols-1 text-justify mx-6 mt-6 lg:max-w-7xl lg:px-6 ">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Mô tả sản phẩm
              </h2>
              <p className="mt-4 text-gray-500 text-justify">{description}</p>
            </div>
          </div>
        </div>
      )
    );
  };
  const handleAddComment = ({nameOfCustomer, content}) => {
    console.log(nameOfCustomer, content, id);
    commentService.addComment({nameOfCustomer, content, productID: id});
  }
  const renderComment = () =>{
    return(
      <div className="mx-6 mt-2 lg:w-4/5 flex flex-wrap lg:mx-auto ">
        <div className="bg-grey w-full ">
          <div className="max-w-5xl mx-auto mt-2 lg:px-6 ">
            <div className="bg-white modal__content rounded">
              <div className="modal__body my-1">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Bình luận
                </h2>
                
              </div>
              <div className="modal__footer mt-3">
                <div className="text-right">
                  <form onSubmit={handleSubmit(handleAddComment)}>
                    <div className="mt-4 border border-grey w-full border-1 rounded-lg p-2 relative focus:border-red">
                      <input type="text" placeholder="Nhập tên" className="w-full p-2 mb-4 focus:outline-1 focus:outline-blue-500 font-normal border-[0.1px] resize-none border-[#9EA5B1] rounded-md"
                      {...register("nameOfCustomer")}
                      />

                      <textarea
                        placeholder="Nhập bình luận hoặc câu hỏi"
                        className="w-full p-2 focus:outline-1 focus:outline-blue-500 font-normal border-[0.1px] resize-none h-[120px] border-[#9EA5B1] rounded-md"
                        name="content"
                        {...register("content")}
                      ></textarea>
                      <button 
                        className="w-20 bg-purple bg-teal-600 border-0 border-purple p-3 rounded-md text-sm font-semibold hover:bg-teal-700 hover:border-purple-dark text-white"
                        type="submit"
                        >
                        Gửi 
                      </button>
                    </div>

                  </form>
                
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Comment component */}
        {/* <Comments id={id}/> */}
        
        
        
        
        {/* <div className="antialiased mx-auto max-w-full px-2">
          <div className="space-y-4">
            <div className="flex">
              <div className="flex-shrink-0 mr-3">
                <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt=""/>
              </div>
              <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                <strong>tên</strong> <span className="text-xs text-gray-400">3:34 PM</span>
                <p className="text-sm md:text-base">nội dung cmt</p>
              </div>
            </div>

            <div className="space-y-4 ml-14" >
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt=""/>
                </div>
                <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                  <strong>tên</strong> <span className="text-xs text-gray-400">3:34 PM</span>
                  <p className="text-sm md:text-base">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua.
                  </p>
                </div>
              </div>
            </div>
          </div>    
        </div>  */}
      </div>
    );
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden ">
      <div className="container px-6 mt-5 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {renderProductImage(product.images)}
          {renderProductInfo(product)}
        </div>
      </div>

      {renderProductDescription(product.description)}
      {renderComment()}
    </section>
  );
}
