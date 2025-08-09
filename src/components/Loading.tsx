import React from 'react';

interface LoadingProps {
  isLoading: boolean;
  size?: 'small' | 'medium' | 'large';
  text?: string;
  overlay?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ 
  isLoading, 
  size = 'medium', 
  text = 'Loading...', 
  overlay = false 
}) => {
  if (!isLoading) return null;

  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]}`}
      ></div>
      {text && (
        <p className={`mt-2 text-gray-600 ${textSizeClasses[size]}`}>
          {text}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <LoadingSpinner />
    </div>
  );
};

export default Loading;
