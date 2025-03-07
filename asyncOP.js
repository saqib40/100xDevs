// error-first call back
function fetchData(callback) {
    console.log("Fetching data...");
    setTimeout(() => {
        let error = null;
        let data = "Data retrieved";

        // Simulate an error (uncomment to test)
        // error = new Error("Failed to fetch data");

        callback(error, data);
    }, 2000);
}

function processData(data, callback) {
    console.log("Processing:", data);
    setTimeout(() => {
        let error = null;
        let processedData = "Processed Data";

        // Simulate an error (uncomment to test)
        // error = new Error("Failed to process data");

        callback(error, processedData);
    }, 2000);
}

// Using the error-first callback pattern
fetchData((err, data) => {
    if (err) {
        console.error("Error:", err.message);
    } else {
        processData(data, (err, processed) => {
            if (err) {
                console.error("Error:", err.message);
            } else {
                console.log("Final Output:", processed);
            }
        });
    }
});



// using promises
function fetchData() {
    return new Promise((resolve, reject) => {
        console.log("Fetching data...");
        setTimeout(() => {
            let error = null;
            let data = "Data retrieved";

            // Simulate an error (uncomment to test)
            // error = new Error("Failed to fetch data");

            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        }, 2000);
    });
}

function processData(data) {
    return new Promise((resolve, reject) => {
        console.log("Processing:", data);
        setTimeout(() => {
            let error = null;
            let processedData = "Processed Data";

            // Simulate an error (uncomment to test)
            // error = new Error("Failed to process data");

            if (error) {
                reject(error);
            } else {
                resolve(processedData);
            }
        }, 2000);
    });
}

// Using Promises
fetchData()
    .then((data) => processData(data))
    .then((processed) => console.log("Final Output:", processed))
    .catch((err) => console.error("Error:", err.message));


// using async-await
// same fetchData
// same processData
// Using Async-Await
async function execute() {
    try {
        const data = await fetchData();
        const processed = await processData(data);
        console.log("Final Output:", processed);
    } catch (err) {
        console.error("Error:", err.message);
    }
}
execute();


