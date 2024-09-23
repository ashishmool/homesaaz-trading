import { cataloguesData } from '../constants'; // Import the catalogues data
import hsVideo from '../assets/videos/hs-video.mp4'; // Import the MP4 video

const Catalogue = () => {
    return (
        <section className="padding mt-20">
            <h2 className="text-4xl font-palanquin font-bold text-center">
                <span className="text-coral-red">Downloads</span>
            </h2>
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-7 gap-4 max-container max-sm:mt-12">
                {/* Left 60% grid for catalogues */}
                <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cataloguesData.map((catalogue) => (
                        <div key={catalogue.id} className="catalogue-item p-4 border rounded-lg shadow">
                            <iframe
                                src={catalogue.fileUrl}
                                title={catalogue.name}
                                className="w-full h-48" // Smaller thumbnail
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

                {/* Right 40% column for the video */}
                <div className="lg:col-span-2">
                    <video
                        className="w-full"
                        controls
                        autoPlay
                        muted
                        loop
                    >
                        <source src={hsVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </section>
    );
};

export default Catalogue;
