import type * as React from 'react';
import type { ComponentToken as AlertComponentToken } from '../alert/style';
import type { ComponentToken as AnchorComponentToken } from '../anchor/style';
import type { ComponentToken as AvatarComponentToken } from '../avatar/style';
import type { ComponentToken as BackTopComponentToken } from '../back-top/style';
import type { ComponentToken as ButtonComponentToken } from '../button/style';
import type { ComponentToken as FloatButtonComponentToken } from '../float-button/style';
import type { ComponentToken as CalendarComponentToken } from '../calendar/style';
import type { ComponentToken as CardComponentToken } from '../card/style';
import type { ComponentToken as CarouselComponentToken } from '../carousel/style';
import type { ComponentToken as CascaderComponentToken } from '../cascader/style';
import type { ComponentToken as CheckboxComponentToken } from '../checkbox/style';
import type { ComponentToken as CollapseComponentToken } from '../collapse/style';
import type { ComponentToken as DatePickerComponentToken } from '../date-picker/style';
import type { ComponentToken as DividerComponentToken } from '../divider/style';
import type { ComponentToken as DropdownComponentToken } from '../dropdown/style';
import type { ComponentToken as DrawerComponentToken } from '../drawer/style';
import type { ComponentToken as EmptyComponentToken } from '../empty/style';
import type { ComponentToken as ImageComponentToken } from '../image/style';
import type { ComponentToken as InputNumberComponentToken } from '../input-number/style';
import type { ComponentToken as LayoutComponentToken } from '../layout/style';
import type { ComponentToken as ListComponentToken } from '../list/style';
import type { ComponentToken as MentionsComponentToken } from '../mentions/style';
import type { ComponentToken as MenuComponentToken } from '../menu/style';
import type { ComponentToken as MessageComponentToken } from '../message/style';
import type { ComponentToken as ModalComponentToken } from '../modal/style';
import type { ComponentToken as NotificationComponentToken } from '../notification/style';
import type { ComponentToken as PopconfirmComponentToken } from '../popconfirm/style';
import type { ComponentToken as PopoverComponentToken } from '../popover/style';
import type { ComponentToken as ProgressComponentToken } from '../progress/style';
import type { ComponentToken as RadioComponentToken } from '../radio/style';
import type { ComponentToken as RateComponentToken } from '../rate/style';
import type { ComponentToken as ResultComponentToken } from '../result/style';
import type { ComponentToken as SegmentedComponentToken } from '../segmented/style';
import type { ComponentToken as SelectComponentToken } from '../select/style';
import type { ComponentToken as SkeletonComponentToken } from '../skeleton/style';
import type { ComponentToken as SliderComponentToken } from '../slider/style';
import type { ComponentToken as SpaceComponentToken } from '../space/style';
import type { ComponentToken as SpinComponentToken } from '../spin/style';
import type { ComponentToken as StepsComponentToken } from '../steps/style';
import type { ComponentToken as TableComponentToken } from '../table/style';
import type { ComponentToken as TabsComponentToken } from '../tabs/style';
import type { ComponentToken as TagComponentToken } from '../tag/style';
import type { ComponentToken as TimelineComponentToken } from '../timeline/style';
import type { ComponentToken as TooltipComponentToken } from '../tooltip/style';
import type { ComponentToken as TransferComponentToken } from '../transfer/style';
import type { ComponentToken as TypographyComponentToken } from '../typography/style';
import type { ComponentToken as UploadComponentToken } from '../upload/style';
import type { ComponentToken as TourComponentToken } from '../tour/style';

export const PresetColors = [
  'blue',
  'purple',
  'cyan',
  'green',
  'magenta',
  'pink',
  'red',
  'orange',
  'yellow',
  'volcano',
  'geekblue',
  'lime',
  'gold',
] as const;

type PresetColorKey = typeof PresetColors[number];

export type PresetColorType = Record<PresetColorKey, string>;

type ColorPaletteKeyIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type ColorPalettes = {
  [key in `${keyof PresetColorType}-${ColorPaletteKeyIndex}`]: string;
};

