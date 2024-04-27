import { WidgetEvent } from "../page-flip/Event/EventObject";
import { FlipSetting } from "../page-flip/Settings";

export type PageState = "user_fold" | "fold_corner" | "flipping" | "read";
export type PageOrientation = "portrait" | "landscape";

export type IFlipSetting = FlipSetting;

export interface IBookState {
  page: number;
  mode: PageOrientation;
}

export type ZoomEvent = "start" | "end" | number;

export interface IEventProps {
  onFlip?: (flipEvent: WidgetEvent) => void;
  onChangeOrientation?: (flipEvent: WidgetEvent) => void;
  onChangeState?: (flipEvent: WidgetEvent) => void;
  onInit?: (flipEvent: WidgetEvent) => void;
  onUpdate?: (flipEvent: WidgetEvent) => void;
  onZoom?: (flipEvent: WidgetEvent) => void;
}
