
/* OpenAI API Key will read from text file input from readFile() */
var OPENAI_API_KEY = ''
const fileInputAPI_Key = document.getElementById("inputFileToRead")
const submitButton = document.querySelector('#submit')
const outPutElement = document.querySelector('#output')
const clearButton = document.querySelector('button')
const input = document.querySelector('#entry')



async function getMessage() {
    console.log('clicked');

    // work on making this an await for json response
    
    for (let i=0; i < 2; i++) {
        outPutElement.textContent = "\nLOADING";
        for (let j=0; j < 3; j++) {
            await delay(1000);
            outPutElement.append(".")
        }
    }

    outPutElement.append("\n\n")
    
    var textSample = "What can I make with these ingredients? " + input.value + "Give me your top 3 answers."
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: textSample}],
            // max_tokens: 200
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        console.log(data)
        var food_list = data.choices[0].message.content;
        outPutElement.textContent = "";
        var skip_next = false;
        for (let i=0, len=food_list.length; i < len; i++) {

            is_num = /^[0-9]*$/.test(food_list[i]);
            following_two_is_num = /^[0-9]*$/.test(food_list[i+1]) || /^[0-9]*$/.test(food_list[i+2]);
            previous_num = /^[0-9]*$/.test(food_list[i-1]);

            if (is_num && !following_two_is_num && !previous_num && (skip_next == false)) {
                outPutElement.append("\n");
                skip_next = true;
            } else if (!following_two_is_num && !previous_num){
                skip_next = false;
            }

            outPutElement.append(food_list[i]);
        }
        outPutElement.append("\n\n");
        // outPutElement.textContent = data.choices[0].message.content
        if (data.choices[0].message.content) {
            const pElement = document.createElement('p')
            pElement.textContent = input.value
        }
    } catch (error){
        console.error(error)
    }
}

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
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
