import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './components/ui/card'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Textarea } from './components/ui/textarea'
import {
  Camera, Video, BadgeCheck, Mail, MapPin, Sun, Moon,
  Instagram, Facebook, Youtube, Download, Rocket, Sparkles, Palette,
  ArrowRight, ChevronRight
} from 'lucide-react'

const PROFILE = {
  name: 'Vytautas Uselis',
  brand: 'vytautasmedia',
  title: 'Videografas • Kūrėjas • Social Media',
  location: 'Klaipėda, Lietuva',
  email: 'vytautasmedia.lt@gmail.com',
  cvUrl: '#',
  socials: {
    instagram: 'https://www.instagram.com/_vytautasmedia/',
    facebook: 'https://www.facebook.com/vytautas.uselis06',
    youtube: 'https://www.youtube.com/@vuselis',
  },
}

const PROJECTS = [
  {
    title: 'Gargždų Banga vs Riteriai',
    role: 'Video filmavimas / Montavimas / Reels',
    cover: '/covers/bangariteriai.jpg',
    tags: ['Sportas', 'Social Media', 'Reels'],
    link: 'https://youtube.com/shorts/Z_vW5TBVmLk',
  },
  {
    title: 'GST x Purlés – produktų reklamos',
    role: 'Režisūra / filmavimas / montažas',
    cover: '/covers/purles.jpg',
    tags: ['Beauty', 'Ads', 'UGC'],
    link: '#',
  },
  {
    title: 'Padelio turnyras – aftermovie',
    role: 'Operatorius / montažas',
    cover: '/covers/padelis.jpg',
    tags: ['Sportas', 'Event', 'Storytelling'],
    link: '#',
  },
  {
    title: 'Mažasis verslas – branding video',
    role: 'Idėja / koloritas / garsas',
    cover: '/covers/branding.jpg',
    tags: ['Branding', 'Story', 'YouTube'],
    link: '#',
  },
  {
    title: 'Produktų foto serija',
    role: 'Fotografija / retušas',
    cover: '/covers/produktai.jpg',
    tags: ['Product', 'E-shop', 'Studio'],
    link: '#',
  },
  {
    title: 'Socialinių tinklų klipai',
    role: 'Trumpi formatai / subtitles',
    cover: '/covers/social.jpg',
    tags: ['Reels/TikTok', 'Kampanijos', 'KPI'],
    link: '#',
  },
]

const SERVICES = [
  { icon: <Video className='h-6 w-6' />, name: 'Video produkcija', desc: 'Reklaminiai klipai, aftermovie, interviu, mic\'d up, sporto turinys.', from: 'nuo 250 €' },
  { icon: <Camera className='h-6 w-6' />, name: 'Fotografija', desc: 'Produktų, portretų, renginių ir social media fotosesijos.', from: 'nuo 120 €' },
  { icon: <Rocket className='h-6 w-6' />, name: 'Social Media / Ads', desc: 'Kūryba, filmukai, subtitrai, reklamos maketai, įrašų kalendorius.', from: 'pagal poreikį' },
]

const ITEM_VARIANTS = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }

function openInAppOrWeb(rawUrl: string) {
  if (!rawUrl || rawUrl === '#') return;

  const ua = navigator.userAgent;
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isMobile = isAndroid || isIOS;

  if (!isMobile) {
    window.open(rawUrl, "_blank", "noopener");
    return;
  }

  try {
    const u = new URL(rawUrl);
    const isYT = u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be");
    if (isYT) {
      let id = "";
      if (u.hostname.includes("youtu.be")) id = u.pathname.slice(1);
      else if (u.pathname.startsWith("/watch")) id = u.searchParams.get("v") || "";
      else if (u.pathname.startsWith("/shorts/")) id = u.pathname.split("/")[2] || "";

      if (id) {
        const appLink = isIOS ? `youtube://watch?v=${id}` : `vnd.youtube:${id}`;
        const started = Date.now();
        window.location.href = appLink;
        setTimeout(() => {
          if (Date.now() - started < 1500) {
            window.open(rawUrl, "_blank", "noopener");
          }
        }, 800);
        return;
      }
    }
  } catch {
    // ignore
  }

  window.open(rawUrl, "_blank", "noopener");
}

