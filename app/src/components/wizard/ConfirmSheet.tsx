import { BottomSheet } from '../ui/BottomSheet'
import { Button } from '../ui/Button'

type ConfirmSheetProps = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  body: string
  confirmLabel?: string
  cancelLabel?: string
}

/** Confirmation for an irreversible commit (the display name). */
export function ConfirmSheet({
  open,
  onClose,
  onConfirm,
  title,
  body,
  confirmLabel = 'Yes, lock it in',
  cancelLabel = 'Let me edit it',
}: ConfirmSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose} title={title} dismissOnScrim={false}>
      <p className="text-[15px] leading-[1.6] text-fg/85">{body}</p>
      <Button onClick={onConfirm}>{confirmLabel}</Button>
      <Button variant="secondary" onClick={onClose}>
        {cancelLabel}
      </Button>
    </BottomSheet>
  )
}
