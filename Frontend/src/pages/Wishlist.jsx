import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

function Wishlist() {
  const { user } = useAuth();
  const { wishlistItems, fetchWishlist, loading } = useWishlist();

  useEffect(() => {
    if (user) fetchWishlist(user.token);
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-[1200px] mx-auto px-5 text-center py-20">
        <h2 className="mb-3">Please Login</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">Login to view your wishlist.</p>
        <Link to="/login" className="inline-flex items-center justify-center px-5 py-3 rounded-lg text-sm font-semibold bg-indigo-600 text-white no-underline">Login</Link>
      </div>
    );
  }

  if (loading) return <div className="text-center py-20"><p>Loading...</p></div>;

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-10">
      <h2 className="text-2xl font-bold mb-6">My Wishlist ({wishlistItems.length})</h2>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-500 dark:text-slate-400 mb-4">Your wishlist is empty.</p>
          <Link to="/products" className="inline-flex items-center justify-center px-5 py-3 rounded-lg text-sm font-semibold bg-indigo-600 text-white no-underline">Browse Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
          {wishlistItems.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
