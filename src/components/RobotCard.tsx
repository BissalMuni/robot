import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Robot } from "@/lib/robots/types";

// 단일 로봇 카드. 목록 그리드에서 사용한다 (서버 컴포넌트).
export default function RobotCard({ robot }: { robot: Robot }) {
  const t = useTranslations();
  const cover = robot.images[0];
  // 출처 중 하나라도 미검증이면 카드에 미검증 배지를 노출한다.
  const unverified = robot.sources.some((s) => !s.verified);

  return (
    <Link
      href={`/robots/${robot.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {cover ? (
          <Image
            src={cover}
            alt={robot.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-3xl text-zinc-400">
            🤖
          </div>
        )}
        {unverified && (
          <span className="absolute right-2 top-2 rounded-full bg-amber-500/90 px-2 py-0.5 text-xs font-medium text-white">
            {t("robot.unverified")}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="text-lg font-semibold">{robot.name}</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {robot.manufacturer} · {robot.country}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            {t(`category.${robot.category}`)}
          </span>
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            {t(`status.${robot.status}`)}
          </span>
        </div>
      </div>
    </Link>
  );
}
