import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from "@angular/animations";

export const loadTrigger: AnimationTriggerMetadata =
  trigger( "load", [
    state( "in", style( { opacity: 1 } ) ),
    transition( "void => *", [
      style( { opacity: 0 } ),
      animate( 200 )
    ] )
  ] );

export const leftSlideTrigger: AnimationTriggerMetadata =
  trigger( "slide", [
    state( "in", style( { transform: "translateX(0)" } ) ),
    transition( "void => *", [
      style( { transform: "translateX(-20px)" } ),
      animate( 100 )
    ] )
  ] );

export const scaleUpTrigger: AnimationTriggerMetadata =
  trigger( "scale", [
    state( "in", style( { transform: "scale(1)" } ) ),
    transition( "void => *", [
      style( { transform: "scale(0)" } ),
      animate( 100 )
    ] )
  ] );


