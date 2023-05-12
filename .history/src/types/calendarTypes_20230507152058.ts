export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface DayInfo {
  year: number;
  month: number;
  day: number;
  dayOfWeek: number;
  todoInfo?: TodoInfo;
}

export interface TodoInfo {
  day: number;
  total: number;
  completed: number;
}

export interface MonthSelectorProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

export interface DayListProps {
  currentDate: Date;
}

export interface PostItProps {
  dayInfo: DayInfo;
  isDifferentMonth: boolean;
}

export type CalendarMonth = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