export interface ComponentTokenMap {
  Affix?: {};
  Alert?: AlertComponentToken;
  Anchor?: AnchorComponentToken;
  Avatar?: AvatarComponentToken;
  BackTop?: BackTopComponentToken;
  Badge?: {};
  Button?: ButtonComponentToken;
  Breadcrumb?: {};
  Card?: CardComponentToken;
  Carousel?: CarouselComponentToken;
  Cascader?: CascaderComponentToken;
  Checkbox?: CheckboxComponentToken;
  Collapse?: CollapseComponentToken;
  DatePicker?: DatePickerComponentToken;
  Descriptions?: {};
  Divider?: DividerComponentToken;
  Drawer?: DrawerComponentToken;
  Dropdown?: DropdownComponentToken;
  Empty?: EmptyComponentToken;
  FloatButton?: FloatButtonComponentToken;
  Form?: {};
  Grid?: {};
  Image?: ImageComponentToken;
  Input?: {};
  InputNumber?: InputNumberComponentToken;
  Layout?: LayoutComponentToken;
  List?: ListComponentToken;
  Mentions?: MentionsComponentToken;
  Notification?: NotificationComponentToken;
  Pagination?: {};
  Popover?: PopoverComponentToken;
  Popconfirm?: PopconfirmComponentToken;
  Rate?: RateComponentToken;
  Radio?: RadioComponentToken;
  Result?: ResultComponentToken;
  Segmented?: SegmentedComponentToken;
  Select?: SelectComponentToken;
  Skeleton?: SkeletonComponentToken;
  Slider?: SliderComponentToken;
  Spin?: SpinComponentToken;
  Statistic?: {};
  Switch?: {};
  Tag?: TagComponentToken;
  Tree?: {};
  TreeSelect?: {};
  Typography?: TypographyComponentToken;
  Timeline?: TimelineComponentToken;
  Transfer?: TransferComponentToken;
  Tabs?: TabsComponentToken;
  Calendar?: CalendarComponentToken;
  Steps?: StepsComponentToken;
  Menu?: MenuComponentToken;
  Modal?: ModalComponentToken;
  Message?: MessageComponentToken;
  Upload?: UploadComponentToken;
  Tooltip?: TooltipComponentToken;
  Table?: TableComponentToken;
  Space?: SpaceComponentToken;
  Progress?: ProgressComponentToken;
  Tour?: TourComponentToken;
}

export type OverrideToken = {
  [key in keyof ComponentTokenMap]: Partial<ComponentTokenMap[key]> & Partial<AliasToken>;
};

/** Final token which contains the components level override */
export type GlobalToken = AliasToken & ComponentTokenMap;

// ======================================================================
// ==                            Seed Token                            ==
// ======================================================================
// ???????????????????????????? DO NOT MODIFY THIS. PLEASE CONTACT DESIGNER. ????????????????????????????
export interface SeedToken extends PresetColorType {
  /**
   * @desc ????????????
   */
  colorPrimary: string;

  /**
   * @desc ?????????
   */
  colorSuccess: string;

  /**
   * @desc ?????????
   */
  colorWarning: string;

  /**
   * @desc ?????????
   */
  colorError: string;

  /**
   * @desc ?????????
   */
  colorInfo: string;

  /**
   * @desc ???????????????
   */
  colorTextBase: string;

  /**
   * Base component background color. Will derivative container background color with this
   * @desc ???????????????
   */
  colorBgBase: string;

  // Font
  /**
   * @desc ??????
   */
  fontFamily: string;

  /**
   * @desc ????????????
   */
  fontSize: number;

  /**
   * Border width of base components
   * @desc ????????????
   */
  lineWidth: number;

  /**
   * @desc ????????????
   */
  lineType: string;

  /**
   * @desc ????????????????????????
   */
  motionUnit: number;

  /**
   * @desc ??????????????????
   */
  motionBase: number;

  /**
   * @desc
   */
  motionEaseOutCirc: string;

  /**
   * @desc
   */
  motionEaseInOutCirc: string;

  /**
   * @desc
   */
  motionEaseInOut: string;

  /**
   * @desc
   */
  motionEaseOutBack: string;

  /**
   * @desc
   */
  motionEaseInBack: string;

  /**
   * @desc
   */
  motionEaseInQuint: string;

  /**
   * @desc
   */
  motionEaseOutQuint: string;

  /**
   * @desc
   */
  motionEaseOut: string;

  // Radius
  /**
   * @desc ????????????
   * @descEn Base border radius
   */
  borderRadius: number;

