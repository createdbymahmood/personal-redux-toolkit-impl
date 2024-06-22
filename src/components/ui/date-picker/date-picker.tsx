import dayjs, { Dayjs } from "dayjs";
import jalaliday from "jalaliday";
import { noteOnce } from "rc-util/lib/warning";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { GenerateConfig } from "rc-picker/lib/generate";
import { default as faLocale } from "./locale";
import generatePicker from "antd/es/date-picker/generatePicker";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(jalaliday);
// @ts-ignore
dayjs.calendar("jalali");

dayjs.locale(faLocale, undefined, false);
dayjs.extend((o, c) => {
  // todo support Wo (ISO week)
  const proto = c.prototype;
  const oldFormat = proto.format;
  proto.format = function f(formatStr: string) {
    const str = (formatStr || "").replace("Wo", "wo");
    return oldFormat.bind(this)(str);
  };
});

type IlocaleMapObject = { [key: string]: string };
const localeMap: IlocaleMapObject = {
  en_US: "en",
  fa_IR: "fa",
};

const parseLocale = (locale: string) => {
  const mapLocale = localeMap[locale];

  return mapLocale || locale.split("_")[0];
};

const parseNoMatchNotice = () => {
  /* istanbul ignore next */
  noteOnce(
    false,
    "Not match any format. Please help to fire a issue about this."
  );
};

const generateJalaliConfig: GenerateConfig<Dayjs> = {
  // get
  getNow: () => dayjs(),
  getFixedDate: string => dayjs(string, "YYYY-MM-DD"),
  getEndDate: date => date.endOf("month"),
  getWeekDay: date => {
    if (!date?.weekday()) {
      date = dayjs();
    }
    const clone = date.locale("en");
    return clone.weekday() + clone.localeData().firstDayOfWeek();
  },
  getYear: date => date.year(),
  getMonth: date => date.month(),
  getDate: date => date.date(),
  getHour: date => date.hour(),
  getMinute: date => date.minute(),
  getSecond: date => date.second(),
  getMillisecond: date => date.millisecond(),

  // set
  addYear: (date, diff) => date.add(diff, "year"),
  addMonth: (date, diff) => date.add(diff, "month"),
  addDate: (date, diff) => date.add(diff, "day"),
  setYear: (date, year) => date.year(year),
  setMonth: (date, month) => date.month(month),
  setDate: (date, num) => date.date(num),
  setHour: (date, hour) => date.hour(hour),
  setMinute: (date, minute) => date.minute(minute),
  setSecond: (date, second) => date.second(second),
  setMillisecond: (date, milisecond) => date.millisecond(milisecond),

  // Compare
  isAfter: (date1, date2) => date1.isAfter(date2),
  isValidate: date => date.isValid(),

  locale: {
    getWeekFirstDate: (locale, date) =>
      date.locale(parseLocale(locale)).weekday(0),
    getWeekFirstDay: locale =>
      dayjs().locale(parseLocale(locale)).localeData().firstDayOfWeek(),
    getWeek: (locale, date) => date.locale(parseLocale(locale)).week(),
    getShortWeekDays: locale =>
      dayjs().locale(parseLocale(locale)).localeData().weekdaysMin(),
    getShortMonths: locale =>
      dayjs().locale(parseLocale(locale)).localeData().monthsShort(),
    format: (locale, date, format) =>
      date.locale(parseLocale(locale)).format(format),
    parse: (locale, text, formats) => {
      console.log(locale, text);
      const localeStr = parseLocale(locale);
      for (let i = 0; i < formats.length; i += 1) {
        const format = formats[i];
        const formatText = text;
        if (format.includes("wo") || format.includes("Wo")) {
          // parse Wo
          const year = formatText.split("-")[0];
          const weekStr = formatText.split("-")[1];
          const firstWeek = dayjs(year, "YYYY")
            .startOf("year")
            .locale(localeStr);
          for (let j = 0; j <= 52; j += 1) {
            const nextWeek = firstWeek.add(j, "week");
            if (nextWeek.format("Wo") === weekStr) {
              return nextWeek;
            }
          }
          parseNoMatchNotice();
          return null;
        }
        const date = dayjs(formatText, format).locale(localeStr);
        if (date.isValid()) {
          return date;
        }
      }

      parseNoMatchNotice();
      return null;
    },
  },
};

export const DatePicker = generatePicker<Dayjs>(generateJalaliConfig);
