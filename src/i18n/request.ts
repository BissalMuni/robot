import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "./locale";

// 요청마다 로케일과 메시지를 결정한다 (i18n 라우팅 없는 구성).
export default getRequestConfig(async () => {
  const locale = await getUserLocale();
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
