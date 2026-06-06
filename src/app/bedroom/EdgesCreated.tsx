// /bedroom/EdgesCreated.tsx
// Displays edges created overnight via Hebbian strengthening + co-recall.
// Each edge shows src-canon, dst-canon, edge-type, and strength.

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // shadcn-ish
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Edge {
  id: string;
  srcCanon: string;
  dstCanon: string;
  edgeType: string;
  strength: number; // 0..1
  overnight: boolean;
  lastHeard: string; // ISO date
}

interface EdgesCreatedProps {
  edges: Edge[];
  title?: string;
}

// Mock fetch – replace with real API
async function fetchOvernightEdges(): Promise<Edge[]> {
  return [
    {
      id: "e1",
      srcCanon: "/people/atlas",
      dstCanon: "/actions/planning",
      edgeType: "co_recall",
      strength: 0.84,
      overnight: true,
      lastHeard: new Date().toISOString(),
    },
    {
      id: "e2",
      srcCanon: "/code/edgestable",
      dstCanon: "/code/edgedisplay",
      edgeType: "hebbian_strengthen",
      strength: 0.67,
      overnight: true,
      lastHeard: new Date().toISOString(),
    },
    {
      id: "e3",
      srcCanon: "/context/bedroom",
      dstCanon: "/context/atlasos",
      edgeType: "semantic_bridge",
      strength: 0.91,
      overnight: true,
      lastHeard: new Date().toISOString(),
    },
  ];
}

const EdgesCreated: React.FC<EdgesCreatedProps> = ({
  edges,
  title = "Overnight Edges (Hebbian + Co-Recall)",
}) => {
  return (
    <div className="space-y-4 bg-stone-50 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-stone-800">{title}</h2>
      <p className="text-sm text-stone-500">
        {edges.length} edges created or strengthened overnight.
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {edges.map((edge) => (
          <Card key={edge.id} className="bg-white border-stone-200 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs bg-stone-50 text-stone-600">
                  {edge.edgeType.replace("_", " ")}
                </Badge>
                {edge.overnight && (
                  <span className="text-xs text-blue-600 font-medium">Overnight</span>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-stone-100 px-2 py-0.5 rounded">
                  {edge.srcCanon}
                </span>
                <span className="text-stone-400">→</span>
                <span className="text-xs font-mono bg-stone-100 px-2 py-0.5 rounded">
                  {edge.dstCanon}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500">Strength:</span>
                <Progress
                  value={edge.strength * 100}
                  className="flex-1 h-2 bg-stone-200"
                  indicatorClassName="bg-stone-700"
                />
                <span className="text-xs text-stone-600 font-medium">
                  {Math.round(edge.strength * 100)}%
                </span>
              </div>
              <p className="text-[10px] text-stone-400">
                Last heard: {new Date(edge.lastHeard).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Example usage with async fetch – can be extracted to parent
export async function EdgesCreatedAsync() {
  const edges = await fetchOvernightEdges();
  return <EdgesCreated edges={edges} />;
}

export default EdgesCreated;