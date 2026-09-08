/** @format */

const ServiceCard = ({ imgURL, label, subtext }) => {
  return (
    <div className="card-surface flex gap-4 p-6">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-brand bg-brand">
        <img src={imgURL} alt="" width={22} height={22} />
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold text-ink dark:text-white">{label}</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-muted dark:text-gray-400">{subtext}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
