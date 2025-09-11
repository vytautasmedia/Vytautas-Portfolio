// App.tsx — be telefono ir banko informacijos, su kinematografiniu fonu

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Textarea } from './components/ui/textarea'
import {
  Video as VideoIcon,
  BadgeCheck,
  Mail,
  MapPin,
  Sun,
  Moon,
  Instagram,
  Facebook,
  Youtube,
  Rocket,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Monitor,
  FileText,
} from 'lucide-react'

/* ============================
   Pagalbinės funkcijos (YouTube)
   ============================ */
function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1) || null
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname.startsWith('/watch')) return u.searchParams.get('v')
      if (u.pathname.startsWith('/shorts/')) return u.pathname.split('/')[2] || null
      if (u.pathname.startsWith('/embed/')) return u.pathname.split('/')[2] || null
    }
    return null
  } catch {
    return null
  }
}
const isYoutubeUrl = (url?: string) => !!(url && getYouTubeId(url))

/* ============================
   Pagrindinė informacija
   ============================ */
const PROFILE = {
  name: 'Vytautas Uselis',
  brand: 'vytautasmedia',
  title: 'Videografas • Kūrėjas • Social Media',
  location: 'Klaipėda, Lietuva',
  email: 'vytautasmedia.lt@gmail.com',
  ivaNote: 'Individuali veikla pagal pažymą',
  cvUrl: '#',
  socials: {
    instagram: 'https://www.instagram.com/_vytautasmedia/',
    facebook: 'https://www.facebook.com/vytautas.uselis06',
    youtube: 'https://www.youtube.com/@vuselis',
  },
}

/* ============================
   Projektai
   ============================ */
const PROJECTS_TOP = [
  {
    title: 'Gargždų Banga vs Riteriai',
    role: 'Video filmavimas / Montavimas',
    cover: '/covers/bangariteriai.jpg',
    link: 'https://youtube.com/shorts/Z_vW5TBVmLk',
    tags: ['Sportas', 'Social Media', 'Reklama', 'Reels'],
  },
  {
    title: 'Lithuania | Gargždai',
    role: 'Video filmavimas / Dronas / Montavimas',
    cover: '/covers/grg.jpg',
    link: 'https://www.youtube.com/watch?v=IqY5m8-AQcg',
    tags: ['Lietuva', 'Gamta', 'Kraštovaizdis'],
  },
  {
    title: 'Gargždų Banga - Dažasvydis',
    role: 'Video filmavimas / Montavimas / Reklama',
    cover: '/covers/banga.jpg',
    link: 'https://youtube.com/shorts/nhFanEVn2zQ',
    tags: ['Contribee', 'Sportas', 'Dažasvydis'],
  },
]
const PROJECTS_BOTTOM = [
  {
    title: 'Belaiko itališkos vestuvės',
    role: 'Video filmavimas / Dronas / Montavimas',
    cover: '/covers/belaiko.jpg',
    link: 'https://youtube.com/shorts/33CF5wBQIZU',
    tags: ['Gamta', 'Vestuvės', 'Itališkai', 'Turizmas'],
  },
  {
    title: 'Purlés profesionalų kosmetikos linija',
    role: 'Video filmavimas / Montavimas / Produktų reklama',
    cover: '/covers/purles.jpg',
    link: 'https://youtube.com/shorts/VNsLseKWxC0',
    tags: ['Purlés kosmetika', 'Profesionalumas', 'Reklama'],
  },
  {
    title: 'Interviu su gydytoju',
    role: 'Video filmavimas / Montavimas / Subtitrai',
    cover: '/covers/dziugelis.jpg',
    link: 'https://youtube.com/shorts/YXkr9E3q6GE',
    tags: ['Sveikatingumas', 'Reklama', 'Profesionalumas'],
  },
]
const CONTRIBUTED = [
  {
    title: 'Toyota – ėjimas, kuris keičia',
    role: 'Kitų filmuotos medžiagos montavimas',
    cover: '/covers/toyota.jpg',
    link: 'https://youtu.be/PQWHWeBxhoE',
    tags: ['Montavimas'],
  },
  {
    title: 'Dextera',
    role: 'Kitų filmuotos medžiagos montavimas',
    cover: '/covers/dextera.jpg',
    link: 'https://youtube.com/shorts/-T2-qEmDqkQ',
    tags: ['Montavimas'],
  },
  {
    title: 'Pjazz',
    role: 'Kitų filmuotos medžiagos montavimas',
    cover: '/covers/pjazz.jpg',
    link: 'https://youtube.com/shorts/HRXAf8doui4',
    tags: ['Montavimas'],
  },
]

/* ============================
   Paslaugos
   ============================ */
