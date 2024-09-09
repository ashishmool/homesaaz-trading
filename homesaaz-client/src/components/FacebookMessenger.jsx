// import { useState, useEffect } from 'react';
// import messengerIcon from '../assets/icons/messenger.svg';
//
// const FacebookMessenger = () => {
//     const [isChatPluginLoaded, setIsChatPluginLoaded] = useState(false);
//     const [loginStatus, setLoginStatus] = useState(null);
//
//     useEffect(() => {
//         // Load the Facebook SDK for JavaScript
//         window.fbAsyncInit = function () {
//             window.FB.init({
//                 appId: '1569215640332695', // Your app ID
//                 cookie: true,
//                 xfbml: true,
//                 version: 'v17.0', // Use the latest API version
//             });
//
//             // Check the login status
//             window.FB.getLoginStatus(function (response) {
//                 statusChangeCallback(response);
//             });
//
//             setIsChatPluginLoaded(true);
//         };
//
//         const statusChangeCallback = (response) => {
//             console.log('Facebook Login Status:', response);
//             if (response.status === 'connected') {
//                 // User is logged in and has authenticated your app
//                 setLoginStatus('connected');
//             } else {
//                 // User is not logged into Facebook or hasn't authenticated your app
//                 setLoginStatus('not_connected');
//             }
//         };
//
//         // Load the Messenger SDK script
//         const loadFacebookSDK = () => {
//             const script = document.createElement('script');
//             script.src = 'https://connect.facebook.net/en_US/sdk.js';
//             script.async = true;
//             script.defer = true;
//             document.body.appendChild(script);
//         };
//
//         loadFacebookSDK();
//
//         return () => {
//             const fbScript = document.querySelector('script[src="https://connect.facebook.net/en_US/sdk.js"]');
//             if (fbScript) {
//                 document.body.removeChild(fbScript);
//             }
//         };
//     }, []);
//
//     // Function to manually check login state
//     const checkLoginState = () => {
//         window.FB.getLoginStatus(function (response) {
//             statusChangeCallback(response);
//         });
//     };
//
//     return (
//         <>
//             <div id="fb-root"></div>
//
//             {/* Facebook Messenger Chat Plugin */}
//             {isChatPluginLoaded && (
//                 <>
//                     <div
//                         className="fixed left-4 bottom-4 w-12 h-12 cursor-pointer"
//                         onClick={() => window.FB.CustomerChat.showDialog()}
//                     >
//                         <img src={messengerIcon} alt="Facebook Messenger" />
//                     </div>
//
//                     <div
//                         className="fb-customerchat"
//                         attribution="setup_tool"
//                         page_id="https://www.facebook.com/homesaaz.trading"  // Replace with your Facebook Page ID
//                         app_id="1569215640332695"
//                         theme_color="#0084FF"
//                         logged_in_greeting="Hi! How can we help you?"
//                         logged_out_greeting="Hi! Please log in to chat with us."
//                     ></div>
//
//                     {/* Facebook Login Button */}
//                     <div className="fixed top-4 right-4">
//                         {loginStatus === 'not_connected' ? (
//                             <div>
//                                 <fb:login-button
//                                     scope="public_profile,email"
//                                     onlogin="checkLoginState();"
//                                     data-size="large"
//                                     data-button-type="continue_with"
//                                     data-layout="default"
//                                     data-auto-logout-link="false"
//                                     data-use-continue-as="true"
//                                 ></fb:login-button>
//                             </div>
//                         ) : (
//                             <p>User is logged in</p>
//                         )}
//                     </div>
//                 </>
//             )}
//         </>
//     );
// };
//
// export default FacebookMessenger;