export default function App() {
  const [dark, setDark] = useState(true)

  return (
    <div className={dark ? 'dark' : ''}>
      <div className='theme min-h-screen transition-colors'>
        {/* NAV */}
        <header className='sticky top-0 z-40 border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 backdrop-blur'>
          <div className='container py-3 flex items-center justify-between'>
            <a href='#hero' className='flex items-center gap-2 font-semibold'>
              <div className='h-8 w-8 rounded-2xl border border-black/10 dark:border-white/10 flex items-center justify-center'>
                <Sparkles className='h-4 w-4' />
              </div>
              <span>{PROFILE.brand}</span>
            </a>
            <nav className='hidden md:flex items-center gap-6 text-sm'>
              <a href='#projects' className='hover:underline'>Darbai</a>
              <a href='#services' className='hover:underline'>Paslaugos</a>
              <a href='#about' className='hover:underline'>Apie</a>
              <a href='#contact' className='hover:underline'>Kontaktai</a>
            </nav>
            <div className='flex items-center gap-2'>
              <button aria-label='Perjungti temą' onClick={() => setDark(!dark)} className='btn'>
                {dark ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
              </button>
              <a href='#contact'><button className='btn btn-primary hidden sm:inline-flex'>Siųsti užklausą <ChevronRight className='ml-1 h-4 w-4' /></button></a>
            </div>
          </div>
        </header>

        {/* HERO */}
        <section id='hero' className='border-b border-black/10 dark:border-white/10'>
          <div className='container py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center'>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className='mt-4 text-4xl md:text-6xl font-bold leading-tight'>{PROFILE.name}</h1>
              <p className='mt-2 text-lg text-neutral-500 dark:text-neutral-400'>{PROFILE.title}</p>
              <p className='mt-4 text-base text-neutral-600 dark:text-neutral-300'>
                Kuriu aiškias, estetiškas ir jausmų kupinas istorijas
              </p>
              <p className='mt-2 text-base text-neutral-600 dark:text-neutral-300'>
                Siūlau kūrybinių idėjų realizaciją pagal jūsų norus
              </p>
              <div className='mt-6 flex flex-wrap items-center gap-3'>
  <a href='#projects'>
    <button className='btn btn-primary'>
      Peržiūrėti darbus <ArrowRight className='ml-1 h-4 w-4' />
    </button>
  </a>

  <a href='#contact'>
    <button className='btn'>
      <Mail className='mr-2 h-4 w-4' />
      Susisiekite su manimi
    </button>
  </a>
</div>
              <div className='mt-6 flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-300'>
                <div className='flex items-center gap-1'><MapPin className='h-4 w-4' /> {PROFILE.location}</div>
                <div className='flex items-center gap-1'><Mail className='h-4 w-4' /> <a href={`mailto:${PROFILE.email}`} className='underline'>{PROFILE.email}</a></div>
              </div>
              <div className='mt-4 flex items-center gap-3'>
                <a href={PROFILE.socials.instagram} target='_blank' rel='noopener noreferrer'><Instagram className='h-5 w-5' /></a>
                <a href={PROFILE.socials.facebook} target='_blank' rel='noopener noreferrer'><Facebook className='h-5 w-5' /></a>
                <a href={PROFILE.socials.youtube} target='_blank' rel='noopener noreferrer'><Youtube className='h-5 w-5' /></a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className='relative'>
              <div className='aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl border border-black/10 dark:border-white/10'>
                <img src='/covers/vmlogo.jpg' alt='Portfolio hero' className='h-full w-full object-cover' />
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id='projects' className='container py-16'>
          <div className='mb-8 flex items-end justify-between'>
            <div>
              <h2 className='text-2xl md:text-3xl font-bold'>Keli iš darbų</h2>
              <p className='text-neutral-600 dark:text-neutral-400'>Su meile, atkaklumu ir siekio geriausio</p>
            </div>
            <a href='#contact' className='text-sm underline-offset-2 hover:underline'>Domina kažkas panašaus ir jus?</a>
          </div>

          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.title}
                variants={ITEM_VARIANTS}
                initial='hidden'
                whileInView='show'
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className='card overflow-hidden'>
                  <div className='relative'>
                    <img src={p.cover} alt={p.title} className='aspect-video w-full object-cover transition-transform duration-300 hover:scale-105' />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
                  </div>
                  <div className='p-5 space-y-1'>
                    <h3 className='text-lg font-semibold'>{p.title}</h3>
                    <p className='text-sm text-neutral-500 dark:text-neutral-400'>{p.role}</p>
                  </div>
                  <div className='px-5 pb-5'>
                    <div className='mb-3 flex flex-wrap gap-2'>
                      {p.tags.map(t => (
                        <span key={t} className='rounded-full border border-black/10 dark:border-white/10 px-2 py-0.5 text-xs text-neutral-600 dark:text-neutral-300'>
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className='flex items-center gap-2'>
                      <button
                        onClick={() => openInAppOrWeb(p.link)}
                        className='px-3 py-1 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition'
                      >
                        Peržiūrėti
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section id='services' className='border-y border-black/10 dark:border-white/10'>
          <div className='container py-16'>
            <div className='mb-8'>
              <h2 className='text-2xl md:text-3xl font-bold'>Paslaugos</h2>
              <p className='text-neutral-600 dark:text-neutral-400'>Lankstūs paketai verslui, sporto klubams ir kūrėjams.</p>
            </div>
            <div className='grid gap-6 md:grid-cols-3'>
              {SERVICES.map((s, i) => (
                <motion.div key={s.name} variants={ITEM_VARIANTS} initial='hidden' whileInView='show' viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                  <div className='card'>
                    <div className='p-5'>
                      <div className='mb-2 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-black/10 dark:border-white/10'>
                        {s.icon}
                      </div>
                      <h3 className='text-lg font-semibold'>{s.name}</h3>
                      <p className='text-sm text-neutral-500 dark:text-neutral-400'>{s.desc}</p>
                    </div>
                    <div className='px-5 pb-5 text-sm text-neutral-600 dark:text-neutral-300'>Kaina {s.from}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id='about' className='container py-16'>
          <div className='grid md:grid-cols-5 gap-8 items-start'>
            <div className='md:col-span-3'>
              <h2 className='text-2xl md:text-3xl font-bold'>Apie mane</h2>
              <p className='mt-3 text-neutral-600 dark:text-neutral-300'>
                Esu {PROFILE.name}, kuriantis turinį {PROFILE.location} regione ir už jo ribų. Dirbu su sporto klubais, grožio salonais ir smulkiais
                verslais – nuo idėjos iki finalinio failo. Man svarbu aiškumas, greitis ir rezultatų matavimas.
              </p>
              <ul className='mt-4 space-y-2 text-sm text-neutral-600 dark:text-neutral-300'>
                <li>• 4K filmavimas, S-Log3/HLG koloritas, švarus garso įrašas</li>
                <li>• Socialinių tinklų paketai: Reels/TikTok/YouTube Shorts</li>
                <li>• Produktų foto ir e-shop vizualai</li>
                <li>• Projekto planas ir grąžinimo terminai iš anksto</li>
              </ul>
            </div>
            <div className='md:col-span-2'>
              <div className='card'>
                <div className='p-5'>
                  <h3 className='text-lg font-semibold'>Kodėl rinktis mane?</h3>
                  <p className='text-sm text-neutral-500 dark:text-neutral-400'>Trumpai apie darbo principus</p>
                </div>
                <div className='px-5 pb-5 space-y-3 text-sm text-neutral-600 dark:text-neutral-300'>
                  <div className='flex items-start gap-3'><Sparkles className='mt-0.5 h-4 w-4' /> Aiškus kūrybinis brifas ir skaidri kaina</div>
                  <div className='flex items-start gap-3'><Rocket className='mt-0.5 h-4 w-4' /> Greitas apsisukimas ir v4/5 pataisų langas</div>
                  <div className='flex items-start gap-3'><BadgeCheck className='mt-0.5 h-4 w-4' /> Fokusas į KPI: peržiūros, CTR, pardavimai</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id='contact' className='container py-16'>
          <div className='mb-8'>
            <h2 className='text-2xl md:text-3xl font-bold'>Kontaktai</h2>
            <p className='text-neutral-600 dark:text-neutral-400'>Paprasčiausia – parašyti laišką arba užpildyti formą.</p>
          </div>

          <div className='grid gap-8 md:grid-cols-5 items-start'>
            <div className='md:col-span-2 card'>
              <div className='p-5'>
                <h3 className='text-lg font-semibold'>{PROFILE.brand}</h3>
                <p className='text-sm text-neutral-500 dark:text-neutral-400'>Susisiekime dėl idėjos ar komercinio projekto</p>
              </div>
              <div className='px-5 pb-5 space-y-4 text-sm text-neutral-600 dark:text-neutral-300'>
                <div className='flex items-center gap-2'><Mail className='h-4 w-4' /> <a href={`mailto:${PROFILE.email}`} className='underline underline-offset-2'>{PROFILE.email}</a></div>
                <div className='flex items-center gap-2'><MapPin className='h-4 w-4' /> {PROFILE.location}</div>
                <div className='flex items-center gap-3 pt-2'>
                  <a href={PROFILE.socials.instagram} target='_blank' rel='noopener noreferrer' className='underline underline-offset-2'>Instagram</a>
                  <a href={PROFILE.socials.facebook} target='_blank' rel='noopener noreferrer' className='underline underline-offset-2'>Facebook</a>
                  <a href={PROFILE.socials.youtube} target='_blank' rel='noopener noreferrer' className='underline underline-offset-2'>YouTube</a>
                </div>
              </div>
            </div>

            <div className='md:col-span-3 card'>
              <div className='p-5'>
                <h3 className='text-lg font-semibold'>Trumpa užklausa</h3>
                <p className='text-sm text-neutral-500 dark:text-neutral-400'>Papasakokite apie projektą – atrašysiu tą pačią dieną.</p>
              </div>
              <div className='px-5 pb-5'>
                <form className='grid gap-4' onSubmit={(e)=>{e.preventDefault(); alert('Ačiū! Forma demonstracinė.')}}>
                  <div className='grid md:grid-cols-2 gap-4'>
                    <Input placeholder='Vardas' required />
                    <Input type='email' placeholder='El. paštas' required />
                  </div>
                  <Input placeholder='Tema (pvz., Produktų klipas)' />
                  <Textarea placeholder='Trumpai apie idėją, formatą, terminą, biudžetą…' rows={5} />
                  <div className='flex items-center justify-between'>
                    <div className='text-xs text-neutral-500 dark:text-neutral-400'>Siunčiant sutinkate su privatumo politika.</div>
                    <Button type='submit'>Siųsti užklausą</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className='border-t border-black/10 dark:border-white/10'>
          <div className='container py-10 text-sm text-neutral-600 dark:text-neutral-300 flex flex-col md:flex-row items-center justify-between gap-3'>
            <div>© {new Date().getFullYear()} {PROFILE.brand}. Visos teisės saugomos.</div>
            <div className='flex items-center gap-4'>
              <a href='#hero' className='underline underline-offset-2'>Į viršų</a>
              <a href={PROFILE.cvUrl} className='underline underline-offset-2'>CV</a>
              <a href='#' className='underline underline-offset-2'>Privatumo politika</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
