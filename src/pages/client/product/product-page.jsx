import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { FilterIcon } from '@heroicons/react/solid'
import { Paging } from '../../../components/paging/paging'
import { Filter } from '../../../components/filter/filter'
import { ProducList } from '../../../components/product/product-list'
import { Sort } from '../../../components/sort/sort'
import axiosRequest from '../../../config/http-request'
import { BASE_URL } from '../../../constants/http'
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE
}
  from '../../../constants/default-axios-product'
import _ from 'lodash'

const intialSortOptions = [
  { name: 'Bán chạy', value: 'most-popular', current: false },
  { name: 'Đánh giá cao', value: 'most-rating', current: true },
  { name: 'Mới nhất', value: 'newest', current: false },
  { name: 'Giá: Thấp tới cao', value: 'price-asc', current: false },
  { name: 'Giá: Cao tới Thấp', value: 'price-desc', current: false },
]

const subCategories = [
  { name: 'Áo thun nam', href: '#' },
  { name: 'Áo thun nữ', href: '#' },
  { name: 'Áo sơ mi nam', href: '#' },
  { name: 'Áo sơ mi nữ', href: '#' },
  { name: 'Áo khoác nam', href: '#' },
  { name: 'Áo khoác nữ', href: '#' },
]
const filters = [
  {
    id: 'color',
    name: 'Màu sắc',
    options: [
      { value: 'white', label: 'Trắng', checked: false },
      { value: 'black', label: 'Đen', checked: false },
      { value: 'blue', label: 'Xanh', checked: false },
      { value: 'gray', label: 'Xám', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: 'S', label: 'S', checked: false },
      { value: 'M', label: 'M', checked: false },
      { value: 'L', label: 'L', checked: false },
      { value: 'XL', label: 'XL', checked: false },
      { value: 'XXL', label: 'XXL', checked: false },
    ],
  },
  {
    id: 'feature',
    name: 'Dịch vụ & Khuyến mãi',
    options: [
      { value: 'new-arrivals', label: 'Sản phẩm mới', checked: false },
      { value: 'flash-sales', label: 'Sản phẩm khuyến mãi', checked: false },
      { value: 'best-seller', label: 'Sản phẩm bán chạy', checked: false },
    ],
  },
]

const initialProducts = {
  products: [
    {
      id: 1,
      name: 'Basic Tee',
      image: {
        name: 'Basic Tee Image 1',
        url: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      },
      price: '$35',
      color: 'Black',
    }
  ],
  info: {
    currentIndex: DEFAULT_PAGE,
    numberOfIndex: DEFAULT_PAGE_SIZE,
    total: 1
  }
}

let parameters = [
  { name: 'p', value: DEFAULT_PAGE },
  { name: 's', value: DEFAULT_PAGE_SIZE },
  { name: 'category', value: [] },
  { name: 'color', value: [] },
  { name: 'size', value: [] },
  { name: 'feature', value: [] },
];

export default function ProductPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [sortOptions, setSortOptions] = useState(intialSortOptions)

  const [products, setProducts] = useState(initialProducts);

  const handleProduct = () => {
    let apiProduct = `${BASE_URL}/products?`;
    apiProduct += parameters[0].name + '=' + parameters[0].value; 
    parameters.slice(1).map(p => {
      !_.isEmpty(p.value) ? apiProduct += '&' + p.name + '=' + p.value.toString() : apiProduct = apiProduct;
    })
    console.log(apiProduct);
    axiosRequest
      .get(apiProduct)
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  const handleAddParameter = (name, value) => {
    var parameter = parameters.find(x => x.name == name);
    
    if (name !== 'p' && name !== 's') {
      if (!_.isEmpty(parameter) && !parameter.value.includes(value))  parameter.value.push(value);
    } else {
      parameter.value = value;
    }

    console.log(parameters);

    handleProduct();
  }

  const handleRemoveParameter = (name, value) => {
    var parameter = parameters.find(x => x.name == name);

    if(parameter.value.includes(value)) parameter.value = parameter.value.filter(item => value != item)
    console.log(parameter);
    
    handleProduct();
  }

  // const handleAddParameter = (name, value) => {
  //   const parameter = name + '='

  //   if (apiProduct.includes(parameter)) {
  //     apiProduct = apiProduct.substring(0, apiProduct.indexOf(parameter) + parameter.length) 
  //                 + value 
  //                 + apiProduct.substring(apiProduct.indexOf(parameter) + parameter.length + value.length + 1);
  //   } else {
  //     apiProduct = apiProduct + '&' + parameter + value;
  //   }
  //   console.log(apiProduct);

  // }

  // const handleProduct = ({
  //   category = DEFAULT_CATERGORY,
  //   color = DEFAULT_COLOR,
  //   size = DEFAULT_SIZE,
  //   feature = DEFAULT_FEATURE,
  //   p = DEFAULT_PAGE,
  //   s = DEFAULT_PAGE_SIZE,
  // }) => {
  //   apiProduct += '?p=' + p + '&s=' + s;
  //   if (!_.isEmpty(category)) apiProduct += '&category=' + category;
  //   if (!_.isEmpty(color)) apiProduct += '&color=' + color;
  //   if (!_.isEmpty(size)) apiProduct += '&size=' + size;
  //   if (!_.isEmpty(feature)) apiProduct += '&feature=' + feature;

  //   console.log(apiProduct);
  //   axiosRequest
  //     .get(apiProduct)
  //     .then((data) => {
  //       setProducts(data.products)
  //       console.log(data.products)
  //     })
  //     .catch((err) => {
  //       throw new Error(err);
  //     });

  // }

  useEffect(() => {
    handleProduct();
  }, [])

  const handleSort = (option) => {
    console.log("handle sort" + option);
  }

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="z-50 fixed top-10 inset-0 flex z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Bộ lọc</h2>
                  <button
                    type="button"
                    className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>
                  <ul role="list" className="font-medium text-gray-900 px-2 py-3">
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a href={category.href} className="block px-2 py-3">
                          {category.name}
                        </a>
                      </li>
                    ))}
                  </ul>

                  {/* FILTER MOBILE */}
                  {filters && filters.map((section) => (
                    <Filter section={section} key={section.id} />
                  ))}
                </form>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex items-baseline justify-between pt-10 pb-6 border-b border-gray-200">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Tất cả sản phẩm</h1>


            <div className="flex items-center">

              <Sort options={sortOptions} handleSort={handleSort}></Sort>

              <button
                type="button"
                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FilterIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="mx-3 font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul>

                {/* FILTER */}
                {filters && filters.map((section) => (
                  <Filter section={section} key={section.id} 
                          handleAddFilter={handleAddParameter} 
                          handleRemoveFilter={handleRemoveParameter}/>
                ))}
              </form>

              <div className="lg:col-span-3">

                {/* PRODUCT LIST (3 items each row) */}
                <ProducList products={products.products} columns={3}></ProducList>

                {/* PAGING (total product and 9 products each page) */}
                <Paging totalItem={products.info.total} numOfShowingPerPage={DEFAULT_PAGE_SIZE} 
                        handleChangePage={handleAddParameter}/>

              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}