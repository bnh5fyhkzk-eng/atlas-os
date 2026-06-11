// /manager · cross-arm command center · drag blocks across arms
// Per FOUNDATION-REBUILD Phase 5
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import {
  listProjects,
  createProject,
  listArms,
  type Project,
  type Arm,
} from "@/lib/atlas-supabase";
import { ArmSidebar } from "@/components/atlas/ArmSidebar";

export default function AtlasManagerPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [arms, setArms] = useState<Arm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const reload = async () => {
    try {
      const [p, a] = await Promise.all([listProjects(), listArms()]);
      setProjects(p);
      setArms(a);
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void reload(); }, []);

  const handleAdd = async (form: FormData) => {
    const name = (form.get("name") as string) || "Untitled project";
    const emoji = (form.get("emoji") as string) || "📂";
    const priority = (form.get("priority") as Project["priority"]) || "P2";
    const arm_slugs = form.getAll("arms") as string[];
    try {
      await createProject({ name, emoji, priority, arm_slugs });
      setAdding(false);
      void reload();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <div className="flex min-h-screen bg-white text-stone-900">
      <ArmSidebar />
      <main className="flex-1 overflow-y-auto">
        <header className="border-b border-black/10 px-8 py-6 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-10">
          <div>
            <h1 className="text-3xl font-semibold">🎯 Manager</h1>
            <div className="text-xs opacity-50 mt-1">cross-arm projects · copy-paste blocks</div>
          </div>
          <button
            className="px-3 py-1.5 rounded bg-black text-white text-sm flex items-center gap-1"
            onClick={() => setAdding(true)}
          >
            <Plus size={14} /> Project
          </button>
        </header>

        <div className="px-8 py-8 max-w-5xl mx-auto">
          {error && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-sm rounded">
              <div className="font-medium">Heads up</div>
              <div className="opacity-70 mt-1">{error}</div>
            </div>
          )}
          {loading && <div className="opacity-50">Loading…</div>}
          {!loading && projects.length === 0 && (
            <div className="border border-dashed border-black/20 rounded-lg p-8 text-center">
              <div className="text-lg font-medium">No projects yet</div>
              <div className="text-sm opacity-60 mt-2">
                Click + Project to start your first cross-arm work bundle
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {projects.map((p) => (
              <div
                key={p.id}
                className="p-4 border border-black/10 rounded-lg hover:border-black/20 cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{p.emoji}</span>
                  <div className="font-medium">{p.name}</div>
                  <span className={
                    "text-[10px] px-1.5 py-0.5 rounded font-medium ml-auto " +
                    (p.priority === "P0" ? "bg-red-100 text-red-700"
                      : p.priority === "P1" ? "bg-amber-100 text-amber-700"
                      : "bg-stone-100 text-stone-600")
                  }>
                    {p.priority}
                  </span>
                </div>
                <div className="text-sm opacity-60 mb-3 line-clamp-2">{p.description || "No description"}</div>
                <div className="flex gap-1 flex-wrap">
                  {p.arm_slugs.map((s) => {
                    const arm = arms.find((a) => a.slug === s);
                    return (
                      <button
                        key={s}
                        className="text-xs px-1.5 py-0.5 rounded bg-black/5 hover:bg-black/10"
                        onClick={(e) => { e.stopPropagation(); navigate(`/arm/${s}`); }}
                      >
                        {arm?.emoji} {arm?.name ?? s}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {adding && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setAdding(false)}>
            <form
              className="bg-white rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
              onSubmit={(e) => { e.preventDefault(); void handleAdd(new FormData(e.currentTarget)); }}
            >
              <h2 className="text-lg font-semibold mb-4">New project</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs opacity-60">Emoji</label>
                  <input name="emoji" defaultValue="📂" className="w-full mt-1 px-2 py-1 border border-black/10 rounded" maxLength={4} />
                </div>
                <div>
                  <label className="text-xs opacity-60">Name</label>
                  <input name="name" required placeholder="Pascal Q3 push" className="w-full mt-1 px-2 py-1 border border-black/10 rounded" />
                </div>
                <div>
                  <label className="text-xs opacity-60">Priority</label>
                  <select name="priority" className="w-full mt-1 px-2 py-1 border border-black/10 rounded">
                    <option value="P2">P2 · standard</option>
                    <option value="P1">P1 · high</option>
                    <option value="P0">P0 · drop everything</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs opacity-60 block mb-1">Linked arms</label>
                  <div className="flex flex-wrap gap-2">
                    {arms.filter(a => a.slug !== "manager").map((a) => (
                      <label key={a.slug} className="flex items-center gap-1 text-sm px-2 py-1 bg-black/5 rounded cursor-pointer">
                        <input type="checkbox" name="arms" value={a.slug} />
                        {a.emoji} {a.name}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-5">
                <button type="button" className="px-3 py-1.5 rounded text-sm" onClick={() => setAdding(false)}>Cancel</button>
                <button type="submit" className="px-3 py-1.5 rounded bg-black text-white text-sm">Create</button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
