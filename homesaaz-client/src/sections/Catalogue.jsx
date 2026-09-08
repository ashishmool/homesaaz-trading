import { cataloguesData } from '../constants';
import hsVideo from '../assets/videos/hs-video.mp4';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const Catalogue = () => {
  return (
    <section className="section-shell pt-28">
      <div className="max-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">Resources</p>
          <h1 className="section-heading">
            Downloads & <span className="text-brand">catalogues</span>
          </h1>
          <p className="section-lede">
            Download product catalogues and watch our overview video. Use these as a quick reference for specs and ranges.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-7">
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-3">
            {cataloguesData.map((catalogue) => (
              <a
                key={catalogue.id}
                href={catalogue.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card-surface group flex flex-col p-4 transition hover:border-brand/40"
              >
                <div className="overflow-hidden rounded-brand bg-surface-muted dark:bg-white/5">
                  <iframe
                    src={catalogue.fileUrl}
                    title={catalogue.name}
                    className="pointer-events-none h-44 w-full"
                    tabIndex={-1}
                  />
                </div>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink group-hover:text-brand dark:text-white">
                  <ArrowDownTrayIcon className="h-4 w-4" />
                  {catalogue.name}
                </span>
              </a>
            ))}
          </div>

          <div className="lg:col-span-2">
            <div className="card-surface overflow-hidden">
              <video className="aspect-[9/16] w-full object-cover" controls muted loop playsInline>
                <source src={hsVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="mt-3 text-sm text-ink-muted dark:text-gray-400">
              Company overview — also useful as support documentation alongside the downloadable catalogues.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalogue;
