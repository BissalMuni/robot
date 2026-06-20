import { TimelineEvent, TimelineCategory, categoryLabels } from "@/data/timeline";
import { TimelineEventCard } from "@/components/TimelineEvent";

const CATEGORY_ORDER: TimelineCategory[] = [
  "hardware",
  "software",
  "competition",
  "commercial",
  "research",
];

export function TimelineCardView({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="space-y-12">
      {CATEGORY_ORDER.map((category) => {
        const items = events
          .filter((e) => e.category === category)
          .sort((a, b) => a.year - b.year || (a.month ?? 0) - (b.month ?? 0));
        if (items.length === 0) return null;
        const { ko, en, icon } = categoryLabels[category];
        return (
          <section key={category} id={`cat-${category}`} className="scroll-mt-16">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-200">
              <span>{icon}</span>
              <span>{ko}</span>
              <span className="text-sm font-normal text-zinc-500">/ {en}</span>
              <span className="ml-1 text-sm font-normal text-zinc-600">
                {items.length}건
              </span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((event) => (
                <TimelineEventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
