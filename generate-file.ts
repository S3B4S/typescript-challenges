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
const [rawChallengeId, difficulty, ...rest] = puzzleNameRaw.split('-')
const challengeId = rawChallengeId.replace(/^0+/, '')
const puzzleName = rest.join('-')

const getRawContentUrl = `https://raw.githubusercontent.com/type-challenges/type-challenges/main/questions/${puzzleNameRaw}/README.md`
fetch(getRawContentUrl)
  .then(data => data.text())
  .then(async (text) => {
    let targetDirectory: Difficulty = difficulty as Difficulty

    console.log("Get the puzzle content from: " + getPlayUrl(challengeId))

    if (!fs.existsSync(targetDirectory)) {
      fs.mkdirSync(targetDirectory)
    }
    
    const destination = `./${targetDirectory}/${challengeId.padStart(5, "0")}_${puzzleName}.ts`
    console.log("Generating file: " + destination)
    fs.writeFileSync(destination, "")
  })

// https://github.com/type-challenges/type-challenges/blob/main/questions/00002-medium-return-type/README.md
// https://raw.githubusercontent.com/type-challenges/type-challenges/main/questions/00002-medium-return-type/README.md
