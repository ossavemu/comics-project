import { useRouter } from 'next/router'
import React, { createContext, useCallback, useContext } from 'react'
import es from '../translate/es.json'
import en from '../translate/en.json'
import pt from '../translate/pt.json'

interface Languages {
  [key: string]: { [key: string]: string }
}
interface I18nProviderProps {
  children: React.ReactNode
}

/**
 * Defines a default context for the `I18nContext` and an object containing language translations.
 */

const defaultContext = { t: (key: string) => key }
const I18nContext = createContext(defaultContext)
const languages: Languages = { es, en, pt }

/**
 * A provider that exposes an `I18nContext` to its descendants. Uses the `useRouter` hook to determine the current
 * locale, and a callback function to handle translation. The `t` function is a convenience wrapper around the
 * `setT` callback, providing default argument handling.
 *
 * @param children - The child components to render.
 */

export function I18nProvider ({ children }: I18nProviderProps): JSX.Element {
  const { locale } = useRouter()
  /**
   * A callback function to handle translation, given a translation key and an optional array of arguments. The
   * function returns a translated string with the arguments substituted into the string.
   *
   * @param key - The translation key to look up.
   * @param args - An optional array of arguments to substitute into the translated string.
   */
  const cb = (key: string, args: (number | string)[]) => {
    const translation = languages[locale ?? 'en'][key]
    if (args.length === 0) return translation
    const argsString = args.map(arg => arg.toString())

    return translation.replace(/{(\d+)}/g, (match, number) => {
      return typeof argsString[number] !== 'undefined'
        ? argsString[number]
        : match
    })
  }

  const setT = useCallback(cb, [locale])
  /**
   * A convenience function that wraps the `setT` callback with default argument handling. The `any` parameter is
   * the translation key to look up, and `more` is an optional array of arguments to substitute into the
   * translated string.
   *
   * @param any - The translation key to look up.
   * @param more - An optional array of arguments to substitute into the translated string.
   */
  const t = (any: string, more?: (number | string)[]) => setT(any, more ?? [])

  return <I18nContext.Provider value={{ t }}>{children}</I18nContext.Provider>
}
/**
 * A hook that provides access to the current translation function. Throws an error if used outside of an
 * `I18nProvider`.
 *
 * @returns An object containing the current translation function, with an optional array of arguments.
 */
export function useI18n (): {
  t: (key: string, args?: (string | number)[]) => string
} {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within a I18nProvider')
  }
  return context
}
