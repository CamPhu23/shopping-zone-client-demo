// PRODUCT LIST
import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline'

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
]

// Category Previews
const callouts = [
  {
    name: 'Áo thun nam',
    //description: 'Work from home accessories',
    imageSrc: 'https://bizweb.sapocdn.net/100/438/408/products/apm3791-nav-2-aebfb314-b3e8-4920-ac57-b7e47ffac268.jpg?v=1652072325207',
    imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '#',
  },
  {
    name: 'Áo thun nữ',
    //description: 'Journals and note-taking',
    imageSrc: 'https://bizweb.sapocdn.net/100/438/408/products/tsn5008-tra-3.jpg?v=1655948346477',
    imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    href: '#',
  },
  {
    name: 'Áo khoác nam',
    //description: 'Daily commute essentials',
    imageSrc: 'https://bizweb.sapocdn.net/thumb/large/100/438/408/products/akm4029-xah-qjm3063-den-4.jpg?v=1637735749000',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
  {
    name: 'Áo khoác nữ',
    //description: 'Daily commute essentials',
    imageSrc: 'https://bizweb.sapocdn.net/thumb/large/100/438/408/products/akn4024-hog-1.jpg?v=1650612473000',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
  {
    name: 'Sơ mi nam',
    //description: 'Daily commute essentials',
    imageSrc: 'https://bizweb.sapocdn.net/100/438/408/products/smm4073-tra-3.jpg?v=1641780163303',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
  {
    name: 'Sơ mi nữ',
    //description: 'Daily commute essentials',
    imageSrc: 'https://bizweb.sapocdn.net/thumb/large/100/438/408/products/scn5130-den-4.jpg?v=1649998619000',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
]

// Feature Sections
const features = [
  {
    name: 'Giá cả cạnh tranh',
    description:
      'Chúng tôi mang đến cho khách hàng những sản phẩm tốt với giá cả phải chăng.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Miễn phí đổi trả sản phẩm',
    description:
      'Miễn phí đổi trả sản phẩm trong 60 ngày nếu có vấn đề với sản phẩm.',
    icon: ScaleIcon,
  },
  {
    name: 'Miễn phí vận chuyển cho đơn hàng từ 500.000 đồng',
    description:
      'Với đơn hàng từ 500.000 đồng trở lên, khách hàng sẽ được miễn chi phí vận chuyển.',
    icon: LightningBoltIcon,
  },
  {
    name: 'Tư vấn tận tình',
    description:
      'Đội ngũ nhân viên sẽ hỗ trợ tư vấn cho khách hàng chọn được những sản phẩm thật sự ưng ý.',
    icon: AnnotationIcon,
  },
]


const HomePage = () => {

  return (
    <>
      <div className="relative bg-white overflow-hidden">
        <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                Thời trang cho mọi người 
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                Trang phục không những phải đẹp, nó còn phải tạo nên phong cách của riêng bạn. Hãy cùng Shopping Zone 
                chọn cho mình những bộ quần áo thật ưng ý nào.
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
                          <img
                            src="https://bizweb.sapocdn.net/100/438/408/products/stm5003-dre-3.jpg?v=1648536762443"
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <img
                            src="https://bizweb.sapocdn.net/100/438/408/products/tsn5276-nau2.jpg?v=1650701121620"
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <img
                            src="https://bizweb.sapocdn.net/thumb/large/100/438/408/products/scn5194-den-qan5162-bee-5.jpg?v=1653097872000"
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <img
                            src="https://bizweb.sapocdn.net/100/438/408/products/scm4031-tit-5.jpg?v=1639021408260"
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <img
                            src="https://bizweb.sapocdn.net/thumb/large/100/438/408/products/acn5010-xat-3.jpg?v=1653096236000"
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <img
                            src="https://bizweb.sapocdn.net/thumb/large/100/438/408/products/akm4027-xah-qjm3077-xde-4.jpg?v=1642381400000"
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <img
                            src="https://bizweb.sapocdn.net/thumb/large/100/438/408/products/akn4054-xat-6.jpg?v=1650612411000"
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="#"
                  className="inline-block text-center bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700"
                >
                  Mua sắm ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    {/* Category Previews */}
    <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto pt-16 pb-0 sm:py-18 lg:pt-20 lg:pb-0 lg:max-w-none text-center">
            <h2 className="text-4xl font-extrabold text-gray-900">Dòng sản phẩm</h2>

            <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
              {callouts.map((callout) => (
                <div key={callout.name} className="group relative">
                  <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                    <img
                      src={callout.imageSrc}
                      alt={callout.imageAlt}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <h3 className="mt-6 font-semibold text-lg text-gray-900">
                    <a href={callout.href}>
                      <span className="absolute inset-0" />
                      {callout.name}
                    </a>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">{callout.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT LIST */}
      <div className="bg-white">
        <div className="max-w-2xl mx-auto pt-16 pb-0 px-4 sm:py-18 lg:pt-20 lg:pb-0 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 text-center">Sản phẩm mới nhất</h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-2xl mx-auto pt-16 pb-0 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:pt-20 lg:pb-0">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 text-center">Sản phẩm bán chạy</h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      {/* Feature Sections */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-20 lg:pb-0">
          <div className="lg:text-center">
            {/* <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Transactions</h2> */}
            <p className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Điều khác biệt mang tên Shopping Zone
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Chọn sản phẩm mà bạn yêu thích, mọi thứ còn lại hãy để Shopping Zone lo!
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Sections */}
      {/* <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-indigo-600">Start your free trial today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Get started
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default HomePage;
