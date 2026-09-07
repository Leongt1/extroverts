import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ActionButton } from '../components/ActionButton'
import { BottomSheet } from '../components/BottomSheet'
import { WizardHeader } from '../components/WizardHeader'
import { useWizardStore } from '../store/wizardStore'
import { useSimulatedMutation } from '../hooks/useSimulatedMutation'
import { toast } from 'sonner'

const frame = 'relative z-[1] mx-auto flex h-[100svh] w-[calc(100%-48px)] max-w-[480px] flex-col bg-app-base py-12'
const input = 'h-[54px] w-full rounded-xl border border-app-border bg-transparent px-4 text-app-text outline-0 placeholder:text-app-disabled focus:border-app-border-focus focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--app-accent)_15%,transparent)]'
const label = 'text-[11px] font-semibold uppercase tracking-[.12em] text-app-muted'
const helper = 'text-[15px] leading-[1.7] text-app-muted'
const actions = 'mt-auto grid gap-[18px]'
const errorText = 'm-0 text-[12px] text-app-error'

function PageFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <main className="h-[100svh] overflow-hidden bg-app-base"><div className={`${frame} ${className}`}>{children}</div></main>
}

function Header({ back, progress = true }: { back: string; progress?: boolean }) {
  return <WizardHeader back={back} progress={progress} />
}

