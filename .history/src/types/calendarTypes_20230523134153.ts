export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface DayInfo {
  year: number;
  month: number;
  day: number;
  todoInfo?: TodoInfo;
  textColor: string;
  backgroundColor: string;
}

export interface TodoInfo {
  day: number;
  total: number;
  completed: number;
  color: { r: number; g: number; b: number };
}

export interface DayListProps {
  currentDate: Date;
}

export interface PostItProps {
  dayInfo: DayInfo;
}

export interface SearchCalendarResult {
  [key: string]: { total: number; completed: number };
}
