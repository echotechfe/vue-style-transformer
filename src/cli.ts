import path from 'path'
import fs from 'fs'
import fg from 'fast-glob'
import chalk from 'chalk'
import { transform } from './index'

const log = console.log

export async function cli() {
  const asset = process.argv[2]

  if (!asset) {
    log(chalk.red('需要指定一个目录'))
    return
  }
  const fileDir = path.resolve(process.cwd(), asset)
  const entries = await fg(['**.vue'], { cwd: fileDir })
  entries.forEach(async (entry) => {
    const filepath = `${fileDir}/${entry}`
    const code = await fs.promises.readFile(filepath, 'utf-8')
    let codeTransfer = ''
    try {
      codeTransfer = await transform(code)
    } catch (error) {
      log(chalk.red(`${filepath} transfer failed: ${error}`))
    }
    if (codeTransfer) {
      await fs.promises.writeFile(filepath, codeTransfer)
      log(chalk.green(`${filepath} transfer succeed`))
    }
  })
}

cli()
