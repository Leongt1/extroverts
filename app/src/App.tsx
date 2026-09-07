import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { StepGuard } from './components/wizard/StepGuard'
import { FeedPage } from './pages/FeedPage'
import { SplashPage } from './pages/SplashPage'
import { TermsPage } from './pages/TermsPage'
import { WIZARD_ROUTES } from './wizard/routes'
import { ROUTES } from './wizard/steps'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.splash} element={<SplashPage />} />
        <Route path={ROUTES.terms} element={<TermsPage />} />
        <Route path={ROUTES.feed} element={<FeedPage />} />

        {WIZARD_ROUTES.map(({ path, step, element }) => (
          <Route key={path} path={path} element={<StepGuard step={step}>{element}</StepGuard>} />
        ))}

        <Route path="*" element={<Navigate to={ROUTES.splash} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
