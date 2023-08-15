
/* OpenAI API Key will read from text file input */
var OPENAI_API_KEY = ''
const submitButton = document.querySelector('#submit')
const outPutElement = document.querySelector('#output')
const clearButton = document.querySelector('button')
const emailInput = document.querySelector('#email-input')



async function getMessage() {
    console.log('clicked')
    
    var emailSample = "How would I respond to this email in a nice way?" + emailInput.value
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: emailSample}],
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
            pElement.textContent = emailInput.value
        }
    } catch {

    }
}

function clearInput () {
    console.log(this.scrollHeight)
    emailInput.value = ''
    
}

function autoResize() {
    if ((this.scrollHeight > 50) || (this.value.length > 65)){
        /* Adjust the value of 50 or 65 to change with any font size */
        this.style.height = 'auto'
        this.style.height = this.scrollHeight + 'px'
    }
}

document.getElementById("inputFileToRead")
  .addEventListener("change", function () {
    var fr = new FileReader();
    fr.readAsText(this.files[0]);
    fr.onload = function () {
        console.log(fr.result);
        OPENAI_API_KEY = fr.result;
    };  
  });

submitButton.addEventListener('click', getMessage)
clearButton.addEventListener('click', clearInput)
emailInput.addEventListener('input', autoResize, false)
