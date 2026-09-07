import type { ReactNode } from 'react'

type BottomSheetProps = {
  title: string
  children: ReactNode
  onClose: () => void
}

export function BottomSheet({ title, children, onClose }: BottomSheetProps) {
  return (
    <div className="fixed inset-0 z-10 grid items-end">
      <button className="absolute inset-0 cursor-pointer border-0 bg-black/[.68]" aria-label="Close dialog" onClick={onClose} />
      <section className="relative mx-auto grid max-h-[92svh] w-full max-w-[480px] gap-4 overflow-y-auto rounded-t-[26px] bg-app-surface px-6 pb-8 pt-3.5" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
        <div className="mx-auto mb-[18px] h-1 w-10 rounded-full bg-app-border" />
        <button className="absolute right-5 top-[18px] cursor-pointer border-0 bg-transparent text-[28px] text-app-muted" type="button" aria-label="Close" onClick={onClose}>x</button>
        <h2 id="sheet-title" className="my-2 text-[28px] font-bold uppercase text-app-text">{title}</h2>
        {children}
      </section>
    </div>
  )
}
