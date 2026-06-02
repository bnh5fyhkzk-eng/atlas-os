import { CharleOrderForm } from "@/components/CharleOrderForm";

export const metadata = {
  title: "CB Télécom · Formulaire de commande",
  description: "Sélection multi-services adaptative · Ebox · Rogers · Bell · plus",
};

export default function CharleOrderFormPage() {
  return (
    <main className="min-h-screen bg-black text-neutral-300">
      <div className="max-w-3xl mx-auto p-6 md:p-10">
        <header className="mb-10 border-b border-neutral-800 pb-6">
          <div className="text-[11px] tracking-[0.25em] text-neutral-500 uppercase">CB Télécom</div>
          <h1 className="text-3xl font-light text-neutral-100 mt-2">Formulaire de commande</h1>
          <p className="text-sm text-neutral-500 mt-2">
            Sélectionne les services · le formulaire s'adapte · les données vont au tableau filtrable.
          </p>
        </header>
        <CharleOrderForm />
        <footer className="mt-16 pt-6 border-t border-neutral-800 text-xs text-neutral-600">
          prototype atlas-os · démo Charle · spec v1.0 · MÉGA IMPORTANT
        </footer>
      </div>
    </main>
  );
}
