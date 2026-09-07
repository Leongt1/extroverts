import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ActionButton } from '../components/ActionButton'
import { BottomSheet } from '../components/BottomSheet'
import { Wordmark } from '../components/Wordmark'

export function FeedPage() {
  const [isGateOpen, setIsGateOpen] = useState(false)
  const navigate = useNavigate()

  return <main className="h-[100svh] overflow-hidden bg-app-base"><div className="relative z-[1] mx-auto flex h-[100svh] w-[calc(100%-48px)] max-w-[480px] flex-col gap-2 py-8">
    <header className="flex items-center justify-between"><Wordmark /><span className="text-[25px] text-app-text">[ ] * ☆</span></header>
    <div className="mt-5 text-[13px] text-app-text">YOUR CLUB</div><div className="flex items-center justify-between rounded-t-[10px] border border-app-text px-5 py-[15px] text-[15px] text-app-text"><strong>Bronze Club Member</strong><span>⬡</span></div><div className="h-[3px] bg-app-border"><span className="block h-full w-[64%] bg-app-accent" /></div><p className="my-1 mb-3 text-[13px] font-semibold text-app-text">🟡 YOU HAVE 0 HONORARY VIBE TOKENS!</p>
    <section className="overflow-hidden rounded-[10px] bg-black p-6"><div className="flex min-h-[185px] items-start rounded-xl bg-[linear-gradient(135deg,#ce7c5f,#e3d9bd_42%,#eb4e73)] p-3.5 text-[#a33a32]"><span className="text-[16px] font-bold italic">THE ROYAL FITNESS CLUB</span></div><div className="grid gap-[15px] pt-6"><div><h1 className="m-0 text-[30px] font-bold leading-[1.12] tracking-[-.055em] text-app-text">Hi</h1><p className="mt-1 text-[14px] text-app-text">PRIVATE PARTY</p><p className="mt-5 flex items-center justify-between text-[16px] font-semibold text-app-text">@rahulxkumar <b className="rounded-full bg-[#dba900] px-4 py-2 text-[13px] text-white">Coffee Break</b></p><div className="mt-5 grid grid-cols-2 overflow-hidden rounded-[10px] border border-[#444] text-[13px] text-app-text"><span className="border-b border-[#444] p-3.5">2:41 PM -</span><span className="border-b border-l border-[#444] p-3.5">03/10/26 -</span><p className="col-span-full m-0 p-3.5 leading-[1.45]">K2 Resto Lounge (Dine Out Cafe And Restaurant Bhopal), Kahjuri Sadak, Kol...</p></div></div><ActionButton onClick={() => setIsGateOpen(true)}>Join</ActionButton></div></section>
    <nav className="mt-auto flex justify-around pt-6 text-[12px] text-app-muted" aria-label="Decorative navigation"><span>Home</span><span>Discover</span><span>Profile</span></nav>
  </div>
  {isGateOpen && <BottomSheet title="You need an account" onClose={() => setIsGateOpen(false)}><p className="text-[15px] leading-[1.7] text-app-muted">Join the room, save your spots, and keep the good nights coming.</p><ActionButton onClick={() => navigate('/signup/email')}>Get started</ActionButton><ActionButton variant="secondary" onClick={() => setIsGateOpen(false)}>Maybe later</ActionButton></BottomSheet>}
  </main>
}
