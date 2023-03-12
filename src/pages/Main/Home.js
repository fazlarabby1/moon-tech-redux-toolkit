import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";
import { toggle, toggleBrand } from "../../features/filter/filterSlice";
import { getProducts } from "../../features/products/productsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);
  const {products, isLoading, isError} = useSelector(state => state.products);
  const {brands, stock} = filter;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  let content;

  if(isLoading){
    content = <div className="flex justify-center w-screen mt-24"><p className="border-4 border-dashed w-32 h-32 border-green-700 rounded-full animate-spin "></p></div>
  }

  if (products.length) {
    content = products.map((product) => (
      <ProductCard key={product.model} product={product} />
    ))
  }

  if (products.length && (filter.stock || filter.brands.length)) {
    content = products.filter((product) => {
      if (stock) {
        return product.status === true
      }
      return product;
    }).filter((product) => {
      if (filter.brands.length) {
        return filter.brands.includes(product.brand);
      }
      return product;
    }).map((product) => (
      <ProductCard key={product.model} product={product} />
    ))
  }

  const activeClass = "text-white  bg-indigo-500 border-white";

  return (
    <div className='max-w-7xl gap-14 mx-auto my-10'>
      <div className='mb-10 flex justify-end gap-5'>
        <button
          onClick={() => dispatch(toggle())}
          className={`border px-3 py-2 rounded-full font-semibold ${stock ? activeClass : null} `}
        >
          In Stock
        </button>
        <button
          onClick={() => dispatch(toggleBrand("amd"))}
          className={`border px-3 py-2 rounded-full font-semibold ${brands.includes('amd') ? activeClass : null}`}>
          AMD
        </button>
        <button
          onClick={() => dispatch(toggleBrand("intel"))}
          className={`border px-3 py-2 rounded-full font-semibold ${brands.includes('intel') ? activeClass : null}`}>
          Intel
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14'>
        {content}
      </div>
    </div>
  );
};

export default Home;
