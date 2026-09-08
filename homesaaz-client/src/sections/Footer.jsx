import { Link } from 'react-router-dom';
import { copyrightSign } from '../assets/icons';
import { footerLogo } from '../assets/images';
import { footerLinks, socialMedia } from '../constants';

const FooterLink = ({ link, name }) => {
  const isExternal = link.startsWith('mailto:') || link.startsWith('tel:') || link.startsWith('http');
  const className = 'text-sm text-white/70 transition hover:text-white';

  if (isExternal) {
    return (
      <a href={link} className={className}>
        {name}
      </a>
    );
  }

  return (
    <Link to={link} className={className}>
      {name}
    </Link>
  );
};

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <div className="max-container section-shell">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Link to="/">
              <img src={footerLogo} alt="Homesaaz" width={180} height={72} className="h-12 w-auto" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              Homesaaz supplies premium hospitality and interior products across Nepal — quality materials,
              reliable delivery, and dedicated after-sales support.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialMedia.map((icon) => (
                <a
                  key={icon.alt}
                  href={icon?.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-brand border border-white/15 bg-white transition duration-brand hover:border-brand hover:bg-brand"
                  aria-label={icon.alt}
                >
                  <img src={icon.src} alt="" width={18} height={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                  {section.title}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <FooterLink link={link.link} name={link.name} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <img src={copyrightSign} alt="" width={16} height={16} className="opacity-70" />
            <p>© {new Date().getFullYear()} Homesaaz. All rights reserved.</p>
          </div>
          <p>Premium hospitality supply · Nepal</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