export function OtpPage() {
  const navigate = useNavigate()
  const { email, setOtpVerified } = useWizardStore()
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [cooldown, setCooldown] = useState(30)
  const verify = useSimulatedMutation({ action: async (value: string) => value === '123456', delay: 800 })
  const value = code.join('')

  useEffect(() => {
    if (cooldown === 0) return
    const timer = window.setInterval(() => setCooldown((current) => Math.max(0, current - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [cooldown])

  const submit = () => verify.mutate(value, { onSuccess: (valid) => valid ? (setOtpVerified(), navigate('/signup/username')) : setError('Incorrect code, try again'), onError: (mutationError) => toast.error(mutationError.message) })

  return <PageFrame className="pt-12">
    <div className="flex justify-center"><WizardHeader back="/signup/email" centered progress={false} /></div>
    <div className="mt-20"><p className={`${label} text-[16px] text-app-text`}>Enter OTP</p><div className="mt-12 grid grid-cols-6 gap-2.5">{code.map((digit, index) => <input key={index} aria-label={`OTP digit ${index + 1}`} inputMode="numeric" maxLength={1} value={digit} placeholder="." onChange={(event) => setCode((current) => current.map((item, position) => position === index ? event.target.value.replace(/\D/g, '').slice(-1) : item))} className={`w-full border-0 border-b-2 bg-transparent pb-3 text-center text-xl text-app-text outline-0 focus:border-app-border-focus ${error ? 'border-app-error' : 'border-app-border'}`} />)}</div><button className="mt-[38px] ml-auto block cursor-pointer border-0 bg-transparent text-[13px] text-app-muted disabled:cursor-not-allowed" type="button" disabled={cooldown > 0} onClick={() => setCooldown(30)}>{cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}</button></div>
    <div className={actions}><ActionButton type="button" disabled={value.length !== 6 || verify.isPending} onClick={submit}>{verify.isPending ? 'Verifying...' : 'Verify'}</ActionButton><ActionButton variant="secondary" type="button" onClick={() => navigate('/signup/email')}>Go back</ActionButton><p className={error ? errorText : 'text-[12px] leading-[1.5] text-app-muted'}>{error || `A 6-digit OTP has been sent to ${email || 'your email'}.`}</p></div>
  </PageFrame>
}

type InfoProps = { title: string; fieldLabel: string; helperText: string; next: string; back: string; valueKey: 'username' | 'displayName' }
export function InfoPage({ title, fieldLabel, helperText, next, back, valueKey }: InfoProps) {
  const navigate = useNavigate()
  const value = useWizardStore((state) => state[valueKey])
  const setStepData = useWizardStore((state) => state.setStepData)
  const markStepReached = useWizardStore((state) => state.markStepReached)
  const [draft, setDraft] = useState(value)
  const [touched, setTouched] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [availability, setAvailability] = useState<'available' | 'taken' | null>(valueKey === 'username' && value ? 'available' : null)
  const isUsername = valueKey === 'username'
  const valid = isUsername ? draft.trim().length >= 3 && draft.trim().length <= 20 : draft.trim().length > 0 && draft.trim().length <= 50
  const checkAvailability = useSimulatedMutation({ action: async (username: string) => !['partyking', 'rahulxkumar', 'extrovert'].includes(username.toLowerCase()), delay: 900 })
  const error = touched && isUsername && draft.trim().length > 0 && !valid ? 'Username must be 3–20 characters' : touched && !draft.trim() ? `${fieldLabel} is required` : ''
  const warning = availability === 'taken' ? 'This username is already taken' : ''
  const commit = () => { setStepData(valueKey, draft.trim()); markStepReached(isUsername ? 3 : 4); navigate(next) }
  const checkName = () => { if (!valid || !isUsername) return; checkAvailability.mutate(draft.trim(), { onSuccess: (available) => setAvailability(available ? 'available' : 'taken') }) }

  return <PageFrame className="gap-7"><Header back={back} /><div className="mt-[100px] grid gap-[18px]"><h1 className="m-0 text-[30px] font-bold leading-[1.12] tracking-[-.055em] text-app-text">{title}</h1><label className={label} htmlFor={valueKey}>{fieldLabel}</label><input id={valueKey} className={`${input} ${error ? 'border-app-error' : warning ? 'border-app-border' : ''}`} value={draft} onChange={(event) => { setDraft(event.target.value); setAvailability(null) }} onBlur={() => { setTouched(true); checkName() }} aria-describedby={error ? `${valueKey}-error` : undefined} /><p className={error ? errorText : warning ? 'm-0 text-[12px] text-app-warning' : helper}>{error || warning || helperText}</p></div><div className={actions}><ActionButton type="button" disabled={!valid || (isUsername && availability !== 'available')} onClick={() => isUsername ? (availability === 'available' ? commit() : checkName()) : setConfirmOpen(true)}>{checkAvailability.isPending ? 'Checking...' : 'Next'}</ActionButton><ActionButton variant="secondary" type="button" onClick={() => navigate(back)}>Back</ActionButton></div>{confirmOpen && <BottomSheet title="Are you sure?" onClose={() => setConfirmOpen(false)}><p className={helper}>This name cannot be changed later.</p><ActionButton onClick={commit}>Confirm name</ActionButton><ActionButton variant="secondary" onClick={() => setConfirmOpen(false)}>Cancel</ActionButton></BottomSheet>}</PageFrame>
}

function calculateAge(day: number, month: number, year: number, now = new Date()) { let age = now.getFullYear() - year; if (now.getMonth() + 1 < month || (now.getMonth() + 1 === month && now.getDate() < day)) age -= 1; return age }
function DobSheet({ onClose, onAge }: { onClose: () => void; onAge: (age: number, date: string) => void }) {
  const [day, setDay] = useState(''); const [month, setMonth] = useState(''); const [year, setYear] = useState('')
  const dayNumber = Number(day); const monthNumber = Number(month); const yearNumber = Number(year)
  const errors = { day: Boolean(day && (dayNumber < 1 || dayNumber > 31)), month: Boolean(month && (monthNumber < 1 || monthNumber > 12)), year: Boolean(year && year.length !== 4) }
  const date = new Date(yearNumber, monthNumber - 1, dayNumber)
  const valid = Boolean(day && month && year && !errors.day && !errors.month && !errors.year && date.getFullYear() === yearNumber && date.getMonth() === monthNumber - 1 && date.getDate() === dayNumber)
  const dateInput = (value: string, setter: (value: string) => void) => setter(value.replace(/\D/g, ''))
  return <BottomSheet title="Date of birth" onClose={onClose}><div className="grid grid-cols-3 gap-2.5">{[['DD', day, setDay, errors.day], ['MM', month, setMonth, errors.month], ['YYYY', year, setYear, errors.year]].map(([placeholder, value, setter, hasError]) => <div key={placeholder as string}><input className={`${input} text-center ${hasError ? 'border-app-error' : ''}`} placeholder={placeholder as string} value={value as string} onChange={(event) => dateInput(event.target.value, setter as (value: string) => void)} aria-invalid={Boolean(hasError)} />{hasError && <p className={errorText}>Invalid</p>}</div>)}</div><ActionButton type="button" disabled={!valid} onClick={() => onAge(calculateAge(dayNumber, monthNumber, yearNumber), `${day}/${month}/${year}`)}>Proceed</ActionButton></BottomSheet>
}

export function AgePage() {
  const navigate = useNavigate(); const age = useWizardStore((state) => state.age); const setStepData = useWizardStore((state) => state.setStepData); const markStepReached = useWizardStore((state) => state.markStepReached); const [open, setOpen] = useState(false)
  return <PageFrame className="gap-7"><Header back="/signup/name" /><div className="mt-[100px] grid gap-[18px]"><h1 className="text-[30px]">How many years have you been partying?</h1><label className={label} htmlFor="age">Age</label><input id="age" className={input} value={age ?? ''} readOnly onClick={() => setOpen(true)} /><p className={helper}>We need your age to verify you&apos;re eligible and help others know who they&apos;re connecting with.</p>{age !== null && age < 18 && <p className={errorText}>You must be 18 or older to continue.</p>}</div><div className={actions}><ActionButton type="button" disabled={age === null || age < 18} onClick={() => { markStepReached(5); navigate('/signup/pronouns') }}>Next</ActionButton><ActionButton variant="secondary" type="button" onClick={() => navigate('/signup/name')}>Back</ActionButton></div>{open && <DobSheet onClose={() => setOpen(false)} onAge={(value, date) => { setStepData('age', value); setStepData('dateOfBirth', date); setOpen(false) }} />}</PageFrame>
}

const pronounOptions = ['he', 'him', 'his', 'she', 'her', 'hers', 'they', 'them', 'theirs', 'ze', 'zir', 'zirs', 've', 'ver', 'vis']
export function PronounsPage() {
  const navigate = useNavigate(); const saved = useWizardStore((state) => state.pronouns); const customSaved = useWizardStore((state) => state.customPronoun); const setStepData = useWizardStore((state) => state.setStepData); const [selected, setSelected] = useState(saved); const [custom, setCustom] = useState(customSaved); const [open, setOpen] = useState(false)
  const display = [...selected, ...(custom.trim() ? [custom.trim()] : [])]
  return <PageFrame className="gap-7"><Header back="/signup/age" /><div className="mt-[100px] grid gap-[18px]"><h1 className="text-[30px]">Which pronouns feel right for you?</h1><label className={label}>Pronouns</label><input className={input} value={display.join(', ')} readOnly onClick={() => setOpen(true)} /><p className={helper}>Select the pronouns that feel right for you.</p></div><div className={actions}><ActionButton disabled={!display.length} onClick={() => { setStepData('pronouns', selected); setStepData('customPronoun', custom); navigate('/signup/invite') }}>Next</ActionButton><ActionButton variant="secondary" onClick={() => navigate('/signup/age')}>Back</ActionButton></div>{open && <BottomSheet title="Select pronouns" onClose={() => setOpen(false)}><p className={helper}>Select upto 3</p><div className="grid gap-2.5">{pronounOptions.map((option) => <label className="flex items-center gap-3 text-[15px] text-app-text" key={option}><input className="h-[22px] w-[22px] accent-app-text" type="checkbox" checked={selected.includes(option)} disabled={!selected.includes(option) && selected.length >= 3} onChange={() => setSelected(selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option])} />{option}</label>)}</div><ActionButton disabled={!selected.length && !custom.trim()} onClick={() => setOpen(false)}>Proceed</ActionButton><label className={helper}>Did we miss anything?<input className={`${input} mt-2`} value={custom} onChange={(event) => setCustom(event.target.value)} placeholder="Add your own" /></label></BottomSheet>}</PageFrame>
}

export function InvitePage() {
  const navigate = useNavigate(); const invite = useWizardStore((state) => state.inviteCode); const setStepData = useWizardStore((state) => state.setStepData); const setSignupSucceeded = useWizardStore((state) => state.setSignupSucceeded); const signup = useSimulatedMutation({ action: async () => true, delay: 1200, failureRate: 0.15 }); const submit = () => signup.mutate(undefined, { onSuccess: () => { setStepData('inviteCode', invite); setSignupSucceeded(); navigate('/signup/success') }, onError: (mutationError) => toast.error(mutationError.message) })
  return <PageFrame className="gap-7 pt-8"><Header back="/signup/pronouns" /><div className="mt-[68px] grid gap-2"><p className="mb-[18px] text-[14px] font-bold leading-[1.75] text-app-text">KINDNESS = GOOD <em className="not-italic text-app-accent">HAIR</em> DAY<br />SIP IN? <em className="not-italic text-app-accent">CHIP</em> IN.<br />GHOSTING IS FOR <em className="not-italic text-app-accent">HALLOWEEN.</em><br />OUTFITS LOUD, <em className="not-italic text-app-accent">INTENTIONS</em> CLEAR.<br />JOINING? FREE. HOSTING? <em className="not-italic text-app-accent">ALSO</em> FREE.<br />EARLY IS <em className="not-italic text-app-accent">ICONIC.</em><br />YES. <em className="not-italic text-app-accent">SPELLING</em> MISTAKE.</p><label className={label} htmlFor="invite">Enter invite code (optional)</label><input id="invite" className={input} value={invite} onChange={(event) => setStepData('inviteCode', event.target.value)} /><p className="text-[12px] leading-[1.5] text-app-muted">Enter invite code and get up to +30 HVTs!</p></div><div className={actions}><ActionButton disabled={signup.isPending} onClick={submit}>{signup.isPending ? 'Signing up...' : 'Sign up'}</ActionButton><ActionButton variant="secondary" onClick={() => navigate('/signup/pronouns')}>Back</ActionButton></div></PageFrame>
}

export function SuccessPage() { return <PageFrame className="items-center justify-center text-center"><div className="grid justify-items-center gap-[18px]"><span className="grid h-[72px] w-[72px] place-items-center rounded-full border border-app-accent text-[38px] text-app-accent">✓</span><h1 className="text-[clamp(36px,10vw,54px)]">You&apos;re in!</h1><p className={helper}>The room is waiting. Go make a little noise.</p></div></PageFrame> }
