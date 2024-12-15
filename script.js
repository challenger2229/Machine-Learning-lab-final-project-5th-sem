// script.js

document.getElementById('upload-btn').addEventListener('click', async () => {
    const fileInput = document.getElementById('file-input');
    if (fileInput.files.length === 0) {
        alert("Please upload a file.");
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
        const response = await fetch("http://localhost:5000/predict", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        document.getElementById('result-output').innerText = `Prediction: ${data.prediction}`;
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while predicting.");
    }
});

document.getElementById('predict-btn').addEventListener('click', async () => {
    const readings = document.getElementById('reading').value;
    if (!readings) {
        alert("Please enter sonar readings.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/predict_manual", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ readings: readings.split(',').map(Number) }),
        });

        const data = await response.json();
        document.getElementById('result-output').innerText = `Prediction: ${data.prediction}`;
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while predicting.");
    }
});
