import { motion } from "framer-motion";

const sponsors = [
  { name: "Bouwbedrijf De Vries", tier: "Hoofdsponsor" },
  { name: "Café Het Groene Hart", tier: "Sponsor" },
  { name: "Fysiotherapie Van Dijk", tier: "Sponsor" },
  { name: "Tuincentrum Flora", tier: "Clubvriend" },
  { name: "Bakkerij Jansen", tier: "Clubvriend" },
  { name: "Autobedrijf Mulder", tier: "Clubvriend" },
];

export default function Sponsors() {
  return (
    <div className="py-16">
      <div className="container max-w-4xl">
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="font-heading text-4xl font-bold mb-4">
          Sponsors
        </motion.h1>
        <p className="text-muted-foreground mb-12 text-lg">
          Zonder onze sponsors zouden wij niet kunnen doen wat we doen. Hartelijk dank!
        </p>

        <div className="space-y-10">
          {["Hoofdsponsor", "Sponsor", "Clubvriend"].map((tier) => {
            const tierSponsors = sponsors.filter((s) => s.tier === tier);
            if (tierSponsors.length === 0) return null;
            return (
              <div key={tier}>
                <h2 className="font-heading font-semibold text-sm uppercase tracking-wider text-primary mb-4">{tier}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {tierSponsors.map((sponsor, i) => (
                    <motion.div
                      key={sponsor.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={`p-6 rounded-2xl border bg-card text-center ${
                        tier === "Hoofdsponsor" ? "border-primary/30 shadow-lg shadow-primary/5 sm:col-span-2 md:col-span-3" : ""
                      }`}
                    >
                      <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <span className="font-heading font-bold text-primary text-xl">
                          {sponsor.name.charAt(0)}
                        </span>
                      </div>
                      <h3 className="font-heading font-semibold">{sponsor.name}</h3>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 p-8 rounded-2xl bg-muted text-center">
          <h2 className="font-heading font-bold text-2xl mb-3">Sponsor worden?</h2>
          <p className="text-muted-foreground mb-4">
            Neem contact met ons op om de mogelijkheden te bespreken.
          </p>
        </div>
      </div>
    </div>
  );
}
