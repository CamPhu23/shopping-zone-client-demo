/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react'
import { XIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom';
import { removeOfOutCartRequest } from '../../services/actions/product-action';

export const Cart = () => {
  const products = useSelector(state => state.product.products);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleRemove = (e) => {
    dispatch(removeOfOutCartRequest({
      id: e.target.getAttribute('product-id'),
      color: e.target.getAttribute('product-color'),
      size: e.target.getAttribute('product-size')
    }));
  }

  const renderProducts = () => {
    return products.map((product, index) => (
      <li key={product.id + index.toString()} className="flex py-6">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src={product.image}
            alt={product.imageAlt}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <Link to={`/product/${product.id}` || ''}> {product.name} </Link>
              </h3>
              <p className="ml-4">{(product.price * product.quantity).toLocaleString('it-IT')}đ</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">{colorConverter(product.color)} | {product.size}</p>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500">Số lượng {product.quantity}</p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                product-color={product.color}
                product-size={product.size}
                product-id={product.id}
                onClick={(e) => handleRemove(e)}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      </li>
    ))
  }

  const renderPaymentButton = () => {
    return (
      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Tổng tiền</p>
          <p>{(products.map(p => p.price * p.quantity)
            .reduce((a, b) => a + b, 0)).toLocaleString('it-IT')} đ</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">Chưa bao gồm chi phí vận chuyển.</p>
        <div className="mt-6">
          <Link
            to='/payment'
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Thanh toán
          </Link>
        </div>
        <div className="mt-3 flex justify-center text-center text-sm text-gray-500">
          <p>
            hoặc{' '}

            <Link to='/product' >
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => setOpen(false)}
              >
                Tiếp tục mua sắm<span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </div>
      </div>
    )
  }

  const renderCartIcon = () => {
    return (
      <div className="ml-4 flow-root lg:ml-6">
        <button className="group -m-2 p-2 flex items-center">
          <ShoppingCartIcon
            className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
            onClick={() => setOpen(true)}
          />
          <span className="sr-only">items in cart, view bag</span>
          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{products.length}</span>
        </button>
      </div>
    )
  }

  const colorConverter = (colorCode) => {
    if (colorCode == "trang") {
      return "trắng";
    }
    if (colorCode == "xam") {
      return "xám";
    }
    if (colorCode == "den") {
      return "đen";
    }
    return colorCode;
  }

  return (
    <div>
      {/* Cart icon */}
      {renderCartIcon()}

      {/* Cart side bar */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900"> Giỏ hàng </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8 flex justify-center">
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {products && products.length != 0
                                ?
                                renderProducts()
                                :
                                <div className='text-sm text-gray-400 my-8'>Chưa có sản phẩm được thêm vào giỏ hàng</div>
                              }
                            </ul>
                          </div>
                        </div>
                      </div>

                      {(products && products.length != 0) && renderPaymentButton()}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>

  )
}
