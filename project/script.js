let menuDisplay = document.getElementById("display-menu");
let displayHome = document.getElementById("display-home")
let homeButton = document.getElementById("home");
let menuButton = document.getElementById("menu");
let startOrderButton = document.getElementById("start-order")

let orderObject = {}
let menuArray = []
async function getMenu() {
    try {
        let response = await fetch("menu.json");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        let data = await response.json();
        menuArray = data
        renderMenu(data)

    }
    catch (error) {
        console.log("error while getting menu")
        alert("Failed to load menu. Please try again later.");
    }

}
console.log(menuArray)

function renderMenu(menuItems) {
    menuItems.forEach((item, index) => {
        menuDisplay.innerHTML += `
        <div class="menu-container">
        <div class="top">
        <img src=${item.imgSrc}/>
        </div>
        <div class="bottom">
        <p>${item.name}</p>
         <h3>${item.price}</h3>
        </div>
        </div>
        `
    })

}

function handleHomeButton() {
    document.getElementById("placing-order").textContent = ""
    document.getElementById("order-placed").textContent = ""
    document.getElementById("order-preparing").textContent = ""
    document.getElementById("order-prepared").textContent = ""
    document.getElementById("payment-processing").textContent = ""
    document.getElementById("payment-done").textContent = ""
    menuDisplay.style.display = "none"
    displayHome.style.display = "block"

}

function handleMenuButton() {
    menuDisplay.style.display = "flex"
    displayHome.style.display = "none"

}


function TakeOrder(menuArray) {
    return new Promise((resolve) => {
        console.log("Taking Order.......")
        document.getElementById("placing-order").textContent = "Taking Order......."

        setTimeout(() => {
            // Randomly select 3 items from menuArray
            let items = [];
            let copyArray = [...menuArray]; // clone to avoid modifying original array
            for (let i = 0; i < 3 && copyArray.length > 0; i++) {
                let randomIndex = Math.floor(Math.random() * copyArray.length);
                items.push(copyArray[randomIndex].name);
                copyArray.splice(randomIndex, 1); // remove selected item
            }

            orderObject = {
                items: items,
                status: "Order Placed"
            }

            console.log("Order Placed", orderObject)
            document.getElementById("order-placed").textContent = `Order Placed: ${orderObject.items.join(", ")}`
            resolve(orderObject)
        }, 2500)
    })
}

function orderPrep() {
    return new Promise((resolve) => {
        console.log("Preparing order.....")
        document.getElementById("order-preparing").textContent = "Preparing order....."
        setTimeout(() => {
            orderObject.status = true;
            orderObject.paid = false;
            console.log("Order Prepared", orderObject)
            document.getElementById("order-prepared").textContent = `Order Prepared ${orderObject.items}`
            resolve(orderObject)
        }, 1500)
    })
}
function payOrder() {
    return new Promise((resolve) => {
        console.log("Processing payment....")
        document.getElementById("payment-processing").textContent = "Processing payment...."
        setTimeout(() => {
            orderObject.paid = true;
            console.log("Payment done", orderObject)
            document.getElementById("payment-done").textContent = "Payment done"
            resolve(orderObject)
        }, 1000)
    })
}

function thankYou() {
    setTimeout(() => {
        if (orderObject.paid) {
            alert("Thank you for ordering please visit again.........")
        }
    }, 1000)
}


async function startOrdering() {
    
    document.getElementById("placing-order").textContent = ""
    document.getElementById("order-placed").textContent = ""
    document.getElementById("order-preparing").textContent = ""
    document.getElementById("order-prepared").textContent = ""
    document.getElementById("payment-processing").textContent = ""
    document.getElementById("payment-done").textContent = ""
 try {
        if (menuArray.length === 0) await getMenu();
        await TakeOrder(menuArray);
        await orderPrep();
        await payOrder();
        thankYou();
    } catch (err) {
        console.error("Order process failed:", err);
    }
}



homeButton.addEventListener("click", handleHomeButton)
menuButton.addEventListener("click", handleMenuButton)
startOrderButton.addEventListener("click", startOrdering)
// console.log(menuContainer)

getMenu()