import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const HomeSearch = () => {
  const { products } = useSelector(state => state.Product);
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const lowerQuery = query.toLowerCase();
    return products.filter(product =>
      product.productTitle?.toLowerCase().includes(lowerQuery) ||
      product.brand?.toLowerCase().includes(lowerQuery)
    );
  }, [products, query]);

  return (
    <div className="w-full px-4 relative">
      <div className="flex items-center bg-[#f0f4ff] rounded-sm h-10 px-4 shadow-sm">
        <SearchIcon className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search for Products, Brands and More"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-500 text-sm sm:text-base"
        />
      </div>

      {query && (
        <div className="mt-2 left-3 z-50 right-[-45px] md:right-0 bg-white shadow rounded p-2 max-h-60 overflow-y-auto absolute">
          {filteredProducts.length ? (
            filteredProducts.map(product => (
              <Link to={`/product/${product._id}`} key={product._id}>
                <div className="border-b px-3 last:border-b-0 py-1 flex items-center justify-start">
                  <div className="w-[20%] md:w-[30%] lg:w-[10%]">
                    <img
                      src={`http://localhost:5000/uploads/${product.productImage?.[0]?.img}`}
                      className="w-12 xl:w-15 h-10 px-2"
                      alt=""
                    />
                  </div>
                  <div className="w-[80%] md:w-[70%] lg:w-[90%] px-4">
                    <p className="text-sm xl:text-lg text-gray-700 truncate overflow-hidden whitespace-nowrap">
                      {product.productTitle}
                    </p>
                  </div>

                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-500">No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomeSearch;
