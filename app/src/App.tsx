import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { StepGuard } from './components/StepGuard'
import { AgePage, InfoPage, InvitePage, OtpPage, PronounsPage, SuccessPage } from './pages/SignupPagesDirect'
import { EmailPage } from './pages/EmailPage'
import { FeedPage } from './pages/FeedPage'
import { SplashPage } from './pages/SplashPage'
import { TermsPage } from './pages/TermsPage'

export default function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<SplashPage />} />
    <Route path="/terms" element={<TermsPage />} />
    <Route path="/feed" element={<FeedPage />} />
    <Route path="/signup/email" element={<EmailPage />} />
    <Route path="/signup/verify" element={<StepGuard requiredStep={2}><OtpPage /></StepGuard>} />
    <Route path="/signup/username" element={<StepGuard requiredStep={3}><InfoPage title="Create a username that fits your vibe!" fieldLabel="Username" helperText="All your Superlatives and Invites will come your way with this name, so make it unforgettable!" next="/signup/name" back="/signup/verify" valueKey="username" /></StepGuard>} />
    <Route path="/signup/name" element={<StepGuard requiredStep={4}><InfoPage title={'Name, please, for the party check!'} fieldLabel="Name" helperText="This is the name shown as on members and requests. Cannot be changed later." next="/signup/age" back="/signup/username" valueKey="displayName" /></StepGuard>} />
    <Route path="/signup/age" element={<StepGuard requiredStep={5}><AgePage /></StepGuard>} />
    <Route path="/signup/pronouns" element={<StepGuard requiredStep={6}><PronounsPage /></StepGuard>} />
    <Route path="/signup/invite" element={<StepGuard requiredStep={7}><InvitePage /></StepGuard>} />
    <Route path="/signup/success" element={<StepGuard requiredStep={8}><SuccessPage /></StepGuard>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></BrowserRouter>
}