  /**
   * @desc ??????????????????
   */
  sizeUnit: number;

  /**
   * @desc ??????????????????
   */
  sizeStep: number;

  /**
   * @desc ??????????????????
   */
  sizePopupArrow: number;

  // Control Base

  /**
   * @desc
   */
  controlHeight: number;

  /**
   * @desc ?????? zIndex
   * @descEn Base popup component zIndex
   */
  zIndexBase: number;
  /**  */

  /**
   * @desc ???????????? zIndex
   * @descEn Base zIndex of component like FloatButton, Affix which can be cover by large popup
   */
  zIndexPopupBase: number;

  /**
   * @desc ?????????
   * @descEn Define default Image opacity. Useful when in dark-like theme
   */
  opacityImage: number;

  /**
   * @desc ?????????
   */
  wireframe: boolean;
}

export interface NeutralColorMapToken {
  /**
   * @internal
   */
  colorTextBase: string;

  /**
   * @internal
   */
  colorBgBase: string;

  /**
   * @desc ???????????????
   */
  colorText: string;

  /**
   * @desc ???????????????
   */
  colorTextSecondary: string;

  /**
   * @desc ???????????????
   */
  colorTextTertiary: string;

  /**
   * @desc ???????????????
   */
  colorTextQuaternary: string;

  /**
   * @desc ???????????????
   */
  colorFill: string;

  /**
   * @desc ???????????????
   */
  colorFillSecondary: string;

  /**
   * @desc ???????????????
   */
  colorFillTertiary: string;

  /**
   * @desc ???????????????
   */
  colorFillQuaternary: string;

  /**
   * @desc ?????????????????????
   */
  colorBgContainer: string;

  /**
   * @desc ?????????????????????
   */
  colorBgElevated: string;

  /**
   * @desc ???????????????
   */
  colorBgLayout: string;

  /**
   * @desc
   */
  colorBgSpotlight: string;

  /**
   * @desc ???????????????
   */
  colorBorder: string;

  /**
   * @desc ???????????????
   */
  colorBorderSecondary: string;
}

export interface ColorMapToken extends NeutralColorMapToken {
  // Primary
  /**
   * @desc ???????????????????????????
   */
  colorPrimaryBg: string; // 1

  /**
   * @desc ?????????????????????????????????
   */
  colorPrimaryBgHover: string; // 2

  /**
   * @desc ??????????????????
   */
  colorPrimaryBorder: string; // 3

  /**
   * @desc ???????????????????????????
   */
  colorPrimaryBorderHover: string; // 4

  /**
   * @desc ????????????????????????
   */
  colorPrimaryHover: string; // 5

  /**
   * @desc ????????????
   */
  colorPrimary: string; // 6

  /**
   * @desc ????????????????????????
   */
  colorPrimaryActive: string; // 7

  /**
   * @desc ????????????????????????
   */
  colorPrimaryTextHover: string; // 8

  /**
   * @desc ????????????????????????
   */
  colorPrimaryText: string; // 9

  /**
   * @desc ????????????????????????
   */
  colorPrimaryTextActive: string; // 10

  /**
   * @desc ??????????????????????????????
   */
  colorSuccessBg: string; // 1

  /**
   * @desc ????????????????????????????????????
   */
  colorSuccessBgHover: string; // 2

  /**
   * @desc ?????????????????????
   */
  colorSuccessBorder: string; // 3

  /**
   * @desc ??????????????????????????????
   */
  colorSuccessBorderHover: string; // 4

  /**
   * @desc ???????????????????????????
   */
  colorSuccessHover: string; // 5

  /**
   * @desc ?????????
   */
  colorSuccess: string; // 6

  /**
   * @desc ???????????????????????????
   */
  colorSuccessActive: string; // 7

  /**
   * @desc ???????????????????????????
   */
  colorSuccessTextHover: string; // 8

  /**
   * @desc ???????????????????????????
   */
  colorSuccessText: string; // 9

  /**
   * @desc ???????????????????????????
   */
  colorSuccessTextActive: string; // 10

  /**
   * @desc ??????????????????????????????
   */
  colorWarningBg: string; // 1

  /**
   * @desc ????????????????????????????????????
   */
  colorWarningBgHover: string; // 2

  /**
   * @desc ?????????????????????
   */
  colorWarningBorder: string; // 3

