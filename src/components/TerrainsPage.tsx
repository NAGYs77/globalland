import { ListingsSection } from "./ListingsSection"; // Vérifie que le fichier est bien dans le même dossier

export function TerrainsPage({ t, searchQuery, onClear }: any) {
  return (
    <div className="py-10">
      <ListingsSection t={t} searchQuery={searchQuery} onClear={onClear} />
    </div>
  );
}