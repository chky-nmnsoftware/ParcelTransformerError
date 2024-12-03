import {Transformer} from '@parcel/plugin'

export default new Transformer({
  async transform({asset}) {
    const code = await asset.getCode()

    const lines = code.split('\n')
    let result = []
    let skipNextLine = false

    lines.forEach((line) => {
        if (skipNextLine) {
            skipNextLine = false
            return result.push('')
        }

        if (line.trim().startsWith('//removeOnCompile')) {
            skipNextLine = true
            return result.push('')
        }

        result.push(line)
    })

    asset.setCode(result.join('\n'))
    return [asset]
  }
})