  /**
   * @desc ??????????????????????????????
   */
  colorWarningBorderHover: string; // 4

  /**
   * @desc ???????????????????????????
   */
  colorWarningHover: string; // 5

  /**
   * @desc ?????????
   */
  colorWarning: string; // 6

  /**
   * @desc ???????????????????????????
   */
  colorWarningActive: string; // 7

  /**
   * @desc ???????????????????????????
   */
  colorWarningTextHover: string; // 8

  /**
   * @desc ???????????????????????????
   */
  colorWarningText: string; // 9

  /**
   * @desc ???????????????????????????
   */
  colorWarningTextActive: string; // 10

  /**
   * @desc ??????????????????????????????
   */
  colorErrorBg: string; // 1

  /**
   * @desc ????????????????????????????????????
   */
  colorErrorBgHover: string; // 2

  /**
   * @desc ?????????????????????
   */
  colorErrorBorder: string; // 3

  /**
   * @desc ??????????????????????????????
   */
  colorErrorBorderHover: string; // 4

  /**
   * @desc ???????????????????????????
   */
  colorErrorHover: string; // 5

  /**
   * @desc ?????????
   */
  colorError: string; // 6

  /**
   * @desc ???????????????????????????
   */
  colorErrorActive: string; // 7

  /**
   * @desc ???????????????????????????
   */
  colorErrorTextHover: string; // 8

  /**
   * @desc ???????????????????????????
   */
  colorErrorText: string; // 9

  /**
   * @desc ???????????????????????????
   */
  colorErrorTextActive: string; // 10

  /**
   * @desc ??????????????????????????????
   */
  colorInfoBg: string; // 1

  /**
   * @desc ????????????????????????????????????
   */
  colorInfoBgHover: string; // 2

  /**
   * @desc ?????????????????????
   */
  colorInfoBorder: string; // 3

  /**
   * @desc ??????????????????????????????
   */
  colorInfoBorderHover: string; // 4

  /**
   * @desc ???????????????????????????
   */
  colorInfoHover: string; // 5

  /**
   * @desc ?????????
   */
  colorInfo: string; // 6

  /**
   * @desc ???????????????????????????
   */
  colorInfoActive: string; // 7

  /**
   * @desc ???????????????????????????
   */
  colorInfoTextHover: string; // 8

  /**
   * @desc ???????????????????????????
   */
  colorInfoText: string; // 9

  /**
   * @desc ???????????????????????????
   */
  colorInfoTextActive: string; // 10

  /**
   * @desc ???????????????????????????
   */
  colorBgMask: string;
  colorWhite: string;
}

export interface SizeMapToken {
  // Size
  sizeXXL: number;
  sizeXL: number;
  sizeLG: number;
  sizeMD: number;
  /** Same as size by default, but could be larger in compact mode */
  sizeMS: number;
  size: number;
  sizeSM: number;
  sizeXS: number;
  sizeXXS: number;
}

export interface HeightMapToken {
  // Control
  /** @private Only Used for control inside component like Multiple Select inner selection item */
  controlHeightXS: number;
  controlHeightSM: number;
  controlHeightLG: number;
}

export interface CommonMapToken {
  // Font
  /**
   * @internal
   */
  fontSizes: number[];
  /**
   * @internal
   */
  lineHeights: number[];

  // Line
  lineWidthBold: number;

  // Motion
  motionDurationFast: string;
  motionDurationMid: string;
  motionDurationSlow: string;

  // Radius
  borderRadiusXS: number;
  borderRadiusSM: number;
  borderRadiusLG: number;
  borderRadiusOuter: number;
}

// ======================================================================
// ==                         Map Token                         ==
// ======================================================================
// ???????????????????????????? DO NOT MODIFY THIS. PLEASE CONTACT DESIGNER. ????????????????????????????
export interface MapToken
  extends SeedToken,
    ColorPalettes,
    ColorMapToken,
    SizeMapToken,
    HeightMapToken,
    CommonMapToken {}

// ======================================================================
// ==                           Alias Token                            ==
// ======================================================================
// ???????????????????????????? DO NOT MODIFY THIS. PLEASE CONTACT DESIGNER. ????????????????????????????
export interface AliasToken extends MapToken {
  // Background
  colorFillContentHover: string;
  colorFillAlter: string;
  colorBgContainerDisabled: string;
  colorFillContent: string;

