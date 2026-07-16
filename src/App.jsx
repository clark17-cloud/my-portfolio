import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

import profilePic from './assets/profile.jpg'
import faslhPic from './assets/flash.jpg'
import intheloopPic from './assets/intheloop.jpg'
import codePic from './assets/code.jpg'

const projects = [
  { number: '01', type: 'Mobile UI', title: 'Faslh Express', image: faslhPic },
  { number: '02', type: 'Desktop App', title: 'Java Arcade', image: codePic },
  { number: '03', type: 'Film Poster', title: 'In The Loop', image: intheloopPic },
]

const principles = [
  ['01', 'Clarity', 'I design clear paths and information hierarchy, so every screen feels easy to understand and use.'],
  ['02', 'Craft', 'Thoughtful details, responsive layouts, and polished visual systems shape each digital experience.'],
  ['03', 'Purpose', 'Every design choice supports a real goal: helping people connect with a product, idea, or story.'],
]

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: 'easeOut' },
}

function GalaxyCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frame
    let width = 0
    let height = 0
    let particles = []
    const pointer = { x: 0, y: 0 }

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const density = Math.min(window.devicePixelRatio || 1, 2)
      width = bounds.width
      height = bounds.height
      canvas.width = width * density
      canvas.height = height * density
      context.setTransform(density, 0, 0, density, 0, 0)
      const radius = Math.min(width, height) * 0.46
      particles = Array.from({ length: Math.max(420, Math.floor(width / 2)) }, (_, index) => {
        const distance = Math.pow(Math.random(), 0.58) * radius
        const arm = (index % 3) * ((Math.PI * 2) / 3)
        return {
          distance,
          angle: arm + distance * 0.012 + (Math.random() - 0.5) * 0.48,
          size: Math.random() * 1.5 + 0.25,
          alpha: Math.random() * 0.75 + 0.15,
          speed: (0.00008 + Math.random() * 0.00018) * (1.3 - distance / radius),
        }
      })
    }

    const onMove = (event) => {
      const bounds = canvas.getBoundingClientRect()
      pointer.x = (event.clientX - bounds.left - width / 2) * 0.018
      pointer.y = (event.clientY - bounds.top - height / 2) * 0.018
    }

    const draw = (time) => {
      context.clearRect(0, 0, width, height)
      const centerX = width / 2 + pointer.x
      const centerY = height / 2 + pointer.y
      const glow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.min(width, height) * 0.42)
      glow.addColorStop(0, 'rgba(255,255,255,0.2)')
      glow.addColorStop(0.13, 'rgba(210,220,255,0.075)')
      glow.addColorStop(1, 'rgba(0,0,0,0)')
      context.fillStyle = glow
      context.fillRect(0, 0, width, height)

      particles.forEach((particle) => {
        const angle = particle.angle + time * particle.speed
        const x = centerX + Math.cos(angle) * particle.distance * 1.25
        const y = centerY + Math.sin(angle) * particle.distance * 0.42
        context.fillStyle = `rgba(245, 243, 238, ${particle.alpha})`
        context.fillRect(x, y, particle.size, particle.size)
      })
      frame = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    frame = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-80" aria-hidden="true" />
}

