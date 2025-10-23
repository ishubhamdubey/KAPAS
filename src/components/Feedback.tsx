import React, { useState } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    review: 'Absolutely love the quality and design! The fabric is so comfortable and the fit is perfect. Will definitely order more.',
  },
  {
    id: 2,
    name: 'Ananya Reddy',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    review: 'KAPAS has the best collection of ethnic wear. The designs are unique and the pricing is very reasonable. Highly recommended!',
  },
  {
    id: 3,
    name: 'Meera Patel',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 4,
    review: 'Beautiful kurtis with excellent craftsmanship. The delivery was quick and packaging was great. Very satisfied with my purchase.',
  },
  {
    id: 4,
    name: 'Sneha Iyer',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    review: 'The festive collection is amazing! Got so many compliments wearing the designer kurti. Thank you KAPAS for making me look beautiful!',
  },
];

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    review: '',
    rating: 5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your feedback!');
    setFormData({ name: '', email: '', review: '', rating: 5 });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setRating = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  return (
    <section id="feedback" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Customer Feedback
          </h2>
          <div className="w-24 h-1 bg-[#ff6b81] mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">
            What our customers say about us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <div className="flex items-center mt-1">
                    {[...Array(testimonial.rating)].map((_, index) => (
                      <Star
                        key={index}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {testimonial.review}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Share Your Experience
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b81] transition-all"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b81] transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Your Rating
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= formData.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Your Review
              </label>
              <textarea
                name="review"
                value={formData.review}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b81] transition-all resize-none"
                placeholder="Share your experience with us..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#ff6b81] hover:bg-[#ff8fa3] text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
