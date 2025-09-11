// App.tsx — stabilus variantas be .theme klasės, su kinematografiniu hero fonu, Formspree integracija
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

/* ============== YouTube helperiai ============== */
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

/* ============== Profilis ============== */
const PROFILE = {
  name: 'Vytautas Uselis',
  brand: 'vytautasmedia',
  title: 'Videografas • Kūrėjas • Social Media',
  location: 'Klaipėda, Lietuva',
  email: 'vytautasmedia.lt@gmail.com',
  ivaNote: 'Individuali veikla pagal pažymą',
  socials: {
    instagram: 'https://www.instagram.com/_vytautasmedia/',
    facebook: 'https://www.facebook.com/vytautas.uselis06',
    youtube: 'https://www.youtube.com/@vuselis',
  },
}

const CLIENT_POINTS = [
]

/* ============== Projektai ============== */
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

/* ============== Paslaugos ============== */
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

/* ============== Video modalas ============== */
type PlayerState = { url: string; title: string; poster?: string } | null

function VideoModal({ url, title, poster, onClose }: { url: string; title: string; poster?: string; onClose: () => void }) {
  const ytId = isYoutubeUrl(url) ? getYouTubeId(url) : null
  const embed = ytId ? `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&playsinline=1` : null

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <button
          aria-label="Užverti vaizdo modalą"
          onClick={onClose}
          className="absolute -top-10 right-0 rounded-lg border border-white/20 px-3 py-1 text-sm text-white hover:bg-white/10"
        >
          Užverti ✕
        </button>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
          <div className="aspect-video w-full">
            {embed ? (
              <iframe src={embed} className="w-full h-full" title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
            ) : (
              <video src={url} poster={poster} controls playsInline autoPlay className="w-full h-full" />
            )}
          </div>
          <div className="px-4 py-3 text-sm text-neutral-200">{title}</div>
        </div>
      </div>
    </div>
  )
}

