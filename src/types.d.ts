export interface Comic {
  id: string | number
  month: string | number
  link: string
  year: string | number
  safe_title: string
  alt: string
  img: string
  title: string
  day: string | number
  width: string | number
  height: string | number
  prev?: Comic
  next?: Comic
  isPrev?: boolean
  isNext?: boolean
}

export interface ReadFilesConfig {
  getOnlyPathNames?: string | boolean
  getOnlyPrevNextById?: string
  onlyBooleanPrevNext?: boolean
  areMultiple?: boolean
  latestFiles?: number
  targetId?: number
}

export interface SearchResults {
  alt?: string
  id?: string
  img?: string
  title?: string
  readonly objectID?: string
  readonly _highlightResult?: object | undefined
  readonly _snippetResult?: object | undefined
  readonly _rankingInfo?: RankingInfo | undefined
  readonly _distinctSeqID?: number | undefined
}
