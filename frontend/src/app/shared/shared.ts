import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from "@angular/animations";

export const loadTrigger: AnimationTriggerMetadata =
  trigger( "load", [
    state( "in", style( { opacity: 1 } ) ),
    transition( "void => *", [
      style( { opacity: 0 } ),
      animate( 200 )
    ] )
  ] );