/* ============== App ============== */
export default function App() {
  // Paleidžiam šviesią temą kaip numatytą (kad neliktų „juodo ekrano“ jei globalūs stiliai tamsūs)
  const [dark, setDark] = useState(false)
  const [player, setPlayer] = useState<PlayerState>(null)

  // Formspree
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mgvldgjb'
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'succeeded' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormStatus('submitting')
    try {
      const form = e.currentTarget
      const data = new FormData(form)
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (res.ok) {
        setFormStatus('succeeded')
        form.reset()
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <div className={dark ? 'dark' : ''}>
      {/* Pašalinam .theme; aiškiai nustatom foną ir tekstą */}
      <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 transition-colors">
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
              <button aria-label="Perjungti temą" onClick={() => setDark(!dark)} className="btn">
                {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <a href="#contact" className="btn btn-primary hidden sm:inline-flex">
                Siųsti užklausą <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </header>

        {/* HERO su kinematografiniu fonu (saugus, be sudėtingų overlay) */}
        <section
          id="hero"
          className="relative overflow-hidden border-b border-black/10 dark:border-white/10
                     bg-gradient-to-bl from-white via-white to-indigo-50
                     dark:from-white/10 dark:via-transparent dark:to-transparent"
        >
          {/* lengva vinjetė apačioje */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 -z-10
                          bg-gradient-to-t from-black/40 to-transparent dark:from-black/60" />
          <div className="container py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight">{PROFILE.name}</h1>
              <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">{PROFILE.title}</p>
              <p className="mt-4 text-base text-neutral-700 dark:text-neutral-300">Kuriu aiškias, estetiškas ir jausmų kupinas istorijas</p>
              <p className="mt-2 text-base text-neutral-700 dark:text-neutral-300">Siūlau kūrybinių idėjų realizaciją pagal Jūsų norus</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#projects" className="btn btn-primary">
                  Peržiūrėti darbus <ArrowRight className="ml-1 h-4 w-4" />
                </a>
                <a href="#contact" className="btn">
                  <Mail className="mr-2 h-4 w-4" /> Susisiekite su manimi
                </a>
              </div>

              {/* Kontaktai (be tel./banko) */}
              <div className="mt-6 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {PROFILE.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" /> <a href={`mailto:${PROFILE.email}`} className="underline">{PROFILE.email}</a>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4" /> <span>{PROFILE.ivaNote}</span>
                  </div>
                </div>
                <div className="pt-1 flex items-center gap-3">
                  <a href={PROFILE.socials.instagram} target="_blank" rel="noopener noreferrer"><Instagram className="h-5 w-5" /></a>
                  <a href={PROFILE.socials.facebook} target="_blank" rel="noopener noreferrer"><Facebook className="h-5 w-5" /></a>
                  <a href={PROFILE.socials.youtube} target="_blank" rel="noopener noreferrer"><Youtube className="h-5 w-5" /></a>
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

        {/* PROJECTS */}
        <section id="projects" className="container py-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Darbų pavyzdžiai</h2>
              <p className="text-neutral-600 dark:text-neutral-400">Su meile, atkaklumu ir siekiu geriausio</p>
            </div>
            <a href="#contact" className="text-sm underline-offset-2 hover:underline">Domina kažkas panašaus ir jus?</a>
          </div>

          {/* Viršutiniai 3 */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {PROJECTS_TOP.map((p, i) => (
              <motion.div key={p.title} variants={ITEM_VARIANTS} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                <div className="card overflow-hidden">
                  <div className="relative">
                    <img src={p.cover} alt={p.title} className="aspect-video w-full object-cover transition-transform duration-300 hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-5 space-y-1">
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{p.role}</p>
                  </div>
                  <div className="px-5 pb-5">
                    <div className="mb-3 flex flex-wrap gap-2">
                      {p.tags.map(t => (
                        <span key={t} className="rounded-full border border-black/10 dark:border-white/10 px-2 py-0.5 text-xs text-neutral-600 dark:text-neutral-300">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setPlayer({ url: p.link, title: p.title, poster: p.cover })} className="px-3 py-1 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition">Peržiūrėti</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Apatiniai 3 */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS_BOTTOM.map((p, i) => (
              <motion.div key={p.title} variants={ITEM_VARIANTS} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                <div className="card overflow-hidden">
                  <div className="relative">
                    <img src={p.cover} alt={p.title} className="aspect-video w-full object-cover transition-transform duration-300 hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-5 space-y-1">
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{p.role}</p>
                  </div>
                  <div className="px-5 pb-5">
                    <div className="mb-3 flex flex-wrap gap-2">
                      {p.tags.map(t => (
                        <span key={t} className="rounded-full border border-black/10 dark:border-white/10 px-2 py-0.5 text-xs text-neutral-600 dark:text-neutral-300">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setPlayer({ url: p.link, title: p.title, poster: p.cover })} className="px-3 py-1 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition">Peržiūrėti</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* DARBAI PRIE KURIŲ PRISIDĖJAU */}
        <section className="container py-12">
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-semibold">Darbai prie kurių prisidėjau</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Partnerių filmuotos vaizdinės medžiagos montavimas</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CONTRIBUTED.map((p, i) => (
              <motion.div key={p.title} variants={ITEM_VARIANTS} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                <div className="card overflow-hidden">
                  <div className="relative">
                    <img src={p.cover} alt={p.title} className="aspect-video w-full object-cover transition-transform duration-300 hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-5 space-y-1">
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{p.role}</p>
                  </div>
                  <div className="px-5 pb-5">
                    <div className="mb-3 flex flex-wrap gap-2">
                      {p.tags.map(t => (
                        <span key={t} className="rounded-full border border-black/10 dark:border-white/10 px-2 py-0.5 text-xs text-neutral-600 dark:text-neutral-300">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setPlayer({ url: p.link, title: p.title, poster: p.cover })} className="px-3 py-1 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition">Peržiūrėti</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PASLAUGOS */}
        <section id="services" className="border-y border-black/10 dark:border-white/10">
          <div className="container py-16">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Paslaugos</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {SERVICES.map((s, i) => (
                <motion.div key={s.name} variants={ITEM_VARIANTS} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                  <div className="card h-full">
                    <div className="p-5 flex h-full flex-col">
                      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-black/10 dark:border-white/10">
                        {s.icon}
                      </div>
                      <h3 className="text-lg font-semibold">{s.name}</h3>
                      <ul className="mt-2 space-y-1 text-sm text-neutral-500 dark:text-neutral-400">
                        {s.bullets.map((b) => (
                          <li key={b} className="leading-relaxed">• {b}</li>
                        ))}
                      </ul>
                      <div className="mt-auto pt-4">
                        <span className="inline-flex items-center rounded-full border border-black/10 dark:border-white/10 px-3 py-1 text-xs font-medium tracking-wide text-neutral-700 dark:text-neutral-200">
                          {s.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="container py-16">
          <div className="grid md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-3">
              <h2 className="text-2xl md:text-3xl font-bold">Apie mane</h2>
              <div className="mt-3 text-neutral-700 dark:text-neutral-300 space-y-2">
                <p>Esu Vytautas Uselis, kuriantis turinį Klaipėdoje ir už jos ribų.</p>
                <p>Kuriu vaizdinį turinį susijusį su įvairiais klientais.</p>
                <p>Galiu pasiūlyti tiek idėją, tiek jos įgyvendinimą iki finalinio etapo.</p>
                <p>Man svarbus aiškumas, rezultatas ir klientas.</p>
                <p>Darbą atlieku greitai ir kokybiškai.</p>
              </div>

              <div className="mt-6 text-xl font-semibold">
                <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                  Turi idėją, bet nežinai kaip ją įgyvendinti?
                </span>
                <span className="block text-neutral-800 dark:text-neutral-200">
                  Susisiek – kartu sukursime ką nors nerealaus.
                </span>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="card">
                <div className="p-5">
                  <h3 className="text-lg font-semibold">Kodėl rinktis mane?</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Trumpai apie darbo principus</p>
                </div>
                <div className="px-5 pb-5 space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
                  <div className="flex items-start gap-3"><Sparkles className="mt-0.5 h-4 w-4" /> Aiškus kūrybinis sprendimas ir logiška kaina</div>
                  <div className="flex items-start gap-3"><Rocket className="mt-0.5 h-4 w-4" /> Kokybės užtvirtinimas ir tenkinantis rezultatas</div>
                  <div className="flex items-start gap-3"><BadgeCheck className="mt-0.5 h-4 w-4" /> Fokusas į peržiūras, pardavimus, susidomėjimą</div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-black/10 dark:border-white/10 p-4 text-sm text-neutral-600 dark:text-neutral-300">
                <p className="font-semibold text-neutral-900 dark:text-neutral-200">Dirbu su fiziniais ir juridiniais asmenimis</p>
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  {CLIENT_POINTS.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="container py-16">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Kontaktai</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-5 items-start">
            <div className="md:col-span-2 card">
              <div className="p-5">
                <h3 className="text-lg font-semibold">{PROFILE.brand}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Susisiekite su manimi dėl idėjos realizacijos</p>
              </div>
              <div className="px-5 pb-5 space-y-4 text-sm text-neutral-700 dark:text-neutral-300">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${PROFILE.email}`} className="underline underline-offset-2">{PROFILE.email}</a>
                </div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {PROFILE.location}</div>
                <div className="flex items-center gap-2"><FileText className="h-4 w-4" /> {PROFILE.ivaNote}</div>
                <div className="flex items-center gap-3 pt-2">
                  <a href={PROFILE.socials.instagram} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Instagram</a>
                  <a href={PROFILE.socials.facebook} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Facebook</a>
                  <a href={PROFILE.socials.youtube} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">YouTube</a>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 card">
              <div className="p-5">
                <h3 className="text-lg font-semibold">Trumpa užklausa</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Papasakokite kas Jus domina, o aš atrašysiu kaip tik galėdamas greičiau</p>
              </div>
              <div className="px-5 pb-5">
                <form className="grid gap-4" action={FORMSPREE_ENDPOINT} method="POST" onSubmit={handleSubmit}>
                  <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_subject" value="Nauja užklausa — vytautasmedia.lt" />

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input name="name" placeholder="Vardas" required />
                    <Input name="email" type="email" placeholder="El. paštas" required />
                  </div>
                  <Input name="subject" placeholder="Tema (pvz., Drono paslaugos NT)" />
                  <Textarea name="message" placeholder="Trumpai apie idėją, formatą, terminą, biudžetą…" rows={5} required />

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">Siunčiant sutinkate su privatumo politika.</div>
                    <Button type="submit" disabled={formStatus==='submitting'}>
                      {formStatus==='submitting' ? 'Siunčiama…' : formStatus==='succeeded' ? 'Išsiųsta ✓' : 'Siųsti užklausą'}
                    </Button>
                  </div>

                  {formStatus==='succeeded' && (
                    <p className="text-sm mt-2 text-green-600 dark:text-green-400">Ačiū! Jūsų žinutė gauta. Atrašysiu kaip įmanoma greičiau.</p>
                  )}
                  {formStatus==='error' && (
                    <p className="text-sm mt-2 text-red-600 dark:text-red-400">Įvyko klaida. Bandykite dar kartą arba parašykite tiesiogiai el. paštu.</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-black/10 dark:border-white/10">
          <div className="container py-10 text-sm text-neutral-600 dark:text-neutral-300 flex flex-col md:flex-row items-center justify-between gap-3">
            <div>© {new Date().getFullYear()} {PROFILE.brand}. Visos teisės saugomos.</div>
            <div className="flex items-center gap-4">
              <a href="#hero" className="underline underline-offset-2">Į viršų</a>
              <Link to="/privatumo-politika" className="underline underline-offset-2">Privatumo politika</Link>
            </div>
          </div>
        </footer>

        {/* VIDEO MODALAS */}
        {player && (
          <VideoModal url={player.url} title={player.title} poster={player.poster} onClose={() => setPlayer(null)} />
        )}
      </div>
    </div>
  )
}
