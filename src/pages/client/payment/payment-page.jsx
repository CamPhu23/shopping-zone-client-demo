import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { ProductsCart } from '../../../components/product/product-list-cart';
import { currencyFomatter } from '../../../utils/currency-fomatter.js'
import { totalPay, totalDiscount, totalBill, shippingCost } from '../../../utils/calculate-payment'
import { useForm } from "react-hook-form";

export default function PaymentPage() {
  const products = useSelector(state => state.product.products);
  const [isCODPayment, setCODPayment] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => console.log(data);

  const renderTotalPayment = () => {
    return (
      <div className='space-y-3 divide-y divide-gray-200'>
        <div className='space-y-3'>
          <div className="flex justify-between text-gray-700">
            <p>Tổng tiền hàng:</p>
            <p>{totalPay(products)}</p>
          </div>
          <div className="flex justify-between text-gray-700">
            <p>Tổng tiền đã giảm:</p>
            <p>{totalDiscount(products)}</p>
          </div>
          <div className="flex justify-between text-gray-700">
            <p>Chi phí vận chuyển:</p>
            <p>{currencyFomatter(shippingCost)}</p>
          </div>
        </div>

        <div className="flex justify-between font-medium text-gray-900 pt-3">
          <p>Tổng tiền hàng:</p>
          <p>{totalBill(products)}</p>
        </div>
      </div>
    )
  }

  const renderCartProduct = () => {
    return (
      <div>
        <div className="border-gray-200 border-2 shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {(products && products.length !== 0) && <ProductsCart products={products} />}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-5 border-gray-200 border-2 shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white">
            <div className="flow-root">
              {(products && products.length !== 0) && renderTotalPayment()}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const validateInput = {
    fullname: {
      required: {
        value: true,
        message: "Họ và tên không được bỏ trống"
      }
    },
    phone: {
      required: {
        value: true,
        message: "Số điện thoại không được bỏ trống"
      },
      minLength: {
        value: 10,
        message: "Số điện thoại phải bao gồm 10 số"
      },
      validate: (value) => { return value > 0 ? true : "Số diện thoại phải có dịnh dạng là số" }
    },
    email: {
      required: {
        value: true,
        message: "Email không được bỏ trống"
      },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Email không hợp lệ"
      }
    },
    address: {
      required: {
        value: true,
        message: "Địa chỉ không được bỏ trống"
      },
    },
    cardNumber: {
      required: {
        value: !isCODPayment,
        message: "Số thẻ không được bỏ trống"
      },
      validate: (value) => {
        if (!isCODPayment) {
          if (value.length < 12) {
            return "Số thẻ không được ít hơn 12 số";
          }
          if (!(value > 0)) {
            return "Số thẻ phải có dịnh dạng là số";
          }
        }
        return true
      }
    },
    cardCVV: {
      required: {
        value: !isCODPayment,
        message: "Số thẻ không được bỏ trống"
      },
      validate: (value) => {
        if (!isCODPayment) {
          if (value.length < 4) {
            return "Số thẻ không được ít hơn 4 số";
          }
          if (!(value > 0)) {
            return "Số thẻ phải có dịnh dạng là số";
          }
        }
        return true
      }
    },
    cardEnddate: {
      required: {
        value: !isCODPayment,
        message: "Số thẻ không được bỏ trống"
      },
      validate: (value) => {
        if (!isCODPayment) {
          if (new Date(value) <= new Date()) {
            return "Thẻ đã hết thời hạn";
          }
        }
        return true
      }
    }
  }

  const renderError = (error) => {
    return error && (<span className='text-red-500' role="alert">{error.message}</span>)
  }

  const renderPaymentForm = () => {
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="border-gray-200 border-2 shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-9 sm:col-span-4">
                <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                  Họ và tên
                </label>
                <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  autoComplete="given-name"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  {...register("fullname", validateInput.fullname)}
                />

                {renderError(errors.fullname)}
              </div>

              <div className="col-span-3 sm:col-span-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  maxLength={10}
                  autoComplete="phone"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  {...register("phone", validateInput.phone)}
                />

                {renderError(errors.phone)}
              </div>

              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="text"
                  name="email-address"
                  id="email-address"
                  autoComplete="email"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  {...register("email", validateInput.email)}
                />

                {renderError(errors.email)}
              </div>

              <div className="col-span-6">
                <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  {...register("address", validateInput.address)}
                />


                {renderError(errors.address)}
              </div>

              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Phương thức thanh toán
                </label>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center">
                    <input
                      id="cod"
                      name="payment"
                      type="radio"
                      defaultChecked
                      onChange={() => setCODPayment(true)}
                      className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300"
                    />
                    <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">
                      COD (Chi phí sẽ được thanh toán sau khi nhận hàng)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="card"
                      name="payment"
                      type="radio"
                      onChange={() => setCODPayment(false)}
                      className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300"
                    />
                    <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">
                      Thẻ tín dụng
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                  Mã số thẻ tín dụng
                </label>
                <input
                  type="text"
                  name="card-number"
                  id="card-number"
                  autoComplete="card-number"
                  disabled={isCODPayment}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  maxLength={12}
                  {...register("cardNumber", validateInput.cardNumber)}
                />

                {renderError(errors.cardNumber)}
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label htmlFor="card-enddate" className="block text-sm font-medium text-gray-700">
                  Ngày hết hạn
                </label>
                <input
                  type="date"
                  name="card-enddate"
                  id="card-enddate"
                  autoComplete="card-enddate"
                  disabled={isCODPayment}
                  min='2000-01-01' max='3000-12-31'
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  {...register("cardEnddate", validateInput.cardEnddate)}
                />

                {renderError(errors.cardEnddate)}
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label htmlFor="card-cvv" className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="text"
                  name="card-cvv"
                  id="card-cvv"
                  autoComplete="card-cvv"
                  disabled={isCODPayment}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  maxLength={4}
                  {...register("cardCVV", validateInput.cardCVV)}
                />

                {renderError(errors.cardCVV)}
              </div>

              <div className="col-span-6">
                <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                  Ghi chú
                </label>
                <textarea
                  placeholder="Ví dụ: Giao hàng vào giờ hành chính"
                  name="note"
                  id="note"
                  rows={3}
                  autoComplete="note"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Thanh toán
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="m-10">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">

          {/* Product list */}
          {renderCartProduct()}

        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">

          {/* Payment info */}
          {renderPaymentForm()}
        </div>
      </div>
    </div>
  )
}
