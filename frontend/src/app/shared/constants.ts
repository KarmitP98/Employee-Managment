export const COMPANY_NAME = 'SEMS';

export const MONTHS = [ 'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December' ];

export const
  myFilter = ( d: Date | null ): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

export interface theme {
  name: string,
  class: string
}


export function getWeekNumber( d: Date ): number {
  // Copy date so don't modify original
  d = new Date( +d );
  d.setHours( 0, 0, 0 );
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setDate( d.getDate() + 4 - (d.getDay() || 7) );
  // Get first day of year
  var yearStart = new Date( d.getFullYear(), 0, 1 );
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil(
    (((d.valueOf() - yearStart.valueOf()) / 86400000) + 1) / 7 );
  // Return array of year and week number
  return weekNo;
}


export function GETWEEKNUMBER( d: Date ): number {
  var tdt = new Date( d.valueOf() );
  var dayn = (d.getDay() + 6) % 7;
  tdt.setDate( tdt.getDate() - dayn + 3 );
  var firstThursday = tdt.valueOf();
  tdt.setMonth( 0, 1 );
  if ( tdt.getDay() !== 4 ) {
    tdt.setMonth( 0, 1 + ((4 - tdt.getDay()) + 7) % 7 );
  }
  return 1 + Math.ceil( (firstThursday - tdt.valueOf()) / 604800000 );
}

export function GETDATERANGEOFWEEK( weekNo: number ) {
  weekNo++;
  const d1 = new Date();
  const numOfdaysPastSinceLastMonday = d1.getDay() - 1;
  d1.setDate( d1.getDate() - numOfdaysPastSinceLastMonday );
  const weekNoToday = GETWEEKNUMBER( d1 );
  const weeksInTheFuture = weekNo - weekNoToday;
  d1.setDate( d1.getDate() + 7 * weeksInTheFuture );
  const rangeIsFrom = (d1.getMonth() + 1) + '/' + d1.getDate() + '/' + d1.getFullYear();
  const monday = new Date( d1.getFullYear(), d1.getMonth(), d1.getDate() );
  const tuesday: Date = new Date( d1.getFullYear(), d1.getMonth(),
                                  d1.getDate() + 1 );
  const wednesday: Date = new Date( d1.getFullYear(), d1.getMonth(),
                                    d1.getDate() + 2 );
  const thursday: Date = new Date( d1.getFullYear(), d1.getMonth(),
                                   d1.getDate() + 3 );
  const friday: Date = new Date( d1.getFullYear(), d1.getMonth(),
                                 d1.getDate() + 4 );
  const saturday: Date = new Date( d1.getFullYear(), d1.getMonth(),
                                   d1.getDate() + 5 );
  const sunday: Date = new Date( d1.getFullYear(), d1.getMonth(),
                                 d1.getDate() + 6 );

  return [ monday,
           tuesday,
           wednesday,
           thursday,
           friday,
           saturday,
           sunday ];
}

export const STARTYEAR = 2020;

export enum ADMIN_STATUS {
  pending = 'Pending',
  approved = 'Approved',
  declined = 'Declined'
}

export var themes: theme[] = [
  { name: 'Default', class: '' },
  { name: 'Classic', class: 'classic-theme' },
  { name: 'Dark', class: 'dark-theme' },
  { name: 'RGB', class: 'rgb-theme' },
  { name: 'BYG', class: 'byg-theme' },
  { name: 'Charleston', class: 'charleston-theme' }
];

export var spinners = [
  { color: 'primary' },
  { color: 'accent' },
  { color: 'warn' }
];
