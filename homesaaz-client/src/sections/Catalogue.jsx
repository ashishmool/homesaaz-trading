import { cataloguesData } from '../constants'; // Import the catalogues data

const Catalogue = () => {
    return (
        <section className="padding mt-20">
            <h2 className="text-4xl font-palanquin font-bold text-center">
                <span className="text-coral-red">Catalogue</span>
            </h2>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-container max-sm:mt-12">
                {cataloguesData.map((catalogue) => (
                    <div key={catalogue.id} className="catalogue-item p-4 border rounded-lg shadow">
                        <iframe
                            src={catalogue.fileUrl}
                            title={catalogue.name}
                            className="w-full h-64"
                            frameBorder="0"
                        ></iframe>
                        <a
                            href={catalogue.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-coral-red font-semibold hover:underline mt-2 block text-center"
                        >
                            {catalogue.name}
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Catalogue;
