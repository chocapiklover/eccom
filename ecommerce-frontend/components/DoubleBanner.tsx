
const DoubleBanner = () => {

    return (
         <div>
      {/* Original Banner */}
      <div className="bg-gray-200  border-gray-800 py-1 overflow-hidden whitespace-nowrap relative">
        <div
          className="flex space-x-4 animate-marquee text-2xl py-3"
          style={{ animationPlayState: 'running' }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
        >
          <div className="flex-shrink-0  flex items-center">
            <p className="mx-4 text-black hover:text-pink-500 flex items-center">
              <img
                src="https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/e2fa9e56-2a1c-403c-9542-6a8c476b1a81_1.png?v=1698478723&width=960"
                alt="Image 1"
                className="h-8 w-8 mr-2"
              />
              New Clot Fragment Black Silk
            </p>
            <p className="mx-4 text-black hover:text-pink-500 flex items-center">
              <img
                src="https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/d81b45a2-2b04-4c30-80c5-ab106ebcf27d.png?v=1698395766&width=450"
                alt="Image 2"
                className="h-8 w-8 mr-2"
              />
              Nike Dunk Low Jackie Robinson
            </p>
            <p className="mx-4 text-black hover:text-pink-500 flex items-center">
              <img
                src="https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/a71cc7a9-9f88-4ad3-94f8-17b0607f67c5.png?v=1698747693&width=1920"
                alt="Image 3"
                className="h-8 w-8 mr-2"
              />
              Nike Dunk Low WMNS Rose Whisper
            </p>
            <p className="mx-4 text-black hover:text-pink-500 flex items-center">
              <img
                src="https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/e2badb9e-6c95-4758-9b68-0da111cab876.png?v=1698490585&width=750"
                alt="Image 4"
                className="h-8 w-8 mr-2"
              />
              Air Jordan 4 Thunder
            </p>
          </div>
          <div className="flex-shrink-0 min-w-full flex items-center">
            <p className="mx-4 text-black hover:text-pink-500 flex items-center">
              <img
                src="https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/ab816bc1-5483-4b04-97a9-3e0d39ba8517.png?v=1698517644&width=750"
                alt="Image 1"
                className="h-8 w-8 mr-2"
              />
              Air Jordan 4 Wmns Off-White Sail
            </p>
            <p className="mx-4 text-black hover:text-pink-500 flex items-center">
              <img
                src="https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/e30d457f-1e28-4e8f-a84f-005ff0305a27.png?v=1698412399&width=750"
                alt="Image 2"
                className="h-8 w-8 mr-2"
              />
              Nike Sb Dunk Low Ben & Jerry&apos;s Chunky Dunky
            </p>
          </div>
        </div>
      </div>
      {/* Reverse Banner */}
      <div className="bg-gray-200 border-b border-t border-gray-800 py-2 overflow-hidden whitespace-nowrap relative">
        <div
          className="flex space-x-4 animate-marqueeReverse py-2 text-2xl"
          style={{ animationPlayState: 'running' }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
        >
          <div className="flex-shrink-0 flex items-center">
            <p className="mx-4 text-black hover:text-pink-500 flex items-center">
              <img
                src="https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/e2fa9e56-2a1c-403c-9542-6a8c476b1a81_1.png?v=1698478723&width=960"
                alt="Image 1"
                className="h-8 w-8 mr-2"
              />
              New Clot Fragment Black Silk
            </p>
            <p className="mx-4 text-black hover:text-pink-500 flex items-center">
              <img
                src="https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/d81b45a2-2b04-4c30-80c5-ab106ebcf27d.png?v=1698395766&width=450"
                alt="Image 2"
                className="h-8 w-8 mr-2"
              />
              Nike Dunk Low Jackie Robinson
            </p>
            <p className="mx-4 text-black hover:text-pink-500 flex items-center">
              <img
                src="https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/a71cc7a9-9f88-4ad3-94f8-17b0607f67c5.png?v=1698747693&width=1920"
                alt="Image 3"
                className="h-8 w-8 mr-2"
              />
              Nike Dunk Low WMNS Rose Whisper
            </p>
            <p className="mx-4 text-black hover:text-pink-500 flex items-center">
              <img
                src="https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/e2badb9e-6c95-4758-9b68-0da111cab876.png?v=1698490585&width=750"
                alt="Image 4"
                className="h-8 w-8 mr-2"
              />
              Air Jordan 4 Thunder
            </p>
          </div>
          <div className="flex-shrink-0 min-w-full flex items-center">
            <p className="mx-4 text-black hover:text-pink-500 flex items-center">
              <img
                src="https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/ab816bc1-5483-4b04-97a9-3e0d39ba8517.png?v=1698517644&width=750"
                alt="Image 1"
                className="h-8 w-8 mr-2"
              />
              Air Jordan 4 Wmns Off-White Sail
            </p>
            <p className="mx-4 text-black hover:text-pink-500 flex items-center">
              <img
                src="https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/e30d457f-1e28-4e8f-a84f-005ff0305a27.png?v=1698412399&width=750"
                alt="Image 2"
                className="h-8 w-8 mr-2"
              />
              Nike Sb Dunk Low Ben & Jerry&apos;s Chunky Dunky
            </p>
          </div>
        </div>
      </div>
    </div>
    
)}

export default DoubleBanner;