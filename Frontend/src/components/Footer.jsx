import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 mt-[60px]">
      <div className="max-w-[1200px] mx-auto px-5 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-extrabold text-indigo-600 text-lg mb-3">ShopEZ</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Your one-stop destination for effortless online shopping.</p>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3 dark:text-slate-200">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-slate-500">
            <Link to="/products" className="hover:text-indigo-600 dark:hover:text-indigo-400 no-underline text-slate-500 dark:text-slate-400">Products</Link>
            <Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 no-underline text-slate-500 dark:text-slate-400">About Us</Link>
            <Link to="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 no-underline text-slate-500 dark:text-slate-400">Contact Us</Link>
            <Link to="/faq" className="hover:text-indigo-600 dark:hover:text-indigo-400 no-underline text-slate-500 dark:text-slate-400">FAQ</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3 dark:text-slate-200">Account</h4>
          <div className="flex flex-col gap-2 text-sm text-slate-500">
            <Link to="/profile" className="hover:text-indigo-600 dark:hover:text-indigo-400 no-underline text-slate-500 dark:text-slate-400">My Profile</Link>
            <Link to="/orders" className="hover:text-indigo-600 dark:hover:text-indigo-400 no-underline text-slate-500 dark:text-slate-400">Order History</Link>
            <Link to="/wishlist" className="hover:text-indigo-600 dark:hover:text-indigo-400 no-underline text-slate-500 dark:text-slate-400">Wishlist</Link>
            <Link to="/cart" className="hover:text-indigo-600 dark:hover:text-indigo-400 no-underline text-slate-500 dark:text-slate-400">Cart</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3 dark:text-slate-200">Contact</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">support@shopez.com</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">+1 (555) 123-4567</p>
        </div>
      </div>
      <div className="text-center py-4 border-t border-slate-100 dark:border-slate-700 text-sm text-slate-400 dark:text-slate-500">
        <p>&copy; {new Date().getFullYear()} ShopEZ. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
