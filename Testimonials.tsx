
import React from 'react';
import { Testimonial } from '../types';
import { StarIcon } from './Icons';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <div className="flex items-center justify-center">
      {[...Array(5)].map((_, index) => (
        <StarIcon
          key={index}
          className="h-5 w-5 text-yellow-400"
          filled={index < rating}
        />
      ))}
    </div>
  );
};

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  // Show only top 3 testimonials
  const featuredTestimonials = testimonials.slice(0, 3);

  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">ماذا يقول عملاؤنا؟</h2>
          <p className="mt-4 text-lg text-gray-600">
            نحن فخورون بالثقة التي يضعها فينا آلاف المستخدمين في جميع أنحاء المغرب.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-lg text-center">
              <img
                className="h-20 w-20 rounded-full mx-auto"
                src={testimonial.authorImageUrl}
                alt={testimonial.authorName}
              />
              <div className="mt-4">
                <StarRating rating={testimonial.rating} />
              </div>
              <blockquote className="mt-6 text-gray-700">
                <p>&ldquo;{testimonial.comment}&rdquo;</p>
              </blockquote>
              <div className="mt-6">
                <p className="text-base font-medium text-gray-900">{testimonial.authorName}</p>
                <p className="text-sm text-gray-500">{testimonial.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;