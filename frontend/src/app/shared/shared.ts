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
