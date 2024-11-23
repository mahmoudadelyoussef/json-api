const PORT = 'semi-final-project-indol.vercel.app/'
const myList = document.body.querySelectorAll("ul li")
const clostBtn = document.querySelector(".closeListIndex");
myList.forEach((ele) => {
    ele.onclick = () => {
        removeActive()
        ele.setAttribute("class", "active");
        clostBtn.click();
    }
})
const myIcon = document.querySelector(".desktop i");
myIcon.onclick = () => {
    document.querySelector("ul").classList.toggle("visibiltyCls");
    document.querySelector(".closeList").classList.remove('closeList');
    document.querySelector("body").style.overflow = "hidden"
}
clostBtn.onclick = () => {
    myIcon.click();
    document.querySelector(".closeListIndex").classList.add("closeList");
    document.querySelector("body").style.overflow = ""
}

function removeActive() {
    myList.forEach((ele) => {
        ele.removeAttribute("class");
    })
}


// function scrollCardsRight() {
//     document.querySelector(".leftArrowDiv").classList.remove("arrowDivClick")
//     document.querySelector(".RightArrowDiv").classList.add("arrowDivClick")
//     document.querySelector('.burgersCards').scrollBy({
//         left: 300,
//         behavior: 'smooth'
//     });
// }
// function scrollCardsLeft() {
//     document.querySelector(".RightArrowDiv").classList.remove("arrowDivClick")
//     document.querySelector(".leftArrowDiv").classList.add("arrowDivClick")
//     document.querySelector('.burgersCards').scrollBy({
//         left: -300,
//         behavior: 'smooth'
//     });
// }
localStorage.removeItem("CartItems")
let burgersObject = [];
function fetchData() {
    fetch(`${PORT}catergories`).then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
    }).then(data => {
        debugger
        data.forEach((ele)=> {
            ele.details.forEach((x)=>{
                burgersObject.push(x)
            })
        })
 
        burgersObject.forEach((element) => {

            let favStyle = `${element.isFavourite ? 'style="background-color: white;"' : 'style="display: none;"'} `;
            let isAddedToCart = `${element.isAddedToCart ? 'style="pointer-events:none;opacity:0.5" ' : ''}`

            document.querySelector(".burgersCards").innerHTML += `
                    <div class="burgerCard">

                    <div class="burgerImageContainer">
                        <div class="icons-navBar-Burger">
                            <i class="fa-solid fa-heart" 
                                ${favStyle}></i>
                        </div>
                        <img src=${element.image} alt="">
                    </div>

                    <div class="priceAndRate">
                        <label for="">${element.price}EGP</label>
                        <div class="rate">
                            <i class="fa-solid fa-star"></i>
                            <p for="">${element.rate}</p>
                        </div>

                    </div>
                    <div class="lineDiv">
                    </div>
                    <div class="sandText">
                        <p>${element.title}</p>
                    </div>

                    <div class="sandwitchDesc">
                        <div class="sandwitchDeatils">
                            <i class="fa-regular fa-circle-check"></i>
                            <p for="">${element.pieces} Pieces</p>
                        </div>
                        <div class="sandwitchDeatils">
                            <i class="fa-regular fa-circle-check"></i>
                            <p for="">${element.isSpicy ? 'Spicy Sauce' : 'Regular Sauce'}</p>
                        </div>
                    </div>
                    <div>
                         
                        <button id='${element.id}' class="AddFavBtn"${isAddedToCart} onclick="addToCart(${element.id})">Add To Cart</button>

                    </div>
                </div>
        `
        })

        document.querySelector(".cart-counter").textContent = burgersObject.filter(item => item.isAddedToCart === 1).length;;

    }).catch(error => { console.error("Fetch error: ", error); });
}

fetchData();

function addToCart(itemId) {
    let clckedItem=  burgersObject.filter(f=>f.id == itemId)[0];
    clckedItem.isAddedToCart = 1;

    document.getElementById(itemId).style.pointerEvents = "none";
    document.getElementById(itemId).style.opacity = "0.5";
     const cartCount = burgersObject.filter(item => item.isAddedToCart == 1).length;

    document.querySelector(".cart-counter").textContent = cartCount;
    let localData = localStorage.getItem("CartItems");
    if(localData == null){
        localData =  [ clckedItem ]
    }else{
        localData = JSON.parse(localData);
        localData.push(clckedItem)
    }
    
    localStorage.setItem("CartItems",JSON.stringify(localData))
}

// let scrollInterval;

// function startScrolling(direction) {
//     scrollInterval = setInterval(() => {
//         if (direction === 'left') {
//             scrollCardsLeft();
//         } else if (direction === 'right') {
//             scrollCardsRight();
//         }
//     }, 100);  

// function stopScrolling() {
//     clearInterval(scrollInterval);
// }