const AI = require("./index.js")
const fs = require("fs")

let prompt = "peepee poopoo {enhanced}"

 AI.generate(prompt, async (result) => {
    if (result.error) {
        console.log(result.error)
        return;
    }
    try {
        for (let i = 0; i < result.results.length; i++) {
            let data = result.results[i].split(",")[1]
            const buffer = Buffer.from(data, "base64")
            const filename = `image_${i + 1}.png`
            fs.writeFileSync(filename, buffer)
        }
    } catch (e) {
        console.log(e)
    }
})