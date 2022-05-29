import { RadioGroup } from "@headlessui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Comments from "../../../components/comment/comments";
import { BASE_URL } from "../../../constants/http";
import Icon1 from '../../../assets/Icon1.png';
import Icon2 from '../../../assets/Icon2.png';
import Icon3 from '../../../assets/Icon3.png';


const dummyProduct = {
  id: "624570fbee34ac4d28c4b979",
  name: "product product product 1",
  description: "description 1",
  price: 120000,
  discount: 10,
  category: "ao-thun-nu",
  tags: ["san-pham-moi"],
  images: [
    {
      id: "624571b4ee34ac4d28c4b97c",
      name: "image 1",
      url: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    },
    {
      id: "624571b4ee34ac4d28c4b97b",
      name: "image 2",
      url: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    },
  ],
  warehouses: {
    info: [
      {
        color: "White",
        sizes: ["M", "L", "S"],
      },
      {
        color: "Black",
        sizes: ["M"],
      },
    ],
    sold: 50,
  },
  comments: [],
  ratings: {
    stars: 4,
    totalRatings: 10,
  },
  isDelete: false,
};

const COLOR_CODES = {
  White: {
    displayName: "Trắng",
    class: "bg-white",
    selectedClass: "ring-gray-400",
  },
  Black: {
    displayName: "Đen",
    class: "bg-gray-900",
    selectedClass: "ring-gray-900",
  },
  Gray: {
    displayName: "Xám",
    class: "bg-gray-200",
    selectedClass: "ring-gray-400",
  },
};

export default function DetailProductPage() {
  const [product, setProduct] = useState({});
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [sizes, setSizes] = useState([]);
  const [qty, setQty] = useState(0);

  const classNames = (...classes) => classes.filter(Boolean).join(" ");

  useEffect(() => {
    setProduct(dummyProduct); //just for test (building UI)

    //call product service to get product detail here
  }, []);

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
    console.log("clicked");
  };

  const renderProductImage = (images) => {
    return (
      images && (
        <div className="text-center object-cover object-center rounded md:w-5/12">
          <Carousel showStatus={false} showArrows={false}>
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
          {Array.from(Array(stars)).map(() => (
            <svg
              fill="currentColor"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 text-indigo-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
          ))}
          {Array.from(Array(5 - stars)).map(() => (
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 text-indigo-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
          ))}
          <span className="text-gray-600 mx-3">{totalRatings} đánh giá</span>|
          <span className="text-gray-600 ml-3">
            {totalSold} sản phẩm đã bán
          </span>
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
      prices.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });

    return (
      <div className="flex mt-6 mb-8">
        <span className="font-medium text-xl text-gray-700">
          {getCurrency(finalPrices)}
        </span>

        {discount && (
          <>
            <span className="mx-6 font-medium text-xl text-gray-300 line-through">
              {getCurrency(price)}
            </span>

            <span className="font-medium text-xl text-rose-600">10%</span>
          </>
        )}
      </div>
    );
  };

  const renderProductColors = (data) => {
    if (!data) return null;
    const colors = data.map((item) => item.color);

    return (
      colors && (
        <div className="flex items-center mt-5 mb-4">
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
          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1 w-40">
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
        className="flex text-white bg-indigo-600 border-0 py-2 px-10 focus:outline-none hover:bg-indigo-700 rounded mt-12 mb-16"
        onClick={onAddToCartClicked}
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
      <div className="mt-16">
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
        <div className="flex-1 lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-2 pt-24 lg:mt-0">
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
        <div className="bg-white">
          <div className="max-w-2xl mx-auto py-2 px-4 grid grid-cols-1 text-justify sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
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

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-16 m-5 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {renderProductImage(product.images)}
          {renderProductInfo(product)}
        </div>
      </div>

      {renderProductDescription(product.description)}

      {/* Q&A */}
      {/* <div className="bg-grey px-2 w-full max-w-5xl mx-auto">
        <div className="max-w-5xl mx-auto mt-10">
          <div className="bg-white p-1 modal__content rounded">
            <div className="modal__body my-1">
              <h2 className="text-gray-900 font-bold mb-1 text-lg">
                {" "}
                Leave a Comment
              </h2>
              <div className="mt-2 border border-grey w-full border-1 rounded-lg p-2 relative focus:border-red">
                <textarea
                  placeholder="Add your comment..."
                  className="w-full p-2 focus:outline-1 focus:outline-blue-500 font-bold border-[0.1px] resize-none h-[120px] border-[#9EA5B1] rounded-md"
                ></textarea>
              </div>
            </div>
            <div className="modal__footer mt-3">
              <div className="text-right">
                <button className="bg-purple text-black border-2 border-purple p-3 rounded-md text-xs font-semibold hover:bg-sky-700 hover:border-purple-dark hover:text-white">
                  Gửi đánh giá
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <!-- component --> */}
      {/* <Comments /> */}
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
  );
}
