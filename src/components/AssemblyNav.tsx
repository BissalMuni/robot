import Link from "next/link";
import { assemblySteps } from "@/data/assembly";

export function AssemblyNav() {
  return (
    <nav
      aria-label="조립 단계 네비게이션"
      className="sticky top-12 z-10 -mx-4 mb-8 border-b border-zinc-100 bg-white/90 px-4 py-3 backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-950/90 sm:-mx-6 sm:px-6"
    >
      <ul className="flex flex-wrap gap-2" role="list">
        {assemblySteps.map((step) => (
          <li key={step.id}>
            <Link
              href={`#${step.id}`}
              className="flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-800/60"
            >
              <span aria-hidden="true">{step.icon}</span>
              <span className="font-medium text-zinc-400 dark:text-zinc-500">
                {step.step}.
              </span>
              {step.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
