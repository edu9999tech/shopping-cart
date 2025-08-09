import React, { useState } from 'react';
import { useForm, type SubmitHandler } from "react-hook-form";
import Loading from './Loading';

interface FeedbackProps {
  open: boolean;
  onClose: (value: string) => void;
}

type FormValues = {
  name: string;
  email: string;
  phone?: string;
  rating: number;
  category: string;
  feedback: string;
  wouldRecommend: string;
  improvementSuggestions?: string;
};

const Feedback: React.FC<FeedbackProps> = ({ open, onClose }) => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);



  const handleClose = () => {
    onClose('closed');
    reset();
    setShowSuccess(false);
    setSelectedRating(0);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Feedback submitted:", {
      ...data,
      submittedAt: new Date().toISOString(),
      userAgent: navigator.userAgent
    });
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Auto close after success
    setTimeout(() => {
      handleClose();
    }, 2500);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">We Value Your Feedback! 💭</h2>
              <p className="text-blue-100 mt-1">Help us improve your shopping experience</p>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-200 transition-colors"
              disabled={isSubmitting}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Thank You! 🎉</h3>
            <p className="text-gray-600">Your feedback has been submitted successfully. We appreciate your time!</p>
          </div>
        )}

        {/* Form */}
        {!showSuccess && (
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  {...register("name", { 
                    required: "Name is required",
                    minLength: { value: 2, message: "Name must be at least 2 characters" }
                  })}
                  className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                {...register("phone", {
                  pattern: {
                    value: /^[\+]?[1-9][\d]{0,15}$/,
                    message: "Invalid phone number"
                  }
                })}
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+1 (555) 123-4567"
                disabled={isSubmitting}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Overall Experience Rating *
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setSelectedRating(star)}
                    className={`text-3xl transition-colors ${
                      star <= selectedRating ? 'text-yellow-400' : 'text-gray-300'
                    } hover:text-yellow-400`}
                    disabled={isSubmitting}
                  >
                    ⭐
                  </button>
                ))}
                <span className="ml-3 text-sm text-gray-600">
                  {selectedRating > 0 && (
                    selectedRating === 5 ? 'Excellent!' :
                    selectedRating === 4 ? 'Very Good!' :
                    selectedRating === 3 ? 'Good' :
                    selectedRating === 2 ? 'Fair' : 'Poor'
                  )}
                </span>
              </div>
              <input
                type="hidden"
                {...register("rating", { 
                  required: "Please provide a rating",
                  min: { value: 1, message: "Please select at least 1 star" }
                })}
                value={selectedRating}
              />
              {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Feedback Category *
              </label>
              <select
                {...register("category", { required: "Please select a category" })}
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              >
                <option value="">Select a category...</option>
                <option value="product_quality">Product Quality</option>
                <option value="user_interface">User Interface/Design</option>
                <option value="performance">Website Performance</option>
                <option value="checkout_process">Checkout Process</option>
                <option value="customer_service">Customer Service</option>
                <option value="shipping">Shipping & Delivery</option>
                <option value="pricing">Pricing</option>
                <option value="bug_report">Bug Report</option>
                <option value="feature_request">Feature Request</option>
                <option value="other">Other</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
            </div>

            {/* Main Feedback */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Feedback *
              </label>
              <textarea
                {...register("feedback", { 
                  required: "Please provide your feedback",
                  minLength: { value: 10, message: "Feedback must be at least 10 characters" }
                })}
                rows={4}
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                  errors.feedback ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Please share your thoughts, suggestions, or any issues you encountered..."
                disabled={isSubmitting}
              />
              {errors.feedback && <p className="text-red-500 text-sm mt-1">{errors.feedback.message}</p>}
            </div>

            {/* Recommendation */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Would you recommend our service to others? *
              </label>
              <div className="flex space-x-4">
                {[
                  { value: 'definitely', label: 'Definitely!', emoji: '👍' },
                  { value: 'probably', label: 'Probably', emoji: '🤔' },
                  { value: 'maybe', label: 'Maybe', emoji: '😐' },
                  { value: 'probably_not', label: 'Probably Not', emoji: '👎' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      {...register("wouldRecommend", { required: "Please select an option" })}
                      value={option.value}
                      className="sr-only"
                      disabled={isSubmitting}
                    />
                    <div className={`p-3 border-2 rounded-lg text-center transition-all hover:border-blue-300 ${
                      watch('wouldRecommend') === option.value 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300'
                    }`}>
                      <div className="text-2xl mb-1">{option.emoji}</div>
                      <div className="text-sm font-medium">{option.label}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.wouldRecommend && <p className="text-red-500 text-sm mt-1">{errors.wouldRecommend.message}</p>}
            </div>

            {/* Improvement Suggestions */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Suggestions for Improvement (Optional)
              </label>
              <textarea
                {...register("improvementSuggestions")}
                rows={3}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="What would make your experience even better?"
                disabled={isSubmitting}
              />
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                } text-white`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  'Submit Feedback'
                )}
              </button>
            </div>
          </form>
        )}

        {/* Loading Overlay */}
        <Loading 
          isLoading={isSubmitting} 
          text="Submitting your feedback..." 
          overlay={false}
        />
      </div>
    </div>
  );
};

export default Feedback;
