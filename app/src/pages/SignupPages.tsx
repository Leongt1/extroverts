import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWizardStore } from '../store/wizardStore'

type InfoProps = { title: string; label: string; helper: string; next: string; route: string; readOnly?: boolean }

function Header({ back = '/feed', progress = false }: { back?: string; progress?: boolean }) {
  const navigate = useNavigate()
  return <header className="wizard-header"><button className="back-link" type="button" onClick={() => navigate(back)}>Back</button><Wordmark /><span className="progress-label">{progress ? 'Getting ready' : ''}</span></header>
}

function Wordmark() { return <div className="wordmark" aria-label="E club">E<span>.</span></div> }

export function OtpPage() {
  const navigate = useNavigate()
  const email = useWizardStore((state) => state.email)
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const value = code.join('')
  const update = (index: number, digit: string) => setCode((current) => current.map((item, position) => position === index ? digit.slice(-1) : item))
  return <main className="page-shell"><div className="page-frame otp-frame"><Header back="/signup/email" /><div className="otp-copy"><p className="field-label">Enter OTP</p><div className="otp-grid">{code.map((digit, index) => <input key={index} aria-label={`OTP digit ${index + 1}`} inputMode="numeric" maxLength={1} value={digit} placeholder="." onChange={(event) => update(index, event.target.value.replace(/\D/g, ''))} className={error ? 'otp-error' : ''} />)}</div><button className="resend-link" type="button">Resend OTP</button></div><div className="page-actions otp-actions"><button className="button button-primary" type="button" disabled={value.length !== 6} onClick={() => value === '123456' ? navigate('/signup/username') : setError('Incorrect code, try again')}>Verify</button><button className="button button-secondary" type="button" onClick={() => navigate('/signup/email')}>Go back</button>{error ? <p className="field-error">{error}</p> : <p className="helper-copy">A 6-digit OTP has been sent to {email || 'your email'}.</p>}</div></div></main>
}

export function InfoPage({ title, label, helper, next, route, readOnly = false }: InfoProps) {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const valid = value.trim().length > 0
  return <main className="page-shell"><div className="page-frame info-frame"><Header back={route === '/signup/username' ? '/signup/verify' : undefined} progress /><div className="info-copy"><h1>{title}</h1><label className="field-label" htmlFor="info-value">{label}</label><input id="info-value" className="text-input" value={value} readOnly={readOnly} onChange={(event) => setValue(event.target.value)} /><p className="body-copy">{helper}</p></div><div className="page-actions"><button className="button button-primary" type="button" disabled={!valid} onClick={() => navigate(next)}>Next</button><button className="button button-secondary" type="button" onClick={() => navigate('/signup/email')}>Back</button></div></div></main>
}

export function AgePage() {
  const navigate = useNavigate()
  const [age, setAge] = useState('')
  const [open, setOpen] = useState(false)
  return <main className="page-shell"><div className="page-frame info-frame"><Header progress /><div className="info-copy"><h1>How many years have you been partying?</h1><label className="field-label" htmlFor="age">Age</label><input id="age" className="text-input" value={age} placeholder="" readOnly onClick={() => setOpen(true)} /><p className="body-copy">We need your age to verify you&apos;re eligible and help others know who they&apos;re connecting with.</p>{age && Number(age) < 18 && <p className="field-error">You must be 18 or older to continue.</p>}</div><div className="page-actions"><button className="button button-primary" type="button" disabled={!age || Number(age) < 18} onClick={() => navigate('/signup/pronouns')}>Next</button><button className="button button-secondary" type="button" onClick={() => navigate('/signup/name')}>Back</button></div>{open && <DobSheet onClose={() => setOpen(false)} onAge={(value) => { setAge(value); setOpen(false) }} />}</div></main>
}

function DobSheet({ onClose, onAge }: { onClose: () => void; onAge: (age: string) => void }) { const [day, setDay] = useState(''); const [month, setMonth] = useState(''); const [year, setYear] = useState(''); const valid = Number(day) > 0 && Number(day) <= 31 && Number(month) > 0 && Number(month) <= 12 && year.length === 4; return <div className="sheet-layer"><button className="sheet-scrim" aria-label="Close date picker" onClick={onClose} /><section className="bottom-sheet dob-sheet"><div className="sheet-handle" /><button className="sheet-close" type="button" onClick={onClose}>x</button><h2>Date of birth</h2><div className="dob-grid"><input placeholder="DD" value={day} onChange={(event) => setDay(event.target.value.replace(/\D/g, ''))} /><input placeholder="MM" value={month} onChange={(event) => setMonth(event.target.value.replace(/\D/g, ''))} /><input placeholder="YYYY" value={year} onChange={(event) => setYear(event.target.value.replace(/\D/g, ''))} /></div><button className="button button-primary" type="button" disabled={!valid} onClick={() => onAge(String(new Date().getFullYear() - Number(year) - (new Date().getMonth() + 1 < Number(month) ? 1 : 0)))}>Proceed</button></section></div> }

export function PronounsPage() { const navigate = useNavigate(); const [selected, setSelected] = useState<string[]>([]); const options = ['he', 'him', 'his', 'she', 'her', 'hers', 'they', 'them', 'theirs', 'ze', 'zir', 'zirs', 've', 'ver', 'vis']; return <main className="page-shell"><div className="page-frame info-frame"><Header progress /><div className="info-copy"><h1>Which pronouns feel right for you?</h1><label className="field-label">Pronouns</label><input className="text-input" value={selected.join(', ')} readOnly onClick={() => {}} /><p className="body-copy">Select the pronouns that feel right for you.</p><div className="pronoun-list">{options.slice(0, 5).map((option) => <label key={option}><input type="checkbox" checked={selected.includes(option)} disabled={!selected.includes(option) && selected.length >= 3} onChange={() => setSelected(selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option])} />{option}</label>)}</div></div><div className="page-actions"><button className="button button-primary" disabled={!selected.length} onClick={() => navigate('/signup/invite')}>Next</button><button className="button button-secondary" onClick={() => navigate('/signup/age')}>Back</button></div></div></main> }

export function InvitePage() { const navigate = useNavigate(); const [invite, setInvite] = useState(''); return <main className="page-shell"><div className="page-frame invite-frame"><Header progress /><div className="invite-copy"><p className="invite-lines">KINDNESS = GOOD <em>HAIR</em> DAY<br />SIP IN? <em>CHIP</em> IN.<br />GHOSTING IS FOR <em>HALLOWEEN.</em><br />OUTFITS LOUD, <em>INTENTIONS</em> CLEAR.<br />JOINING? FREE. HOSTING? <em>ALSO</em> FREE.<br />EARLY IS <em>ICONIC.</em><br />YES. <em>SPELLING</em> MISTAKE.</p><label className="field-label" htmlFor="invite">Enter invite code (optional)</label><input id="invite" className="text-input" value={invite} onChange={(event) => setInvite(event.target.value)} /><p className="helper-copy">Enter invite code and get up to +30 HVTs!</p></div><div className="page-actions"><button className="button button-primary" onClick={() => navigate('/signup/success')}>Sign up</button><button className="button button-secondary" onClick={() => navigate('/signup/pronouns')}>Back</button></div></div></main> }

export function SuccessPage() { return <main className="page-shell"><div className="page-frame success-frame"><Wordmark /><div className="success-copy"><span className="success-mark">✓</span><h1>You&apos;re in!</h1><p className="body-copy">The room is waiting. Go make a little noise.</p></div></div></main> }
