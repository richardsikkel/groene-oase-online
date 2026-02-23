import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useEditableContent } from "@/hooks/useEditableContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Pencil, Save, X } from "lucide-react";
import { useState } from "react";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  body: string;
}

const defaultNews: NewsItem[] = [
  {
    id: "1",
    title: "Seizoen 2026 van start!",
    date: "2026-02-20",
    body: "Het nieuwe seizoen is begonnen. We trainen weer elke dinsdag en donderdag. Kom gezellig langs!",
  },
  {
    id: "2",
    title: "Nieuwjaarstoernooi gewonnen",
    date: "2026-01-12",
    body: "Ons team heeft het regionale nieuwjaarstoernooi gewonnen. Wat een prestatie!",
  },
];

export default function Actueel() {
  const { isLoggedIn } = useAuth();
  const [news, setNews] = useEditableContent<NewsItem[]>("actueel_content", defaultNews);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<NewsItem | null>(null);

  const startEdit = (item: NewsItem) => {
    setEditing(item.id);
    setDraft({ ...item });
  };

  const saveEdit = () => {
    if (!draft) return;
    setNews(news.map((n) => (n.id === draft.id ? draft : n)));
    setEditing(null);
    setDraft(null);
  };

  const addNew = () => {
    const newItem: NewsItem = {
      id: Date.now().toString(),
      title: "Nieuw bericht",
      date: new Date().toISOString().split("T")[0],
      body: "Schrijf hier je bericht...",
    };
    setNews([newItem, ...news]);
    startEdit(newItem);
  };

  const remove = (id: string) => {
    setNews(news.filter((n) => n.id !== id));
    if (editing === id) { setEditing(null); setDraft(null); }
  };

  return (
    <div className="py-16">
      <div className="container max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="font-heading text-4xl font-bold">
            Actueel
          </motion.h1>
          {isLoggedIn && (
            <Button onClick={addNew} size="sm">
              <Plus className="h-4 w-4 mr-1" /> Nieuw bericht
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {news.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border bg-card"
            >
              {editing === item.id && draft ? (
                <div className="space-y-3">
                  <Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="Titel" />
                  <Input type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
                  <Textarea value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} rows={4} />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={saveEdit}><Save className="h-4 w-4 mr-1" /> Opslaan</Button>
                    <Button size="sm" variant="ghost" onClick={() => { setEditing(null); setDraft(null); }}><X className="h-4 w-4" /></Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-medium text-primary">{new Date(item.date).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}</span>
                      <h2 className="font-heading font-bold text-xl mt-1">{item.title}</h2>
                    </div>
                    {isLoggedIn && (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => startEdit(item)}><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => remove(item.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    )}
                  </div>
                  <p className="text-muted-foreground mt-3 leading-relaxed">{item.body}</p>
                </>
              )}
            </motion.article>
          ))}
          {news.length === 0 && (
            <p className="text-center text-muted-foreground py-12">Nog geen berichten.</p>
          )}
        </div>
      </div>
    </div>
  );
}
