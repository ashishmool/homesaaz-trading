/** @format */

import ServiceCard from '../components/ServiceCard';
import { services } from '../constants';

const Services = () => {
  return (
    <section id="services" className="section-shell-sm border-t border-black/[0.05] bg-surface-muted dark:border-white/5 dark:bg-black/20">
      <div className="max-container grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.label} {...service} />
        ))}
      </div>
    </section>
  );
};

export default Services;
