import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from "@angular/animations";

export const loadTrigger: AnimationTriggerMetadata =
  trigger( "load", [
    state( "in", style( { opacity: 1 } ) ),
    transition( "void => *", [
      style( { opacity: 0 } ),
      animate( 200 )
    ] )
  ] );

export const COMPANY_NAME = "Regency Agency";

export const MONTHS = [ "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December" ];

export const
  myFilter = ( d: Date | null ): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

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
  var weekNo = Math.ceil( (((d.valueOf() - yearStart.valueOf()) / 86400000) + 1) / 7 );
  // Return array of year and week number
  return weekNo;
}

export const STARTYEAR = 2020;
