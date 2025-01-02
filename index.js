const axios = require('axios');
const API_URL = 'https://stablediffusion-two.vercel.app/generate-image';

function generate(prompta) {
    let prompt = prompta
    if (prompt.endsWith('{enhanced}')) {
        prompt = prompt.replace('{enhanced}', "realistic, smoothening, epic cinematic lighting, dark villanous looking background.")
    }

    const generateImage = async () => {
        try {
            const response = await axios.post(API_URL, { prompt }, { responseType: 'arraybuffer' });

            if (response.status === 200) {
                return response.data;
            } else {
                console.log(`Error: ${response.status} - ${response.statusText}`);
                throw new Error('Image generation failed');
            }
        } catch (error) {
            console.error('Error generating image:', error);
            throw error; 
        }
    };

    return generateImage(); 
}

module.exports = {
    generate
};
