const Showcase = () => {
    return (
      <section className="bg-gray-200 border border-gray-800 py-10">
        <div className="max-w-full flex flex-wrap ">
          <div className="w-full lg:w-1/2 relative border border-gray-800 ">
            <img
              src="https://image.goat.com/transform/v1/attachments/product_template_pictures/images/100/550/257/original/1359792_00.png?width=900"
              alt="Shop Nike Dunk"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4  border border-gray-600left-4 text-black text-lg ">
              Shop Nike Dunk
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative border border-gray-800">
            <img
              src="https://image.goat.com/transform/v1/attachments/product_template_pictures/images/098/949/375/original/1253703_00.png.png?width=900"
              alt="Shop Air Jordan"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 text-black text-lg ">
              Shop Air Jordan
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Showcase ;