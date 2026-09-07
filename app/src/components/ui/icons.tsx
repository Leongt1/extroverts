import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

export const CloseIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
)

export const BellIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M18 8a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6" />
    <path d="M13.7 20a2 2 0 0 1-3.4 0" />
  </svg>
)

export const StarIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9z" />
  </svg>
)

export const ChatIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M20 12a7.5 7.5 0 0 1-8 7.5c-1 0-2-.2-2.9-.5L4 21l1.4-4.2A7.5 7.5 0 1 1 20 12z" />
    <path d="M9 12h.01M12 12h.01M15 12h.01" />
  </svg>
)

export const ClockIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <path d="M12 8v4.2l2.6 1.6" />
  </svg>
)

export const CalendarIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="3" y="5" width="18" height="16" rx="4" />
    <path d="M8 3v4M16 3v4M3 10h18" />
  </svg>
)

export const PinIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M20 10.5c0 5.2-8 11-8 11s-8-5.8-8-11a8 8 0 1 1 16 0z" />
    <circle cx="12" cy="10.5" r="2.6" />
  </svg>
)

export const HomeIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19z" />
  </svg>
)

export const PlusIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <path d="M12 8.5v7M8.5 12h7" />
  </svg>
)

export const PersonIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="8" r="3.6" />
    <path d="M5 20c.9-3.4 3.6-5.2 7-5.2s6.1 1.8 7 5.2" />
  </svg>
)

export const MailIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="3" y="5.5" width="18" height="13" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </svg>
)

export const InfoIcon = (props: IconProps) => (
  <svg {...base} width={16} height={16} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 7.6h.01" />
  </svg>
)

export const CheckIcon = (props: IconProps) => (
  <svg {...base} strokeWidth={2.4} {...props}>
    <path d="m5 12.5 4.6 4.5L19 7.5" />
  </svg>
)

/** Club-tier medal — bronze or silver hexagon. */
export const TierIcon = ({ tier, ...props }: IconProps & { tier: 'bronze' | 'silver' }) => (
  <svg {...base} strokeWidth={1} width={30} height={30} {...props}>
    <defs>
      <linearGradient id={`tier-${tier}`} x1="0" y1="0" x2="1" y2="1">
        {tier === 'silver' ? (
          <>
            <stop offset="0%" stopColor="#f4f4f5" />
            <stop offset="55%" stopColor="#a1a1aa" />
            <stop offset="100%" stopColor="#e4e4e7" />
          </>
        ) : (
          <>
            <stop offset="0%" stopColor="#e8a170" />
            <stop offset="55%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#d97706" />
          </>
        )}
      </linearGradient>
    </defs>
    <path
      d="M12 2.5 20 7v10l-8 4.5L4 17V7z"
      fill={`url(#tier-${tier})`}
      stroke="rgba(255,255,255,0.35)"
    />
  </svg>
)
