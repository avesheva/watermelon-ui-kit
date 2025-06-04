import { TAG_STATUS } from '@/components/Tag/constants.ts'

export type TagType = {
  name: string,
  status: typeof TAG_STATUS.NEW | typeof TAG_STATUS.SYSTEM | typeof TAG_STATUS.PUBLISHED,
  id?: string,
  rate?: number,
  tagId?: string,
}