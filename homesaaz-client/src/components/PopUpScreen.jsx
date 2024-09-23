// /** @format */
//
// import React, { useState } from 'react';
// import { popUpScreenData } from '../constants'; // Import the data from constants file
//
// const PopUpScreen = ({ onClose }) => {
//     const [currentAdIndex, setCurrentAdIndex] = useState(0); // Track which ad is displayed
//
//     // Navigate to the next ad
//     const handleNext = () => {
//         setCurrentAdIndex((prevIndex) => (prevIndex + 1) % popUpScreenData.length);
//     };
//
//     // Navigate to the previous ad
//     const handleBack = () => {
//         setCurrentAdIndex((prevIndex) => (prevIndex - 1 + popUpScreenData.length) % popUpScreenData.length);
//     };
//
//     const handleImageClick = () => {
//         const currentAd = popUpScreenData[currentAdIndex];
//         if (currentAd.redirectURL) {
//             // Open the desired page in a new tab
//             window.open(currentAd.redirectURL, '_blank');
//         }
//     };
//
//     // Handle closing the popup when clicking outside
//     const handleOverlayClick = (e) => {
//         // If the user clicked on the overlay (outside the modal content), close the popup
//         if (e.target === e.currentTarget) {
//             onClose();
//         }
//     };
//
//     return (
//         <div
//             className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
//             onClick={handleOverlayClick} // Handle clicking on the overlay to close
//         >
//             <div
//                 className="relative bg-white rounded-lg shadow-lg p-6 max-w-lg w-full"
//                 onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
//             >
//                 {/* Close button */}
//                 <button
//                     onClick={onClose}
//                     className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
//                 >
//                     &times;
//                 </button>
//
//                 {/* Image */}
//                 {popUpScreenData[currentAdIndex].imageURL ? (
//                     <img
//                         src={popUpScreenData[currentAdIndex].imageURL}
//                         alt="Popup"
//                         className="w-full h-auto object-contain cursor-pointer"
//                         onClick={handleImageClick}
//                     />
//                 ) : (
//                     <p className="text-center text-gray-500">Image not available</p>
//                 )}
//
//                 {/* Navigation buttons */}
//                 <div className="flex justify-between mt-4">
//                     <button
//                         onClick={handleBack}
//                         className="text-gray-500 hover:text-gray-800 text-2xl"
//                     >
//                         &larr; {/* Back icon */}
//                     </button>
//                     <button
//                         onClick={handleNext}
//                         className="text-gray-500 hover:text-gray-800 text-2xl"
//                     >
//                         &rarr; {/* Next icon */}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default PopUpScreen;


/** @format */

import React, { useState } from 'react';
import { popUpScreenData } from '../constants'; // Import the data from constants file

const PopUpScreen = ({ videoURLs, onClose }) => {
    const [currentAdIndex, setCurrentAdIndex] = useState(0); // Track which video is displayed

    // Navigate to the next video
    const handleNext = () => {
        setCurrentAdIndex((prevIndex) => (prevIndex + 1) % videoURLs.length);
    };

    // Navigate to the previous video
    const handleBack = () => {
        setCurrentAdIndex((prevIndex) => (prevIndex - 1 + videoURLs.length) % videoURLs.length);
    };

    // Handle closing the popup when clicking outside
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleOverlayClick}
        >
            <div
                className="relative bg-white rounded-lg shadow-lg p-6 max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
                >
                    &times;
                </button>

                {/* Video Player */}
                {videoURLs[currentAdIndex] ? (
                    <video
                        src={videoURLs[currentAdIndex]}
                        controls
                        autoPlay
                        muted
                        loop
                        className="w-full h-auto object-contain"
                    >
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <p className="text-center text-gray-500">Video not available</p>
                )}

                {/* Navigation buttons */}
                <div className="flex justify-between mt-4">
                    <button
                        onClick={handleBack}
                        className="text-gray-500 hover:text-gray-800 text-2xl"
                    >
                        &larr; {/* Back icon */}
                    </button>
                    <button
                        onClick={handleNext}
                        className="text-gray-500 hover:text-gray-800 text-2xl"
                    >
                        &rarr; {/* Next icon */}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopUpScreen;
