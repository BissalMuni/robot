import type { FaqItem as FaqItemType } from "@/data/faq";

// FAQ 한 항목을 접을 수 있는 카드로 렌더한다(zinc 테마).
// 네이티브 <details>/<summary> 라 JS 없이 동작하고 키보드 접근성이 보장된다.
export function FaqItem({ item }: { item: FaqItemType }) {
  return (
    <details
      id={item.id}
      className="group scroll-mt-20 rounded-lg border border-zinc-300 bg-white transition-shadow open:shadow-sm hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">
        <span>{item.question}</span>
        <span
          aria-hidden
          className="shrink-0 text-zinc-400 transition-transform group-open:rotate-45 dark:text-zinc-500"
        >
          +
        </span>
      </summary>
      <p className="border-t border-zinc-200 px-4 py-3 text-sm leading-relaxed text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
        {item.answer}
      </p>
    </details>
  );
}
