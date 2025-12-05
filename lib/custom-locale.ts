import { enUS } from "date-fns/locale";
import type { Locale } from "date-fns";

const shortLocale: Locale = {
  ...enUS,
  formatDistance: (token: string, count: number, options?: { addSuffix?: boolean; comparison?: number }) => {
    const shortFormat: Record<string, string> = {
      lessThanXSeconds: "just now",
    //   lessThanXSeconds: `${count}s`,
      xSeconds: `${count}s`,
      halfAMinute: "30s",
      lessThanXMinutes: `${count}min`,
      xMinutes: `${count}min`,
      aboutXHours: `${count}h`,
      xHours: `${count}h`,
      xDays: `${count}d`,
      aboutXWeeks: `${count}w`,
      xWeeks: `${count}w`,
      aboutXMonths: `${count}mo`,
      xMonths: `${count}mo`,
      aboutXYears: `${count}y`,
      xYears: `${count}y`,
      overXYears: `${count}y`,
      almostXYears: `${count}y`,
    };

    return shortFormat[token] || "";
  },
};

export default shortLocale;
