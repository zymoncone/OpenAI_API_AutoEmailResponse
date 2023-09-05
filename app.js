
/* OpenAI API Key will read from text file input from readFile() */
var OPENAI_API_KEY = ''
const fileInputAPI_Key = document.getElementById("inputFileToRead")
const submitButton = document.querySelector('#submit')
const outPutElement = document.querySelector('#output')
const clearButton = document.querySelector('button')
const input = document.querySelector('#entry')



async function getMessage() {
    console.log('clicked')
    
    var textSample = "What can I make with these ingredients? " + input.value
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: textSample}],
            max_tokens: 100
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        console.log(data)
        outPutElement.textContent = data.choices[0].message.content
        if (data.choices[0].message.content) {
            const pElement = document.createElement('p')
            pElement.textContent = input.value
        }
    } catch {

    }
}

function clearInput () {
    console.log(this.scrollHeight)
    input.value = ''
    
}

function autoResize() {
    if ((this.scrollHeight > 50) || (this.value.length > 65)){
        /* Adjust the value of 50 or 65 to change with any font size */
        this.style.height = 'auto'
        this.style.height = this.scrollHeight + 'px'
    }
}

function readFile() {
    var fr = new FileReader()
    fr.readAsText(this.files[0])
    fr.onload = function () {
        // console.log(fr.result)
        OPENAI_API_KEY = fr.result
    }
}

fileInputAPI_Key.addEventListener("change", readFile)
submitButton.addEventListener('click', getMessage)
clearButton.addEventListener('click', clearInput)
input.addEventListener('input', autoResize, false)
