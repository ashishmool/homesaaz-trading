/** @format */

import ClientCard from '../components/ClientCard.jsx';
import { clients } from '../constants'; // Import client details from a constants file

const Clients = () => {
    return (
        <section className="padding">
            <div id="clients" className="max-container max-sm:mt-12">
                <div className="flex flex-col justify-start gap-5">
                    <h2 className="text-4xl font-palanquin font-bold text-center">
                        Our
                        <span className="text-coral-red"> Clients</span>
                    </h2>
                    <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray dark:text-gray-400 text-center mx-auto">
                        We are proud to collaborate with some of the top names in the industry. Here’s a selection of our esteemed
                        clients.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-6">
                    {clients.map((client) => (
                        <ClientCard key={client.clientId} {...client} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Clients;
