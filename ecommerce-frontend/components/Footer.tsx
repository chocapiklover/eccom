const Footer = () => {
    return (
        <div className="bg-gray-200 border-t border-gray-600">
      <div className="bg-pink-300 text-black py-4 px-8 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-600">
        <span className="mb-2 md:mb-0">Receive special offers and first look at new products.</span>
        <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto">
          <input
            type="email"
            placeholder="Email address"
            className="border-none bg-transparent border-b border-black focus:outline-none mb-2 md:mb-0 md:mr-4 w-full md:w-auto"
          />
          <button className="bg-transparent text-black border-none underline">Subscribe →</button>
        </div>
      </div>
      <div className=" flex flex-col md:flex-row border-t border-gray-600">
        <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-600 pt-10 pl-2  md:py-0 pr-4">
          <h3 className="font-semibold mb-2 sm:pt-4">About</h3>
          <p>This is a demo store. Product shots are provided by <a href="https://odto.com" className="underline">ODTO</a>.</p>
        </div>
        <div className="flex-1 border-b pt-6 pl-2 md:border-b-0 md:border-r border-gray-600 md:py-0 pr-4">
          <h3 className="font-semibold mb-2 pt-4">Shop</h3>
          <ul className="pb-8">
            <li>Shop all</li>
            <li>New Arrivals</li>
            <li>On Sale</li>
            <li>Brands</li>
          </ul>
        </div>
        <div className="flex-1 border-b pl-2 md:border-b-0 md:border-r border-gray-600 py-4 md:py-0 pr-4">
          <h3 className="font-semibold mb-2 pt-4">Information</h3>
          <ul className="pb-8">
            <li>Blog</li>
            <li>About us</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="flex-1 py-4 pl-2  md:py-0">
          <h3 className="font-semibold mb-2 mt-4" >Find Us</h3>
          <ul className="pb-8">
            <li>Facebook</li>
            <li>Instagram</li>
            <li>TikTok</li>
            <li>YouTube</li>
          </ul>
        </div>
      </div>
    </div>
    );
  };
  
  export default Footer;