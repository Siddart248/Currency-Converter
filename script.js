// --- 1. CLOSURE CONCEPT ---
// Reuses the closure logic to track how many conversions happened
function createCounter(){
    let count = 0;
    return function(){  
        count++;
        // Outputting the counter value reflecting DOM manipulation
        document.getElementById("count").innerText = "Total conversions: " + count;
    }
}
let trackConversion = createCounter();

// --- 2. FETCH & PROMISE LOGIC ---
// Keeping "load-btn" structure strictly as requested
document.getElementById("load-btn").addEventListener("click", () => {
    
    // Extract input field logic (merged from name input strategy)
    let amount = document.getElementById("amount").value;
    let fromCurrency = document.getElementById("fromCurrency").value;
    let toCurrency = document.getElementById("toCurrency").value;

    // Show Loading... text immediately
    document.getElementById("status").innerText = "Loading...";

    // Use existing Promise structure from load-btn code snippet
    // Inside Promise, integrate the fetch API from getData() logic
    let promise = new Promise((resolve, reject) => {
        
        // Use logic from async getData function combined directly here as per instructions
        fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
            .then(response => {
                if(!response.ok) {
                    throw new Error("API Failure");
                }
                return response.json();
            })
            .then(data => {
                if (data && data.rates && data.rates[toCurrency]) {
                    // Get conversion rate
                    let rate = data.rates[toCurrency];
                    
                    // Convert entered amount
                    let convertedAmount = amount * rate;
                    
                    // Resolve strictly structured output format
                    resolve(`${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`);
                } else {
                    reject("Error Loading Data");
                }
            })
            .catch(error => {
                reject("Error Loading Data");
            });
    });

    // Use .then(), .catch(), and .finally() correctly (adapting load-btn syntax)
    promise
        .then((result) => {
            // On Success: Set status to result string
            document.getElementById("status").innerText = result;
            
            // Execute the closure counter
            trackConversion();
        })
        .catch((error) => {
            // On Failure: Use the static error message
            document.getElementById("status").innerText = error;
        })
        .finally(() => {
            // Log keeping original finally implementation 
            console.log("Loading Completed"); 
        });
});

// --- 3. REUSED GST LOGIC (EXTRA FEATURE) ---
// Kept exactly from original code with slight UI adaptions
function calculateGST(price){
    return price * 0.18;
}

document.getElementById("btn").addEventListener("click", function(){
    let price = document.getElementById("price").value;
    
    if (price && price > 0) {
        let gst = calculateGST(price);
        document.getElementById("result").innerText = "Total Price: " + (Number(price) + Number(gst));
    } else {
        document.getElementById("result").innerText = "Please enter a valid price.";
    }
});