const SERVICES = [
  {
    icon: <VideoIcon className="h-6 w-6" />,
    name: 'Video produkcija',
    bullets: [
      'Reklaminiai klipai, aftermovie',
      'Interviu, social media turinys',
      'Produktų video, subtitrai, turizmas',
    ],
    price: 'Kaina pagal susitarimą',
  },
  {
    icon: <Monitor className="h-6 w-6" />,
    name: 'Video montavimas',
    bullets: ['Jūsų filmuotos video medžiagos montavimas', 'Spalvų korekcija, garsas', 'Subtitrai'],
    price: 'Kaina pagal susitarimą',
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    name: 'Drono paslaugos',
    bullets: ['Filmavimas iš oro (4K)', 'Renginiai, NT', 'Sportas'],
    price: 'Kaina pagal susitarimą',
  },
]
const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

/* ============================
   Video modalas
   ============================ */
type PlayerState = { url: string; title: string; poster?: string } | null
function VideoModal({ url, title, poster, onClose }: PlayerState & { onClose: () => void }) {
  const ytId = isYoutubeUrl(url) ? getYouTubeId(url!) : null
  const embed = ytId
    ? `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
    : null
  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-10 right-0 rounded-lg border border-white/20 px-3 py-1 text-sm text-white hover:bg-white/10">✕</button>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
          <div className="aspect-video w-full">
            {embed ? (
              <iframe src={embed} className="w-full h-full" title={title!} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
            ) : (
              <video src={url!} poster={poster} controls playsInline autoPlay className="w-full h-full" />
            )}
          </div>
          <div className="px-4 py-3 text-sm text-neutral-200">{title}</div>
        </div>
      </div>
    </div>
  )
}

/* ============================
   App
   ============================ */
export default function App() {
  const [dark, setDark] = useState(true)
  const [player, setPlayer] = useState<PlayerState>(null)
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mgvldgjb'
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'succeeded' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormStatus('submitting')
    try {
      const data = new FormData(e.currentTarget)
      const res = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: data })
      if (res.ok) { setFormStatus('succeeded'); e.currentTarget.reset() }
      else setFormStatus('error')
    } catch { setFormStatus('error') }
  }

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="theme min-h-screen transition-colors relative">
        {/* Cinematic background overlay */}
        <div className="absolute inset-0 bg-gradient-to-bl from-white via-gray-50 to-gray-200 dark:from-neutral-900 dark:via-black dark:to-neutral-950" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_70%,rgba(0,0,0,0.25)_100%)]" />

        {/* CONTENT */}
        <div className="relative z-10">
          {/* NAV */}
          <header className="sticky top-0 z-40 border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 backdrop-blur">
            <div className="container py-3 flex items-center justify-between">
              <a href="#hero" className="flex items-center gap-2 font-semibold">
                <div className="h-8 w-8 rounded-2xl border border-black/10 dark:border-white/10 flex items-center justify-center">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span>{PROFILE.brand}</span>
              </a>
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <a href="#projects" className="hover:underline">Darbai</a>
                <a href="#services" className="hover:underline">Paslaugos</a>
                <a href="#about" className="hover:underline">Apie</a>
                <a href="#contact" className="hover:underline">Kontaktai</a>
              </nav>
              <div className="flex items-center gap-2">
                <button onClick={() => setDark(!dark)} className="btn">
                  {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                <a href="#contact" className="btn btn-primary hidden sm:inline-flex">
                  Siųsti užklausą <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </header>

          {/* HERO */}
          <section id="hero" className="border-b border-black/10 dark:border-white/10">
            <div className="container py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight">{PROFILE.name}</h1>
                <p className="mt-2 text-lg text-neutral-500 dark:text-neutral-400">{PROFILE.title}</p>
                <p className="mt-4 text-base text-neutral-600 dark:text-neutral-300">Kuriu aiškias, estetiškas ir jausmų kupinas istorijas</p>
                <p className="mt-2 text-base text-neutral-600 dark:text-neutral-300">Siūlau kūrybinių idėjų realizaciją pagal Jūsų norus</p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a href="#projects" className="btn btn-primary">Peržiūrėti darbus <ArrowRight className="ml-1 h-4 w-4" /></a>
                  <a href="#contact" className="btn"><Mail className="mr-2 h-4 w-4" /> Susisiekite su manimi</a>
                </div>
                <div className="mt-6 space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {PROFILE.location}</div>
                    <div className="flex items-center gap-1"><Mail className="h-4 w-4" /> <a href={`mailto:${PROFILE.email}`} className="underline">{PROFILE.email}</a></div>
                  </div>
                  <div className="flex items-center gap-1"><FileText className="h-4 w-4" /> {PROFILE.ivaNote}</div>
                  <div className="pt-1 flex items-center gap-3">
                    <a href={PROFILE.socials.instagram}><Instagram className="h-5 w-5" /></a>
                    <a href={PROFILE.socials.facebook}><Facebook className="h-5 w-5" /></a>
                    <a href={PROFILE.socials.youtube}><Youtube className="h-5 w-5" /></a>
                  </div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl border border-black/10 dark:border-white/10">
                  <img src="/covers/vmlogo.jpg" alt="Portfolio hero" className="h-full w-full object-cover" />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Čia likusios sekcijos (projects, services, about, contact, footer) — jos nesikeičia, tik fono efektas veikia visą puslapį */}
        </div>
      </div>
    </div>
  )
}
