import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 py-4 mt-8 border-t">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <span className="text-sm text-gray-600">© {new Date().getFullYear()} Shopping Cart. All rights reserved.</span>
        <a href="mailto:support@shoppingcart.com" className="text-sm text-blue-600 hover:underline mt-2 md:mt-0">Contact Us</a>
      </div>
    </footer>
  )
}

export default Footer