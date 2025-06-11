import { TAG_STATUS } from '@/components/Tag/constants.ts'

export type TagType = {
  id: string,
  name: string,
  status: typeof TAG_STATUS.NEW | typeof TAG_STATUS.SYSTEM | typeof TAG_STATUS.PUBLISHED,
  rate?: number,
  tagId?: never,
} | {
  tagId: string,
  name: string,
  status: typeof TAG_STATUS.NEW | typeof TAG_STATUS.SYSTEM | typeof TAG_STATUS.PUBLISHED,
  id?: never,
  rate?: number,
}