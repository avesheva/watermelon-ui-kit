import '../style.css'

import Tag from './Tag/index.vue'
import WheelLoader from './WheelLoader/index.vue'
import SvgIcon from './SvgIcon/index.vue'
import QuestionTypeSelect from './QuestionTypeSelect/index.vue'
import ConfirmationPopup from './ConfirmationPopup/index.vue'
// Mobile components
import MobileBottomSheet from './MobileBottomSheet/index.vue'
import MobileSwiper from './MobileSwiper/index.vue'
import MobileButtonBar from './MobileButtonBar/index.vue'

import type { TagType } from './Tag/types.ts'

export {
  Tag,
  WheelLoader,
  SvgIcon,
  QuestionTypeSelect,
  ConfirmationPopup,
  MobileBottomSheet,
  MobileSwiper,
  MobileButtonBar,
}

export type {
  TagType,
}