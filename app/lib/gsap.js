'use client'
// Central GSAP setup so plugins are registered exactly once and every
// component imports the same instance. All GSAP plugins are free since 3.13;
// extend the registerPlugin() call when new ones are needed.
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Flip } from 'gsap/Flip'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, Flip, ScrambleTextPlugin)

export { gsap, useGSAP, ScrollTrigger, SplitText, Flip }
