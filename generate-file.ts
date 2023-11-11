import fs from 'fs'

const xargs = process.argv.slice(2)
const url = xargs[0]

if (typeof url !== 'string') {
  throw new Error("URL is not a string")
}

const getPlayUrl = (challengeId: string)  => `https://tsch.js.org/${challengeId}/play`

enum Difficulty {
  easy = "easy",
  medium = "medium",
  hard = "hard",
  extreme = "extreme",
}

const splittedUrl = url.split('/')
if (splittedUrl.length < 2) throw new Error('Invalid URL')

const puzzleNameRaw = splittedUrl.at(-2)! // We determined above that the length is at least 2

const [rawChallengeId, _, ...rest] = puzzleNameRaw.split('-')
const challengeId = rawChallengeId.replace(/^0+/, '')
const puzzleName = rest.join('-')

fetch(url)
  .then(data => data.text())
  .then(async (text) => {
    let targetDirectory: Difficulty

    console.log("Get the puzzle content from: " + getPlayUrl(challengeId))

    if (text.includes(Difficulty.easy)) {
      targetDirectory = Difficulty.easy
    } else if (text.includes(Difficulty.medium)) {
      targetDirectory = Difficulty.medium
    } else if (text.includes(Difficulty.hard)) {
      targetDirectory = Difficulty.hard
    } else if (text.includes(Difficulty.extreme)) {
      targetDirectory = Difficulty.extreme
    } else {
      throw new Error("Difficulty not found")
    }

    const destination = `./${targetDirectory}/${challengeId.padStart(5, "0")}_${puzzleName}.ts`
    console.log("Generating file: " + destination)
    fs.writeFileSync(destination, "")
  })
