import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useEditableContent } from "@/hooks/useEditableContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Save, X, CalendarDays } from "lucide-react";
import { useState } from "react";

interface AgendaItem {
  id: string;
  date: string;
  event: string;
  location: string;
}

const defaultAgenda: AgendaItem[] = [
  { id: "1", date: "2026-03-15", event: "Seizoensopening", location: "Sportveld De Groene Oase" },
  { id: "2", date: "2026-04-20", event: "Regionaal Toernooi", location: "Sportpark Zandvoort" },
  { id: "3", date: "2026-06-14", event: "Zomercompetitie Ronde 1", location: "De Groene Oase" },
  { id: "4", date: "2026-09-06", event: "NK Touwtrekken", location: "Nationaal Sportcentrum" },
];

export default function Agenda() {
  const { isLoggedIn } = useAuth();
  const [items, setItems] = useEditableContent<AgendaItem[]>("agenda_content", defaultAgenda);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<Omit<AgendaItem, "id">>({ date: "", event: "", location: "" });

  // Only show future or today's events, sorted by date
  const upcomingItems = items
    .filter((item) => new Date(item.date) >= new Date(new Date().toDateString()))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const addItem = () => {
    if (!draft.date || !draft.event) return;
    setItems([...items, { ...draft, id: Date.now().toString() }]);
    setDraft({ date: "", event: "", location: "" });
    setAdding(false);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="py-16">
      <div className="container max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="font-heading text-4xl font-bold">
            Agenda
          </motion.h1>
          {isLoggedIn && (
            <Button onClick={() => setAdding(true)} size="sm">
              <Plus className="h-4 w-4 mr-1" /> Evenement toevoegen
            </Button>
          )}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          {adding && (
            <div className="mb-6 p-6 rounded-2xl border bg-card space-y-3">
              <h3 className="font-heading font-semibold">Nieuw evenement</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
                <Input placeholder="Evenement" value={draft.event} onChange={(e) => setDraft({ ...draft, event: e.target.value })} />
                <Input placeholder="Locatie" value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })} />
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={addItem}><Save className="h-4 w-4 mr-1" /> Toevoegen</Button>
                <Button size="sm" variant="ghost" onClick={() => setAdding(false)}><X className="h-4 w-4" /></Button>
              </div>
            </div>
          )}

          {upcomingItems.length > 0 ? (
            <div className="rounded-2xl border overflow-hidden bg-card">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary/5">
                    <TableHead className="font-heading font-semibold">Datum</TableHead>
                    <TableHead className="font-heading font-semibold">Evenement</TableHead>
                    <TableHead className="font-heading font-semibold">Locatie</TableHead>
                    {isLoggedIn && <TableHead className="w-12" />}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingItems.map((item, i) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-primary" />
                          {new Date(item.date).toLocaleDateString("nl-NL", { weekday: "short", day: "numeric", month: "long", year: "numeric" })}
                        </div>
                      </TableCell>
                      <TableCell>{item.event}</TableCell>
                      <TableCell className="text-muted-foreground">{item.location}</TableCell>
                      {isLoggedIn && (
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      )}
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>Geen aankomende evenementen.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
