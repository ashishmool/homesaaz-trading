/** @format */

import { useNavigate } from 'react-router-dom';

const ClientCard = ({ clientId, logoURL, clientName }) => {
    const navigate = useNavigate();

    const handleClick = (id) => {
        // Navigate to client details or related products if needed
        navigate(`/client/${id}`);
    };

    return (
        <div
            id={clientId}
            className="relative flex flex-col w-full max-sm:w-full hover:scale-105 duration-300 ease-in-out rounded-lg p-4 shadow-lg dark:bg-slate-800"
            onClick={() => handleClick(clientId)}
        >
            <img
                src={logoURL}
                alt={`${clientName}-logo`}
                width={100}
                height={100}
                className="object-contain w-full h-24 rounded-lg text-center cursor-pointer"
            />
        </div>
    );
};

export default ClientCard;
