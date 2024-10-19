import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import Link from 'next/link';
import { ArrowRight, Bug, Coffee, GitBranch } from 'lucide-react';

const InProgressPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-3xl w-full">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 pr-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Coding in <span className="text-indigo-600">Progress</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              The developer is working the magic. He's turning coffee into code to bring you something amazing!
            </p>
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Back to Home
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <Player
              autoplay
              loop
              src="https://assets9.lottiefiles.com/packages/lf20_w51pcehl.json"
              style={{ height: '300px', width: '100%' }}
            />
          </div>
        </div>
          
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 rounded-full p-2">
                <GitBranch className="text-blue-600 h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Git commits</p>
                <div className="flex items-center">
                  <Player
                    autoplay
                    loop
                    src="https://assets3.lottiefiles.com/packages/lf20_3vbOcw.json"
                    style={{ height: '24px', width: '24px' }}
                  />
                  <span className="text-sm text-gray-500 ml-2">Ongoing</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-100 rounded-full p-2">
                <Coffee className="text-yellow-600 h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Coffee consumed</p>
                <div className="flex items-center">
                  <Player
                    autoplay
                    loop
                    src="https://assets9.lottiefiles.com/private_files/lf30_fup2uejx.json"
                    style={{ height: '24px', width: '24px' }}
                  />
                  <span className="text-sm text-gray-500 ml-2">Lots</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 rounded-full p-2">
                <Bug className="text-green-600 h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Bug squashing</p>
                <div className="flex items-center">
                  <Player
                    autoplay
                    loop
                    src="https://assets5.lottiefiles.com/packages/lf20_wbhpdawm.json"
                    style={{ height: '24px', width: '24px' }}
                  />
                  <span className="text-sm text-gray-500 ml-2">In progress</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InProgressPage;