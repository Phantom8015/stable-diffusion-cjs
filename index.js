const WebSocket = require('ws');

const API_URL = "wss://runwayml-stable-diffusion-v1-5.hf.space/queue/join"

function generateHash() {
    const chars = "qwertyuopasdfghjklizxcvbnm0123456789"
    let hash = ""
    for (let i = 0; i < 11; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)]
    }
    return {
        session_hash: hash,
        fn_index: 2
    }
}

let enhancements =  " realistic graphics, epic dark cinematic, 4k, vibrant lighting, smooth edges, 3d, not blurry, clear, cool vibrant background"

let enhanced = true

function generate(prompta, cb) {
    const client = new WebSocket(API_URL);
    const hash = generateHash()
    let prompt = prompta
    if (enhanced){
        prompt = prompta + enhancements
    }
    let tmr = setTimeout(() => {
        client.close()
        cb({
            error: true
        })
    }, 120000);

    client.on("open", () => {
        // console.log("Connected to Websocket!")
    })

    client.on("error",()=>{
        cb({
            error:true,
        })
    })

    client.on("message", (message) => {
        let msg = JSON.parse("" + message)
        if (msg.msg == "send_hash") {
            client.send(JSON.stringify(hash))
        } else if (msg.msg == "send_data") {
            let data = {
                data: [prompt],
                ...hash
            }
            client.send(JSON.stringify(data))
        } else if (msg.msg == "process_completed") {
            clearTimeout(tmr)
            try{
                const results = msg.output.data[0]
                cb({
                    error:false,
                    results
                })
            }catch(e){
                cb({
                    error:true,
                })
            }
            
        }

    })
}

module.exports = {
    generate
}
