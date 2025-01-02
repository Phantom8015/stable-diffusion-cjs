# stable-diffusion-cjs

This is a CJS version of [this](https://www.npmjs.com/package/stable-diffusion-es) ES module for [Node.js](https://nodejs.org/en/) that provides uses Stable Diffusion to generate images from a given prompt using AI.

## Installation

```bash
npm install stable-diffusion-cjs
```

## Usage

```js
const { generate } = require('stable-diffusion-cjs'); 

const prompt = "A cat"; 

generate(prompt, (response) => {
    if (response.error) {
        console.log("There was an error generating the image.");
    } else {
        console.log("Image generated successfully!");
        console.log(`Image saved at: ${response.results}`);
    }
});
```
A trick to get better images is to add: 
```
{enhanced}
```
at the end of your prompt.

## Output

![A cat](https://media.discordapp.net/attachments/1301965748025036915/1324488070904549457/image.png?ex=67785523&is=677703a3&hm=303a6f38b2c3cc928ced00488cdd514c2e2879c653fabe9ed288090dd390cbfa&=&format=webp&quality=lossless&width=525&height=525)



