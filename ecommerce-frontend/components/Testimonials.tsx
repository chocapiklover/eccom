import React from 'react';

const testimonials = [
  {
    quote: "Kicks can't be beaten. Found kicks here that I'd been searching for months. Best spot for rare finds!",
    author: "Chris L."
  },
  {
    quote: "Amazing store! Great selection, even better service. Kicks is my go-to for unique sneakers.",
    author: "Mia S."
  },
  {
    quote: "Every visit to Kicks Corner scores a win. It's my secret spot for the sneakers no one else has!",
    author: "Tyrell J."
  }
];

const Testimonials = () => {
  return (
    <div className="bg-gray-200 overflow-hidden pb-8">
      <div className="border-b border-gray-600 py-8">
        <h2 className="text-4xl font-bold text-left p-2">From the fans</h2>
      </div>
      <div className="mt-4 flex flex-col md:flex-row md:justify-between">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="flex-1 p-4 bg-gray-200 mx-2 mb-4 md:mb-0">
            <p className="text-lg">{testimonial.quote}</p>
            <p className="text-left font-semibold mt-4">- {testimonial.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;