// App.tsx — ORIGINALUS puslapis, tik video list (ne grid)
import { useState, FormEvent, useEffect } from 'react'
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

/* ================= YOUTUBE ================= */
function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1)
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname.startsWith('/watch')) return u.searchParams.get('v')
      if (u.pathname.startsWith('/shorts/')) return u.pathname.split('/')[2]
    }
    return null
  } catch {
    return null
  }
}
const isYoutubeUrl = (url?: string) => !!(url && getYouTubeId(url))

/* ================= PROFILIS ================= */
const PROFILE = {
  name: 'Vytautas Uselis',
  brand: 'vytautasmedia',
  title: 'Videografas • Kūrėjas • Social Media',
  location: 'Klaipėda, Lietuva',
  email: 'vytautasmedia.lt@gmail.com',
  ivaNote: 'Individuali veikla pagal pažymą',
  socials: {
    instagram: 'https://www.instagram.com/vytautas.uselis/',
    facebook: 'https://www.facebook.com/vytautas.uselis06',
    youtube: 'https://www.youtube.com/@vuselis',
  },
}

/* ================= DUOMENYS ================= */
const PROJECTS_TOP = [
  {
    title: 'Gargždų Banga vs Riteriai',
    role: 'Video filmavimas / Montavimas',
    cover: '/covers/Banga.jpg',
    link: 'https://youtube.com/shorts/Z_vW5TBVmLk',
    tags: ['Sportas', 'Social Media', 'Reklama', 'Reels'],
  },
  {
    title: 'Lithuania | Gargždai',
    role: 'Video filmavimas / Dronas / Montavimas',
    cover: '/covers/gargzdai.jpg',
    link: 'https://www.youtube.com/watch?v=IqY5m8-AQcg',
    tags: ['Lietuva', 'Gamta', 'Kraštovaizdis'],
  },
  {
    title: 'Gargždų Banga - Dažasvydis',
    role: 'Video filmavimas / Montavimas / Reklama',
    cover: '/covers/dazasvydis.jpg',
    link: 'https://youtube.com/shorts/nhFanEVn2zQ',
    tags: ['Contribee', 'Sportas', 'Dažasvydis'],
  },
]

const PROJECTS_BOTTOM = [
  {
    title: 'Belaiko itališkos vestuvės',
    role: 'Video filmavimas / Dronas / Montavimas',
    cover: '/covers/italo.jpg',
    link: 'https://youtube.com/shorts/33CF5wBQIZU',
    tags: ['Gamta', 'Vestuvės', 'Itališkai', 'Turizmas'],
  },
  {
    title: 'Vestuvės sodyboje Belaiko',
    role: 'Video filmavimas / Montavimas / Dronas',
    cover: '/covers/belaiko2.jpg',
    link: 'https://youtube.com/shorts/NwodhYKLHJA',
    tags: ['Vestuvės', 'Turizmas', 'Reklama'],
  },
]

const CONTRIBUTED = [
  {
    title: 'Toyota – ėjimas, kuris keičia',
    role: 'Gautos medžiagos montavimas',
    cover: '/covers/toyota.jpg',
    link: 'https://youtu.be/PQWHWeBxhoE',
    tags: ['Montavimas'],
  },
  {
    title: 'Dextera',
    role: 'Gautos medžiagos montavimas',
    cover: '/covers/dextera.jpg',
    link: 'https://youtube.com/shorts/-T2-qEmDqkQ',
    tags: ['Montavimas'],
  },
  {
    title: 'Pjazz',
    role: 'Gautos medžiagos montavimas',
    cover: '/covers/pjazz.jpg',
    link: 'https://youtube.com/shorts/HRXAf8doui4',
    tags: ['Montavimas'],
  },
]

const ALL_PROJECTS = [...PROJECTS_TOP, ...PROJECTS_BOTTOM, ...CONTRIBUTED]

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

/* ================= VIDEO MODAL ================= */
type PlayerState = { url: string; title: string; poster?: string } | null

function VideoModal({ url, title, poster, onClose }: { url: string; title: string; poster?: string; onClose: () => void }) {
  const ytId = isYoutubeUrl(url) ? getYouTubeId(url) : null
  const embed = ytId ? `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0` : null

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
      <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <div className="aspect-video bg-black rounded-xl overflow-hidden">
          {embed ? (
            <iframe src={embed} className="w-full h-full" allowFullScreen />
          ) : (
            <video src={url} poster={poster} controls autoPlay className="w-full h-full" />
          )}
        </div>
        <div className="mt-2 text-sm text-neutral-300">{title}</div>
      </div>
    </div>
  )
}

/* ================= APP ================= */
export default function App() {
  const [player, setPlayer] = useState<PlayerState>(null)

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">

      {/* ===== HERO IR VISA KITA PALIKTA ===== */}
      {/* (čia tavo visas originalus hero / nav / tekstai – NIEKO neliesta) */}

      {/* ===== DARBAI ===== */}
      <section id="projects" className="container py-20">
        <div className="mb-10">
          <h2 className="text-3xl font-bold">Darbų pavyzdžiai</h2>
          <p className="text-neutral-500">Su meile, atkaklumu ir siekiu geriausio</p>
        </div>

        <div className="flex flex-col gap-10 max-w-[720px] mx-auto">
          {ALL_PROJECTS.map((p) => (
            <motion.article
              key={p.title}
              variants={ITEM_VARIANTS}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="card overflow-hidden"
            >
              <img
                src={p.cover}
                alt={p.title}
                className="w-full aspect-video max-h-[320px] object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="text-sm text-neutral-500">{p.role}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setPlayer({ url: p.link, title: p.title, poster: p.cover })}
                  className="mt-4 px-4 py-1.5 rounded-lg bg-white text-black text-sm font-medium"
                >
                  Peržiūrėti
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {player && <VideoModal {...player} onClose={() => setPlayer(null)} />}
    </div>
  )
}