  // Border
  colorBorderBg: string;
  colorSplit: string;

  // Text
  colorTextPlaceholder: string;
  colorTextDisabled: string;
  colorTextHeading: string;
  colorTextLabel: string;
  colorTextDescription: string;
  colorTextLightSolid: string;
  colorBgTextHover: string;
  colorBgTextActive: string;

  /** Weak action. Such as `allowClear` or Alert close button */
  colorIcon: string;
  /** Weak action hover color. Such as `allowClear` or Alert close button */
  colorIconHover: string;

  colorLink: string;
  colorLinkHover: string;
  colorLinkActive: string;

  colorHighlight: string;

  controlOutline: string;
  colorWarningOutline: string;
  colorErrorOutline: string;

  // Font
  fontSizeSM: number;
  fontSize: number;
  fontSizeLG: number;
  fontSizeXL: number;
  /** Operation icon in Select, Cascader, etc. icon fontSize. Normal is same as fontSizeSM */
  fontSizeIcon: number;

  fontSizeHeading1: number;
  fontSizeHeading2: number;
  fontSizeHeading3: number;
  fontSizeHeading4: number;
  fontSizeHeading5: number;

  /** For heading like h1, h2, h3 or option selected item */
  fontWeightStrong: number;

  // LineHeight
  lineHeight: number;
  lineHeightLG: number;
  lineHeightSM: number;

  lineHeightHeading1: number;
  lineHeightHeading2: number;
  lineHeightHeading3: number;
  lineHeightHeading4: number;
  lineHeightHeading5: number;

  // Control
  controlOutlineWidth: number;
  controlItemBgHover: string; // Note. It also is a color
  controlItemBgActive: string; // Note. It also is a color
  controlItemBgActiveHover: string; // Note. It also is a color
  controlInteractiveSize: number;
  controlItemBgActiveDisabled: string; // Note. It also is a color

  // Padding
  paddingXXS: number;
  paddingXS: number;
  paddingSM: number;
  padding: number;
  paddingMD: number;
  paddingLG: number;
  paddingXL: number;

  // Padding Content
  paddingContentHorizontalLG: number;
  paddingContentHorizontal: number;
  paddingContentHorizontalSM: number;
  paddingContentVerticalLG: number;
  paddingContentVertical: number;
  paddingContentVerticalSM: number;

  // Margin
  marginXXS: number;
  marginXS: number;
  marginSM: number;
  margin: number;
  marginMD: number;
  marginLG: number;
  marginXL: number;
  marginXXL: number;

  // =============== Legacy: should be remove ===============
  opacityLoading: number;

  boxShadow: string;
  boxShadowSecondary: string;

  linkDecoration: React.CSSProperties['textDecoration'];
  linkHoverDecoration: React.CSSProperties['textDecoration'];
  linkFocusDecoration: React.CSSProperties['textDecoration'];

  controlPaddingHorizontal: number;
  controlPaddingHorizontalSM: number;

  // Media queries breakpoints
  screenXS: number;
  screenXSMin: number;
  screenXSMax: number;
  screenSM: number;
  screenSMMin: number;
  screenSMMax: number;
  screenMD: number;
  screenMDMin: number;
  screenMDMax: number;
  screenLG: number;
  screenLGMin: number;
  screenLGMax: number;
  screenXL: number;
  screenXLMin: number;
  screenXLMax: number;
  screenXXL: number;
  screenXXLMin: number;
  screenXXLMax: number;

  /** Used for DefaultButton, Switch which has default outline */
  controlTmpOutline: string;

  // FIXME: component box-shadow, should be removed
  /** @internal */
  boxShadowPopoverArrow: string;
  /** @internal */
  boxShadowCard: string;
  /** @internal */
  boxShadowDrawerRight: string;
  /** @internal */
  boxShadowDrawerLeft: string;
  /** @internal */
  boxShadowDrawerUp: string;
  /** @internal */
  boxShadowDrawerDown: string;
  /** @internal */
  boxShadowTabsOverflowLeft: string;
  /** @internal */
  boxShadowTabsOverflowRight: string;
  /** @internal */
  boxShadowTabsOverflowTop: string;
  /** @internal */
  boxShadowTabsOverflowBottom: string;
}
