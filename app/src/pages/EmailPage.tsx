import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useWizardStore } from '../store/wizardStore'

const emailSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email address'),
  newsletterOptIn: z.boolean(),
})

type EmailForm = z.infer<typeof emailSchema>

export function EmailPage() {
  const navigate = useNavigate()
  const { email, newsletterOptIn, setEmail } = useWizardStore()
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    mode: 'onChange',
    defaultValues: { email, newsletterOptIn },
  })

  const onSubmit = (values: EmailForm) => {
    setEmail(values.email, values.newsletterOptIn)
    navigate('/signup/verify')
  }

  return (
    <main className="page-shell">
      <div className="page-frame wizard-frame">
        <header className="wizard-header"><button className="back-link" type="button" onClick={() => navigate('/feed')}>Back</button><Wordmark /></header>
        <div className="wizard-copy"><h1>Enter your email</h1></div>
        <form className="wizard-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <label className="field-label" htmlFor="email">Email</label>
          <input id="email" className={`text-input ${errors.email ? 'input-error' : ''}`} type="email" placeholder="EMAIL" autoComplete="email" aria-describedby={errors.email ? 'email-error' : undefined} {...register('email')} />
          {errors.email && <p className="field-error" id="email-error">{errors.email.message}</p>}
          <label className="check-row"><input type="checkbox" {...register('newsletterOptIn')} /><span>Keep me posted about the good stuff</span></label>
          <div className="page-actions"><button className="button button-primary" type="submit" disabled={!isValid}>Proceed</button></div>
        </form>
      </div>
    </main>
  )
}

function Wordmark() {
  return <div className="wordmark" aria-label="E club">E<span>.</span></div>
}
