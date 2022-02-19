import fs from 'fs'
import { stringify } from 'querystring'

const dist = './dist'
const src = './src'

const dateMap = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
}


const normalizeName = (name) => {
  return (name.replace(/\s+/g, '-').toLowerCase())
}

const normalizeDate = (date) => {
  let tmpDate = date.replace(',', '')
  const [month, day, year] = tmpDate.split(' ')
  return `${year}-${dateMap[(month.toLowerCase())]}-${day}`
}

const init = async () => {
  const folders = fs.readdirSync(src)

  folders.some((folder, i) => {
    let title =''
    let tmpFolder = folder
    if([...folder.matchAll( /,/g)].length > 1) {
      const index = folder.indexOf(',')
      title = normalizeName(folder.substring(0, index))
      tmpFolder = folder.substring(index + 2)
    }
    const date = normalizeDate(tmpFolder)
    let baseName = title ? `${date}-${title}` : date
    const files = (fs.readdirSync(`${src}/${folder}`)).filter(file => file.charAt(0) !== '.')
    files.forEach((file, i) => {
      const ext = file.substring(file.lastIndexOf('.') + 1);
      const rename = `${baseName}-${i}.${ext}`
      fs.rename(`${src}/${folder}/${file}`, `${dist}/${rename}`, (err) => {
        if(err) console.log(err)
        else console.log(`${dist}/${rename}`)
      })
    })
  })
}

init()