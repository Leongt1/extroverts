import { useNavigate } from 'react-router-dom'
import { Wordmark } from './Wordmark'

type WizardHeaderProps = {
  back?: string
  progress?: boolean
  centered?: boolean
}

export function WizardHeader({ back = '/feed', progress = false, centered = false }: WizardHeaderProps) {
  const navigate = useNavigate()

  return (
    <header className={`flex items-center justify-between ${centered ? 'justify-center' : ''}`}>
      {!centered && <button className="cursor-pointer border-0 bg-transparent p-0 text-[12px] uppercase tracking-[.12em] text-app-muted hover:text-app-text" type="button" onClick={() => navigate(back)}>Back</button>}
      <Wordmark />
      {progress && <span className="text-[13px] font-bold uppercase text-app-text">Getting ready</span>}
    </header>
  )
}
