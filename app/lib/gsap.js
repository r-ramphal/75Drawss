'use client'
// Central GSAP setup so plugins are registered exactly once and every
// component imports the same instance. Extend the registerPlugin() call when
// new plugins are needed.
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export { gsap, useGSAP, ScrollTrigger }
