import { writable } from 'svelte/store'

export const values = writable({})
export const errors = writable({})
export const warnings = writable({})
export const touched = writable({})
export const validators = writable({})
