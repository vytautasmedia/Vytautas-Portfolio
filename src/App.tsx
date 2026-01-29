// App.tsx — stabilus variantas, VISKAS kaip buvo, tik video eina vienas po kito
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
    instagram: 'https://www.instagram.com/vytautas.uselis/',
    facebook: 'https://www.facebook.com/vytautas.uselis06',
    youtube: 'https://www.youtube.com/@vuselis',
  },
}

const CLIENT_POINTS: string[] = []

/* ============== Projektai ============== */
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
  {
    title: 'Toolrenta | Pastolių montavimas ',
    role: 'Video filmavimas / Montavimas / Dronas',
    cover: '/covers/toolrenta.jpg',
    link: 'https://youtube.com/shorts/15TzXgtX9vU',
    tags: ['Statybos', 'Reklama', 'Pastolių montavimas'],
  },
  {
    title: 'Medinės santvaros - paprastai ir suprantamai',
    role: 'Video filmavimas / Montavimas',
    cover: '/covers/samatele.jpg',
    link: 'https://www.youtube.com/watch?v=9JVT4aP3R74',
    tags: ['Statybos', 'Renginys', '10 Pokalbių laidų'],
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
  {
    title: 'DPC Klausimanija',
    role: 'Gautos medžiagos montavimas',
    cover: '/covers/dpc.jpg',
    link: 'https://youtube.com/shorts/2gPyo_n2TbU',
    tags: ['Montavimas'],
  },
]

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
        <button onClick={onClose} className="absolute -top-10 right-0 rounded-lg border border-white/20 px-3 py-1 text-sm text-white">
          Užverti ✕
        </button>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
          <div className="aspect-video w-full">
            {embed ? (
              <iframe src={embed} className="w-full h-full" allowFullScreen />
            ) : (
              <video src={url} poster={poster} controls autoPlay className="w-full h-full" />
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
  const [player, setPlayer] = useState<PlayerState>(null)

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      {/* ===== PROJECTS ===== */}
      <section id="projects" className="container py-16">
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {[...PROJECTS_TOP, ...PROJECTS_BOTTOM, ...CONTRIBUTED].map((p) => (
            <motion.div key={p.title} variants={ITEM_VARIANTS} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              <div className="card overflow-hidden">
                <div className="relative">
                  <img src={p.cover} alt={p.title} className="aspect-video w-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="text-sm text-neutral-500">{p.role}</p>
                  <button onClick={() => setPlayer({ url: p.link, title: p.title, poster: p.cover })} className="mt-3 px-3 py-1 bg-white text-black rounded">
                    Peržiūrėti
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {player && <VideoModal {...player} onClose={() => setPlayer(null)} />}
    </div>
  )
}
