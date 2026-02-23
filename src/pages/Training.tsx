import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useEditableContent } from "@/hooks/useEditableContent";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Pencil, Save, X } from "lucide-react";
import { useState } from "react";

interface TrainingData {
  title: string;
  intro: string;
  schedule: string;
  location: string;
  extra: string;
}

const defaultData: TrainingData = {
  title: "Training",
  intro: "Bij De Groene Oase trainen we wekelijks om onze kracht, techniek en teamwork te verbeteren. Iedereen is welkom, van beginner tot ervaren trekker!",
  schedule: "Elke dinsdag en donderdag van 19:30 tot 21:00",
  location: "Sportveld De Groene Oase, Dorpsstraat 12",
  extra: "Neem sportkleding en stevig schoeisel mee. We zorgen voor het touw en de gezelligheid!",
};

export default function Training() {
  const { isLoggedIn } = useAuth();
  const [data, setData] = useEditableContent("training_content", defaultData);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(data);

  const save = () => {
    setData(draft);
    setEditing(false);
  };

  const cancel = () => {
    setDraft(data);
    setEditing(false);
  };

  return (
    <div className="py-16">
      <div className="container max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-heading text-4xl font-bold"
          >
            {editing ? (
              <Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} className="text-4xl font-bold h-auto" />
            ) : data.title}
          </motion.h1>
          {isLoggedIn && !editing && (
            <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
              <Pencil className="h-4 w-4 mr-1" /> Bewerken
            </Button>
          )}
          {editing && (
            <div className="flex gap-2">
              <Button size="sm" onClick={save}><Save className="h-4 w-4 mr-1" /> Opslaan</Button>
              <Button size="sm" variant="ghost" onClick={cancel}><X className="h-4 w-4" /></Button>
            </div>
          )}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="space-y-8">
          <div className="p-6 rounded-2xl border bg-card">
            <h2 className="font-heading font-semibold text-lg mb-3 text-primary">Over de training</h2>
            {editing ? (
              <Textarea value={draft.intro} onChange={(e) => setDraft({ ...draft, intro: e.target.value })} rows={4} />
            ) : (
              <p className="text-muted-foreground leading-relaxed">{data.intro}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border bg-card">
              <h2 className="font-heading font-semibold text-lg mb-3 text-primary">Tijden</h2>
              {editing ? (
                <Textarea value={draft.schedule} onChange={(e) => setDraft({ ...draft, schedule: e.target.value })} rows={2} />
              ) : (
                <p className="text-muted-foreground">{data.schedule}</p>
              )}
            </div>
            <div className="p-6 rounded-2xl border bg-card">
              <h2 className="font-heading font-semibold text-lg mb-3 text-primary">Locatie</h2>
              {editing ? (
                <Textarea value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })} rows={2} />
              ) : (
                <p className="text-muted-foreground">{data.location}</p>
              )}
            </div>
          </div>

          <div className="p-6 rounded-2xl border bg-card">
            <h2 className="font-heading font-semibold text-lg mb-3 text-primary">Wat meenemen?</h2>
            {editing ? (
              <Textarea value={draft.extra} onChange={(e) => setDraft({ ...draft, extra: e.target.value })} rows={3} />
            ) : (
              <p className="text-muted-foreground leading-relaxed">{data.extra}</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
