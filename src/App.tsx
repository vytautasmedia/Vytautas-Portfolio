// App.tsx — stabilus variantas su informacija + normalus scroll per „prisidėtus darbus“
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

/* ================= YT ================= */
function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1)
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname === '/watch') return u.searchParams.get('v')
      if (u.pathname.startsWith('/shorts/')) return u.pathname.split('/')[2]
    }
    return null
  } catch {
    return null
  }
}
const isYoutubeUrl = (url?: string) => !!(url && getYouTubeId(url))

/* ================= DATA ================= */
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

const PROJECTS_TOP = [ /* PALIKTA TAVO */ ]
const PROJECTS_BOTTOM = [ /* PALIKTA TAVO */ ]

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
  {
    title: 'DPC Klausimanija',
    role: 'Gautos medžiagos montavimas',
    cover: '/covers/dpc.jpg',
    link: 'https://youtube.com/shorts/2gPyo_n2TbU',
    tags: ['Montavimas'],
  },
]

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

/* ================= MODAL ================= */
type PlayerState = { url: string; title: string; poster?: string } | null

function VideoModal({ url, title, poster, onClose }: { url: string; title: string; poster?: string; onClose: () => void }) {
  const yt = isYoutubeUrl(url) ? getYouTubeId(url) : null
  const src = yt ? `https://www.youtube.com/embed/${yt}?autoplay=1` : url

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={onClose}>
      <div className="w-full max-w-4xl bg-black rounded-xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="aspect-video">
          {yt ? (
            <iframe src={src} className="w-full h-full" allowFullScreen />
          ) : (
            <video src={src} poster={poster} controls autoPlay className="w-full h-full" />
          )}
        </div>
        <div className="p-3 text-sm text-neutral-200">{title}</div>
      </div>
    </div>
  )
}

/* ================= APP ================= */
export default function App() {
  const [player, setPlayer] = useState<PlayerState>(null)

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">

      {/* ===== DARBAI PRIE KURIŲ PRISIDĖJAU ===== */}
      <section className="container py-16">
        <div className="mb-8 max-w-2xl">
          <h3 className="text-2xl font-semibold">Darbai prie kurių prisidėjau</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Partnerių filmuotos vaizdinės medžiagos montavimas
          </p>
        </div>

        <div className="space-y-10">
          {CONTRIBUTED.map((p) => (
            <motion.div
              key={p.title}
              variants={ITEM_VARIANTS}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4 }}
              className="card overflow-hidden"
            >
              <div className="grid md:grid-cols-2">
                {/* PREVIEW */}
                <div className="relative h-[240px] md:h-[320px]">
                  <img
                    src={p.cover}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <button
                    onClick={() => setPlayer({ url: p.link, title: p.title, poster: p.cover })}
                    className="absolute inset-0 flex items-center justify-center text-white font-semibold"
                  >
                    ▶ Peržiūrėti
                  </button>
                </div>

                {/* INFO */}
                <div className="p-6 flex flex-col justify-center">
                  <h4 className="text-xl font-semibold">{p.title}</h4>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{p.role}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map(t => (
                      <span key={t} className="text-xs px-2 py-1 rounded-full border">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {player && (
        <VideoModal
          url={player.url}
          title={player.title}
          poster={player.poster}
          onClose={() => setPlayer(null)}
        />
      )}
    </div>
  )
}
