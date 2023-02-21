import { ReadFilesConfig } from './types/readfiles'
import fs, { stat } from 'fs/promises'
import { basename } from 'path'

export async function readFiles (
  path: string,
  config: ReadFilesConfig = {
    areMultiple: true,
    latestFiles: 18
  }
): Promise<any> {
  const files = await fs.readdir(path)

  if (typeof config.getOnlyPathNames === 'boolean' && config.getOnlyPathNames) {
    // Return only file names
    return files
  } else if (typeof config.getOnlyPathNames === 'string') {
    if (config.getOnlyPathNames === 'noExtension') {
      // Return only file names without extension
      return files.map(file => {
        return basename(file, '.json')
      })
      // invalid config
    } else throw new Error('Error: Invalid config provided.')
  } else if (typeof config.getOnlyPrevNextById === 'string') {
    if (!isNaN(+config.getOnlyPrevNextById)) {
      // Return only previous and next file names
      const id = +config.getOnlyPrevNextById
      const prev = id - 1
      const next = id + 1
      const [prevR, nextR] = await Promise.allSettled([
        stat(`${path}/${prev}.json`),
        stat(`${path}/${next}.json`)
      ])
      if (config.onlyBooleanPrevNext === true) {
        // Return only boolean values
        return [prevR.status === 'fulfilled', nextR.status === 'fulfilled']
      } else {
        return [
          prevR.status === 'fulfilled'
            ? await readFiles(path, {
              targetId: prev
            })
            : null,
          nextR.status === 'fulfilled'
            ? await readFiles(path, {
              targetId: next
            })
            : null
        ]
      }
      // invalid config
    } else throw new Error('Error: Invalid config provided. Id must be a number.')
  } else if (config.areMultiple === true) {
    // Return multiple files
    const latestFiles = config.latestFiles === undefined ? 18 : config.latestFiles
    const latestComicsFiles = files
      .slice(-latestFiles, files.length)
      .reverse()
    const promisesReadFile = latestComicsFiles.map(async file => {
      const content = await fs.readFile(`${path}/${file}`, 'utf-8')
      return JSON.parse(content)
    })
    return await Promise.all(promisesReadFile)
  } else if (config.targetId !== undefined) {
    // Return single file
    const targetId = config.targetId.toString() + '.json'
    const targetFile = await fs.readFile(`${path}/${targetId}`, 'utf-8')
    return JSON.parse(targetFile)
  } else throw new Error('Error: Invalid config provided.')
}
