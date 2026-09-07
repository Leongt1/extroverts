import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useWizardStore } from '../store/wizardStore'
import { ActionButton } from '../components/ActionButton'
import { WizardHeader } from '../components/WizardHeader'
import { useSendOtp } from '../hooks/useSendOtp'
import { toast } from 'sonner'

const emailSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email address'),
  newsletterOptIn: z.boolean(),
})

type EmailForm = z.infer<typeof emailSchema>

export function EmailPage() {
  const navigate = useNavigate()
  const { email, newsletterOptIn, setEmail } = useWizardStore()
  const sendOtp = useSendOtp()
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    mode: 'onChange',
    defaultValues: { email, newsletterOptIn },
  })

  const onSubmit = (values: EmailForm) => {
    setEmail(values.email, values.newsletterOptIn)
    sendOtp.mutate(values.email, { onSuccess: () => navigate('/signup/verify'), onError: (error) => toast.error(error.message) })
  }

  return (
    <main className="h-[100svh] overflow-hidden bg-app-base">
      <div className="relative z-[1] mx-auto flex h-[100svh] w-[calc(100%-48px)] max-w-[480px] flex-col gap-7 py-12">
        <WizardHeader back="/feed" />
        <div className="mt-[170px] mb-7 grid gap-[18px]"><h1 className="m-0 text-[clamp(36px,10vw,54px)] font-bold leading-[1.12] tracking-[-.055em] text-app-text">Enter your email</h1></div>
        <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)} noValidate>
          <label className="text-[11px] font-semibold uppercase tracking-[.12em] text-app-muted" htmlFor="email">Email</label>
          <input id="email" className={`h-[54px] w-full rounded-xl border bg-transparent px-4 text-app-text outline-0 placeholder:text-app-disabled focus:border-app-border-focus focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--app-accent)_15%,transparent)] ${errors.email ? 'border-app-error' : 'border-app-border'}`} type="email" placeholder="EMAIL" autoComplete="email" aria-describedby={errors.email ? 'email-error' : undefined} {...register('email')} />
          {errors.email && <p className="m-0 text-[12px] text-app-error" id="email-error">{errors.email.message}</p>}
          <label className="mt-3.5 flex cursor-pointer items-center gap-2.5 text-[12px] text-app-muted"><input className="h-4 w-4 accent-app-accent" type="checkbox" {...register('newsletterOptIn')} /><span>Keep me posted about the good stuff</span></label>
          <div className="mt-6 grid gap-[18px]"><ActionButton type="submit" disabled={!isValid || sendOtp.isPending}>{sendOtp.isPending ? 'Sending...' : 'Proceed'}</ActionButton></div>
        </form>
      </div>
    </main>
  )
}

