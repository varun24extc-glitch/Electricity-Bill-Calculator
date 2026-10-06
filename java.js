function calculateBill() {

    let customerId = document.getElementById("customerId").value;
    let customerName = document.getElementById("customerName").value;

    let previous = parseFloat(
        document.getElementById("previousReading").value
    );

    let current = parseFloat(
        document.getElementById("currentReading").value
    );

    // Validation
    if (customerId === "" || customerName === "") {
        alert("Please enter customer details.");
        return;
    }

    if (isNaN(previous) || isNaN(current)) {
        alert("Please enter meter readings.");
        return;
    }

    if (current < previous) {
        alert("Current reading cannot be less than previous reading.");
        return;
    }

    // Calculate units
    let units = current - previous;

    let energyCharge = 0;

    // Electricity slab calculation

    if (units <= 100) {

        energyCharge = units * 3;

    } 
    else if (units <= 200) {

        energyCharge = (100 * 3) +
                       ((units - 100) * 5);

    } 
    else if (units <= 300) {

        energyCharge = (100 * 3) +
                       (100 * 5) +
                       ((units - 200) * 7);

    } 
    else {

        energyCharge = (100 * 3) +
                       (100 * 5) +
                       (100 * 7) +
                       ((units - 300) * 10);
    }

    // Fixed charge
    let fixedCharge = 100;

    // Total bill
    let totalBill = energyCharge + fixedCharge;

    // Display result

    document.getElementById("resultId").innerText = customerId;

    document.getElementById("resultName").innerText = customerName;

    document.getElementById("resultUnits").innerText = units;

    document.getElementById("energyCharge").innerText =
        energyCharge.toFixed(2);

    document.getElementById("fixedCharge").innerText =
        fixedCharge.toFixed(2);

    document.getElementById("totalBill").innerText =
        totalBill.toFixed(2);

    document.getElementById("billResult").style.display = "block";
}


// Save bill to Java backend

function saveBill() {

    let customerId =
        document.getElementById("customerId").value;

    let customerName =
        document.getElementById("customerName").value;

    let address =
        document.getElementById("address").value;

    let previous =
        document.getElementById("previousReading").value;

    let current =
        document.getElementById("currentReading").value;

    let totalBill =
        document.getElementById("totalBill").innerText;

    if (totalBill === "") {
        alert("Please calculate the bill first.");
        return;
    }

    fetch("BillServlet", {

        method: "POST",

        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },

        body:
            "customerId=" + encodeURIComponent(customerId) +
            "&customerName=" + encodeURIComponent(customerName) +
            "&address=" + encodeURIComponent(address) +
            "&previousReading=" + encodeURIComponent(previous) +
            "&currentReading=" + encodeURIComponent(current) +
            "&totalBill=" + encodeURIComponent(totalBill)

    })

    .then(response => response.text())

    .then(data => {

        alert(data);

    })

    .catch(error => {

        console.error(error);

        alert("Error while saving bill.");

    });
}