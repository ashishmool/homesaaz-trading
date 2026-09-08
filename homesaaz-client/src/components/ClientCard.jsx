/** @format */

const ClientCard = ({ logoURL, clientName, website }) => {
  return (
    <div className="card-surface flex h-28 items-center justify-center p-5">
      <img
        src={logoURL}
        alt={clientName || website || 'Client logo'}
        className="max-h-14 w-full object-contain opacity-80 grayscale transition duration-brand hover:opacity-100 hover:grayscale-0 dark:brightness-110"
      />
    </div>
  );
};

export default ClientCard;