export default function App() {
  const [sent, setSent] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSent(true)
    event.currentTarget.reset()
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#080808] text-[#f2f0eb] selection:bg-[#f2f0eb] selection:text-black">
      <div className="pointer-events-none fixed inset-0 opacity-70 [background-image:radial-gradient(circle_at_20%_15%,rgba(255,255,255,.13)_0,transparent_1px),radial-gradient(circle_at_72%_28%,rgba(255,255,255,.09)_0,transparent_1px),radial-gradient(circle_at_45%_78%,rgba(255,255,255,.12)_0,transparent_1px)] [background-size:190px_190px,260px_260px,320px_320px]" />

      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-[#080808]/95 px-5 py-5 text-[10px] uppercase tracking-[0.2em] md:px-10">
        <a href="#top" className="font-semibold tracking-[0.14em]">Julian Clark</a>
        <nav className="flex gap-5 text-white/55 md:gap-8">
          <a className="transition hover:text-white" href="#work">Work</a>
          <a className="transition hover:text-white" href="#about">About</a>
          <a className="transition hover:text-white" href="#contact">Contact</a>
        </nav>
      </header>

      <section id="top" className="relative z-10 flex min-h-[calc(100vh-64px)] flex-col items-center justify-center overflow-hidden px-5 text-center">
        <GalaxyCanvas />
        <motion.p {...reveal} className="relative mb-6 text-[10px] uppercase tracking-[0.32em] text-white/55">UI/UX Designer</motion.p>
        <motion.h1 {...reveal} transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }} className="relative max-w-5xl text-[16vw] font-light leading-[0.78] tracking-[-0.09em] md:text-[11vw]">
          Orbiting<br />Ideas
        </motion.h1>
        <motion.div {...reveal} transition={{ duration: 0.7, delay: 0.25 }} className="relative mt-10 flex w-full max-w-5xl items-end pt-4 text-left text-[10px] uppercase tracking-[0.18em] text-white/60">
          <span>Digital experiences<br />& visual identity</span>
          <a href="#work" className="absolute left-1/2 top-4 -translate-x-1/2 text-center text-white/60 transition hover:text-white">Scroll to explore<br />↓</a>
        </motion.div>
      </section>

      <section id="work" className="relative z-10 px-5 py-24 md:px-10 md:py-32">
        <motion.div {...reveal} className="mb-14 flex items-end justify-between">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/50">Selected work</p>
            <h2 className="text-4xl font-light tracking-[-0.06em] md:text-6xl">Ideas made tangible.</h2>
          </div>
          <span className="hidden text-[10px] uppercase tracking-[0.2em] text-white/45 md:block">2024 — 2026</span>
        </motion.div>
        <div className="grid gap-px overflow-hidden border border-white/15 bg-white/15 md:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article {...reveal} transition={{ duration: 0.65, delay: index * 0.1 }} key={project.number} className="group bg-[#080808] p-4">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#171717]">
                <img src={project.image} alt={project.title} className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                <span className="absolute left-3 top-3 bg-black/60 px-2 py-1 text-[10px] tracking-[0.15em] backdrop-blur-sm">{project.number}</span>
              </div>
              <div className="flex items-end justify-between pb-2 pt-5">
                <div><p className="mb-1 text-[10px] uppercase tracking-[0.18em] text-white/45">{project.type}</p><h3 className="text-2xl font-light tracking-[-0.04em]">{project.title}</h3></div>
                <span className="text-white/45 transition group-hover:translate-x-1 group-hover:text-white">↗</span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="about" className="relative z-10 px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-24">
          <motion.div {...reveal}>
            <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/50">About me & principle</p>
            <h2 className="text-5xl font-light leading-none tracking-[-0.07em] md:text-7xl">Designed<br />with intent.</h2>
            <img src={profilePic} alt="Julian Clark" className="mt-10 aspect-square w-full max-w-sm object-cover" />
          </motion.div>
          <motion.div {...reveal} transition={{ duration: 0.7, delay: 0.12 }} className="pt-1">
            <p className="max-w-xl text-xl font-light leading-relaxed text-white/80 md:text-2xl">I’m Julian Clark, a UI/UX designer creating thoughtful interfaces and visual identities that feel modern, useful, and memorable.</p>
            <div className="mt-16 divide-y divide-white/15 border-t border-white/15">
              {principles.map(([number, title, text]) => <div key={number} className="grid gap-4 py-6 sm:grid-cols-[40px_130px_1fr]"><span className="text-[10px] tracking-[0.15em] text-white/40">{number}</span><h3 className="text-lg font-normal">{title}</h3><p className="text-sm leading-relaxed text-white/55">{text}</p></div>)}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="relative z-10 px-5 py-24 md:px-10 md:py-32">
        <motion.div {...reveal} className="mx-auto max-w-3xl">
          <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/50">Contact & connect</p>
          <h2 className="max-w-2xl text-5xl font-light leading-[0.9] tracking-[-0.07em] md:text-7xl">Let’s build something clear and meaningful.</h2>
          <form onSubmit={handleSubmit} className="mt-16 grid gap-7">
            <input required aria-label="Name or company" placeholder="Name / Company" className="border-b border-white/25 bg-transparent py-4 text-lg outline-none placeholder:text-white/40 focus:border-white" />
            <input required type="email" aria-label="Email" placeholder="Email" className="border-b border-white/25 bg-transparent py-4 text-lg outline-none placeholder:text-white/40 focus:border-white" />
            <textarea required aria-label="Message" placeholder="Message" rows="3" className="resize-none border-b border-white/25 bg-transparent py-4 text-lg outline-none placeholder:text-white/40 focus:border-white" />
            <button className="mt-2 flex w-fit items-center gap-8 border border-white px-5 py-3 text-[10px] uppercase tracking-[0.2em] transition hover:bg-white hover:text-black">{sent ? 'Message ready' : 'Send message'} <span>↗</span></button>
          </form>
          <div className="mt-8 flex flex-col gap-5 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>Or email me directly at <a className="text-white underline-offset-4 hover:underline" href="mailto:Julianzclarkz@gmail.com">Julianzclarkz@gmail.com</a>.</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.16em]">
              <a className="text-white/70 transition hover:text-white" href="https://github.com/clark17-cloud" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a className="text-white/70 transition hover:text-white" href="https://www.facebook.com/julianclarkk" target="_blank" rel="noreferrer">Facebook ↗</a>
              <a className="text-white/70 transition hover:text-white" href="https://www.linkedin.com/in/julian-clark-ibarra-33a2a0409" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a className="text-white/70 transition hover:text-white" href="https://www.facebook.com/julianclarkk" target="_blank" rel="noreferrer">Messenger ↗</a>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="relative z-10 flex flex-col gap-3 px-5 py-6 text-[10px] uppercase tracking-[0.18em] text-white/45 md:flex-row md:items-center md:justify-between md:px-10">
        <span>© 2026 Julian Clark</span><span>UI/UX Portfolio</span>
      </footer>
    </main>
  )
}
