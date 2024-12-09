import type { PropsWithChildren } from '@/utils/types'

export type ModalProps = PropsWithChildren & {
  title?: string
  onClose: VoidFunction
}
