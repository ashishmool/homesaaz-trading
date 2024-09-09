import React, { useState } from 'react';
import PopUpScreen from '../components/PopUpScreen.jsx';
import { popUpScreenData } from '../constants'; // Import the pop-up data

const PopUp = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(true);

    const handleClose = () => {
        setIsPopupOpen(false);
    };

    return (
        <div>
            {/* Conditionally render the popup */}
            {isPopupOpen && (
                <PopUpScreen
                    imageURL={popUpScreenData.imageURL}
                    redirectURL={popUpScreenData.redirectURL}
                    onClose={handleClose}
                />
            )}
        </div>
    );
};

export default PopUp;
