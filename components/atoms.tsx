import { atom } from 'jotai'

export const productsAtom = atom([])

export const envStatusAtom = atom(process.env.ENVIRONMENT === "dev" ? "http://localhost:3000/" : "https://affectionate-jackson-74f530.netlify.app/")

export const currentIdAtom = atom('')

export const pastaFilterAtom = atom('')