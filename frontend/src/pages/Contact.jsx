import React from 'react';
import { FaPhoneAlt, FaPaperPlane, FaGlobe, FaFacebook, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#000718] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 rounded-3xl p-6 md:p-10 bg-black border border-purple-500 shadow-[0_0_40px_rgba(126,39,156,0.6)]">

        <div className="text-white space-y-6">
          <h2 className="text-3xl font-bold">Contact Information</h2>
          <h3 className="text-lg font-light">Fill up the form and our team will get back to you within 24 hours</h3>

          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <div className="bg-pink-500 p-4 rounded-full shadow-[0_0_15px_rgba(244,71,112,0.6)] text-2xl">
                <FaPhoneAlt className="text-white" />
              </div>
              <span>Phone: +1235 2355 98</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="bg-pink-500 p-4 rounded-full shadow-[0_0_15px_rgba(244,71,112,0.6)] text-2xl">
                <FaPaperPlane className="text-white" />
              </div>
              <span>Email: info@yoursite.com</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="bg-pink-500 p-4 rounded-full shadow-[0_0_15px_rgba(244,71,112,0.6)] text-2xl">
                <FaGlobe className="text-white" />
              </div>
              <span>Website: yoursite.com</span>
            </li>
          </ul>

          <div className="flex gap-4 pt-4">
            <a href="#" className="border border-pink-500 p-4 rounded-lg cursor-pointer hover:bg-white hover:text-black transition shadow-[0_0_15px_rgba(244,71,112,0.5)] text-2xl">
              <FaFacebook className="text-white" />
            </a>
            <a href="#" className="border border-pink-500 p-4 rounded-lg cursor-pointer hover:bg-white hover:text-black transition shadow-[0_0_15px_rgba(244,71,112,0.5)] text-2xl">
              <FaTwitter className="text-white" />
            </a>
            <a href="#" className="border border-pink-500 p-4 rounded-lg cursor-pointer hover:bg-white hover:text-black transition shadow-[0_0_15px_rgba(244,71,112,0.5)] text-2xl">
              <FaLinkedinIn className="text-white" />
            </a>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-purple-500 shadow-lg">
          <form className="space-y-6 text-black">
            <h2 className="text-2xl font-bold text-gray-800">Send us a message</h2>

            <div className="grid grid-cols-1 md:grid-cols-2  text-black gap-4">
              <input type="text" placeholder="First Name" className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <input type="text" placeholder="Last Name" className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <input type="email" placeholder="Email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            <input type="number" placeholder="Phone" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            <textarea placeholder="Write your message" className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"></textarea>

            <button type="submit" className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition shadow-md shadow-pink-300/30">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
