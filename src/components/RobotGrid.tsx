import { useTranslations } from "next-intl";
import type { Robot } from "@/lib/robots/types";
import RobotCard from "./RobotCard";

// 로봇 카드 그리드. 빈 결과면 안내 메시지를 보여준다 (서버 컴포넌트).
export default function RobotGrid({ robots }: { robots: Robot[] }) {
  const t = useTranslations();

  if (robots.length === 0) {
    return (
      <p className="py-16 text-center text-zinc-500 dark:text-zinc-400">
        {t("search.empty")}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {robots.map((robot) => (
        <RobotCard key={robot.id} robot={robot} />
      ))}
    </div>
  );
}
