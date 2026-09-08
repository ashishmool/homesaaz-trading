/** @format */

import ClientCard from '../components/ClientCard.jsx';
import { clients } from '../constants';

const Clients = () => {
  return (
    <section className="section-shell bg-surface-muted dark:bg-black/20">
      <div id="about" className="max-container scroll-mt-24">
        <div id="clients" className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">About</p>
          <h2 className="section-heading">
            Trusted by leading <span className="text-brand">hospitality brands</span>
          </h2>
          <p className="section-lede">
            We partner with hotels and resorts across Nepal — delivering dependable supply and finishes that stand up to daily use.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {clients.map((client) => (
            <ClientCard key={client.clientId} {...client} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
