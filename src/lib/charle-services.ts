// Charle / CB Télécom · service catalog · per ~/.claude/state/charle-CB-Telecom-spec-analysis-2026-06-02.md MÉGA IMPORTANT
// data-driven so adding a fournisseur = 1 object · no UI rewrite

export type FieldType = "text" | "tel" | "email" | "select" | "textarea" | "number";

export type Field = {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[]; // for select
};

export type Service = {
  id: string;
  fournisseur: string;
  label: string;
  category: "internet" | "cellulaire" | "telephonie" | "autre";
  // contact fields THIS service requires beyond the base set
  contactExtras: Field[];
  // service-specific config questions
  fields: Field[];
};

export const BASE_CONTACT_FIELDS: Field[] = [
  { id: "entreprise", label: "Entreprise", type: "text", required: true, placeholder: "Nom de l'entreprise" },
  { id: "contact_nom", label: "Contact (nom complet)", type: "text", required: true },
  { id: "email", label: "Courriel", type: "email", required: true },
  { id: "mobile", label: "Mobile", type: "tel", required: true, placeholder: "514-555-0000" },
];

export const SERVICES: Service[] = [
  {
    id: "ebox-internet",
    fournisseur: "Ebox",
    label: "Internet Ebox",
    category: "internet",
    contactExtras: [
      { id: "adresse_installation", label: "Adresse d'installation", type: "textarea", required: true },
      { id: "code_postal", label: "Code postal", type: "text", required: true },
    ],
    fields: [
      { id: "vitesse", label: "Vitesse souhaitée", type: "select", required: true, options: ["100 Mbps", "250 Mbps", "500 Mbps", "1 Gbps", "1.5 Gbps"] },
      { id: "type_installation", label: "Type d'installation", type: "select", required: true, options: ["Nouvelle installation", "Transfert", "Remplacement modem"] },
      { id: "date_souhaitee", label: "Date souhaitée", type: "text", placeholder: "AAAA-MM-JJ" },
      { id: "notes_ebox", label: "Notes Ebox", type: "textarea" },
    ],
  },
  {
    id: "rogers-cellulaire",
    fournisseur: "Rogers",
    label: "Cellulaire Rogers",
    category: "cellulaire",
    contactExtras: [
      { id: "nb_lignes", label: "Nombre de lignes", type: "number", required: true },
    ],
    fields: [
      { id: "type_transaction", label: "Type de transaction", type: "select", required: true, options: ["Nouvelle ligne", "Port-in", "Renouvellement", "Mise à niveau"] },
      { id: "forfait", label: "Forfait souhaité", type: "select", required: true, options: ["Essentiel 50GB", "Mobile 100GB", "Infini illimité", "Affaires Pro"] },
      { id: "appareil", label: "Appareil", type: "select", options: ["Apporter votre appareil (BYOD)", "Acheter avec contrat", "Acheter au comptant"] },
      { id: "imei_actuel", label: "IMEI actuel (si BYOD)", type: "text", placeholder: "15 chiffres" },
      { id: "operateur_actuel", label: "Opérateur actuel (si port-in)", type: "select", options: ["Bell", "Telus", "Videotron", "Freedom", "Fido", "Koodo", "Public Mobile", "Autre"] },
      { id: "notes_rogers", label: "Notes Rogers", type: "textarea" },
    ],
  },
  {
    id: "bell-telephonie",
    fournisseur: "Bell",
    label: "Téléphonie Bell",
    category: "telephonie",
    contactExtras: [
      { id: "adresse_facturation", label: "Adresse de facturation", type: "textarea", required: true },
    ],
    fields: [
      { id: "type_ligne", label: "Type de ligne", type: "select", required: true, options: ["Ligne résidentielle", "Ligne d'affaires", "PRI", "SIP Trunk"] },
      { id: "nb_lignes_bell", label: "Nombre de lignes", type: "number", required: true },
      { id: "options", label: "Options", type: "textarea", placeholder: "Boîte vocale · transfert · conférence · etc." },
    ],
  },
];

export function findService(id: string): Service | undefined {
  return SERVICES.find(s => s.id === id);
}

// returns the union of base + per-service contact-extras (deduped by id)
export function contactFieldsFor(selectedIds: string[]): Field[] {
  const map = new Map<string, Field>();
  BASE_CONTACT_FIELDS.forEach(f => map.set(f.id, f));
  selectedIds.forEach(id => {
    const svc = findService(id);
    svc?.contactExtras.forEach(f => map.set(f.id, f));
  });
  return [...map.values()];
}
