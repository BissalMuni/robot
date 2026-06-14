import Link from "next/link";
import { SoftwareTool } from "@/data/software";

interface SoftwareToolCardProps {
  tool: SoftwareTool;
}

export function SoftwareToolCard({ tool }: SoftwareToolCardProps) {
  return (
    <div className="group relative flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-5 hover:border-zinc-600 transition-colors">
      {tool.recommended && (
        <span className="absolute top-3 right-3 rounded-full bg-zinc-700 px-2 py-0.5 text-xs text-zinc-300">
          추천
        </span>
      )}
      <div className="flex items-start gap-3">
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-zinc-100 truncate">{tool.name}</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">{tool.descriptionKo}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {tool.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-zinc-700 px-2 py-0.5 text-xs text-zinc-400"
          >
            {tag}
          </span>
        ))}
        <span className="rounded-full border border-zinc-700 px-2 py-0.5 text-xs text-zinc-500">
          {tool.license}
        </span>
      </div>

      <div className="flex gap-2 mt-auto pt-1">
        <Link
          href={tool.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-zinc-400 hover:text-zinc-200 underline underline-offset-2"
        >
          공식 사이트 →
        </Link>
        {tool.github && (
          <Link
            href={tool.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-400 hover:text-zinc-200 underline underline-offset-2"
          >
            GitHub →
          </Link>
        )}
      </div>
    </div>
  );
}
