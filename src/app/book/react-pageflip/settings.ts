import { FlipSetting } from "../page-flip/Settings";

export type PageState = "user_fold" | "fold_corner" | "flipping" | "read";
export type PageOrientation = "portrait" | "landscape";

export type IFlipSetting = FlipSetting;

export interface IBookState {
  page: number;
  mode: PageOrientation;
}

export interface IEventProps {
  onFlip?: (flipEvent: unknown) => void;
  onChangeOrientation?: (flipEvent: unknown) => void;
  onChangeState?: (flipEvent: unknown) => void;
  onInit?: (flipEvent: unknown) => void;
  onUpdate?: (flipEvent: unknown) => void;
}
