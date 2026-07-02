import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(product._id);

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  const toggleWishlist = (e) => {
    e.preventDefault();
    if (!user) return;
    if (inWishlist) {
      removeFromWishlist(product._id, user.token);
    } else {
      addToWishlist(product._id, user.token);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm transition-transform hover:-translate-y-1 relative">
      {user && (
        <button onClick={toggleWishlist}
          className="absolute top-2 right-2 z-10 bg-white/80 dark:bg-slate-800/80 rounded-full w-8 h-8 flex items-center justify-center border-none cursor-pointer text-lg hover:bg-white dark:hover:bg-slate-800"
          title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}>
          {inWishlist ? '❤️' : '🤍'}
        </button>
      )}
      <Link to={`/products/${product._id}`}>
        <img src={product.image} alt={product.name} className="w-full h-[200px] object-contain p-4 bg-slate-50 dark:bg-slate-800" />
      </Link>
      <div className="p-4">
        <Link to={`/products/${product._id}`} className="font-semibold text-base text-slate-800 dark:text-slate-200 no-underline block mb-1">
          {product.name}
        </Link>
        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">{product.brand && `${product.brand} · `}{product.category}</p>
        {product.discount > 0 ? (
          <div className="mb-2">
            <span className="text-lg font-bold text-red-500 dark:text-red-400 mr-2">₹{discountedPrice.toFixed(2)}</span>
            <span className="text-sm text-slate-500 dark:text-slate-400 line-through mr-2">₹{product.price.toFixed(2)}</span>
            <span className="bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 text-xs px-2 py-[2px] rounded font-semibold">{product.discount}% OFF</span>
          </div>
        ) : (
          <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-2">₹{product.price.toFixed(2)}</p>
        )}
        <div className="text-amber-400 text-sm mb-3">
          {product.ratings > 0 ? (
            <>
              {'★'.repeat(Math.round(product.ratings))}
              {'☆'.repeat(5 - Math.round(product.ratings))}
              <span className="text-slate-500 dark:text-slate-400 ml-1.5">({product.numReviews})</span>
            </>
          ) : (
            <span className="text-slate-500 dark:text-slate-400">No reviews</span>
          )}
        </div>
        <button
          onClick={() => addToCart(product)}
          className="inline-flex items-center justify-center w-full px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
        {product.stock > 0 && product.stock < 5 && (
          <p className="text-xs text-amber-600 mt-1 text-center">Only {product.stock} left</p>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
