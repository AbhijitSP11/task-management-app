import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import Link from 'next/link';

const InProgressPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Work in Progress</h1>
        <p className="text-xl text-gray-600 mb-8">We're working hard to bring you this page. Please check back soon!</p>
        <Player
          autoplay
          loop
          src="https://assets3.lottiefiles.com/packages/lf20_yyytgjwe.json"
          style={{ height: '300px', width: '300px' }}
        />
        <Link href="/" className="mt-8 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default InProgressPage;