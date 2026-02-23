import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Bericht verzonden! We nemen zo snel mogelijk contact op.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="py-16">
      <div className="container max-w-4xl">
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="font-heading text-4xl font-bold mb-10">
          Contact
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <h2 className="font-heading font-semibold text-xl mb-6">Stuur ons een bericht</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Naam"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <Input
                type="email"
                placeholder="E-mailadres"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <Textarea
                placeholder="Je bericht..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                required
              />
              <Button type="submit" className="w-full font-semibold">Verstuur bericht</Button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-6">
            <h2 className="font-heading font-semibold text-xl mb-6">Gegevens</h2>
            {[
              { icon: MapPin, label: "Adres", value: "Dorpsstraat 12, 1234 AB Dorp" },
              { icon: Mail, label: "E-mail", value: "info@degroeneoase.nl" },
              { icon: Phone, label: "Telefoon", value: "06 - 1234 5678" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-4 rounded-xl border bg-card">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{item.label}</p>
                  <p className="text-muted-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
