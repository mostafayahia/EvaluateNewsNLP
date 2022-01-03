async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('text').value

    const subjectivityElement = document.getElementById('subjectivity');
    const confidenceElement = document.getElementById('confidence');
    const agreementElement = document.getElementById('agreement');
    const ironyElement = document.getElementById('irony');

    function resetFormResult() {
        subjectivityElement.textContent = "";
        confidenceElement.textContent = "";
        agreementElement.textContent = "";
        ironyElement.textContent = "";
    }

    if (!Client.validText(formText)) {
        resetFormResult();
        alert('Error: you must enter non empty text!');
        return;
    }

    console.log("::: Form Submitted :::")

    // clear form result from previous result (if exist)
    resetFormResult(); 

    const res = await fetch('http://localhost:8081/nlp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: formText
        })
    });

    try {
        const body = await res.json();

        if (body && body.status && body.status.msg === 'OK') {
            subjectivityElement.textContent = body.subjectivity;
            confidenceElement.textContent = body.confidence;
            agreementElement.textContent = body.agreement;
            ironyElement.textContent = body.irony;

        } else {
            resetFormResult();

        }
    } catch (error) {
        console.log('error', error);
    }

}

export { handleSubmit }
