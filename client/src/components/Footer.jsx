import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-white mb-4">About Flipcart</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Press</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-bold text-white mb-4">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Track Order</a></li>
              <li><a href="#" className="hover:text-white transition">Shipping Info</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-bold text-white mb-4">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition">Return Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Security</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-white mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition text-2xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition text-2xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition text-2xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition text-2xl">
                <FaLinkedin />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition text-2xl">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="text-center text-sm">
          <p>&copy; 2024 Flipcart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
