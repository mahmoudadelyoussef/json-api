const PORT = 'semi-final-project-indol.vercel.app/'

const catCls = document.querySelector(".catCls");
const titleSection = document.querySelector(".titleSection");
const burgersCards = document.querySelector(".burgersCards");
const burgersSection = document.querySelector(".burgersSection");
const cartParent = document.querySelector(".cartParent");
const CartPart = document.querySelector(".CartPart");
const finalPrice = document.querySelector(".finalPrice");

async function getCat(myData) {

    if (localStorage.getItem("CatResults") == null) {
        const res = await fetch(`${PORT}catergories`);
        let result = await res.json();

        localStorage.setItem("CatResults", JSON.stringify(result))
    }

    // Retrieve from localStorage if needed
    const catResults = JSON.parse(localStorage.getItem("CatResults"));

    const selectedCategory = myData !== undefined ? [catResults[myData - 1]] : catResults;
    catCls.innerHTML = '';
    burgersCards.innerHTML = '';

    let favStyle = '';// `${element.isFavourite ? 'style="background-color: white;"' : 'style="display: none;"'} `;
    let isAddedToCart = '';// `${element.isAddedToCart ? 'style="pointer-events:none;opacity:0.5" ' : ''}`

    selectedCategory.forEach(eleCat => {

        catCls.innerHTML +=
            `
            <div class="catContent">
                <div onclick="getCatData(${eleCat.id})" class="catConteImgDiv" ${eleCat.isActive == 1 ? 'style="outline:1px solid red" ' : ''}>
                    <img src='${eleCat.image}' alt="">
                   
                </div>
                <p style="color: white;">${eleCat.title}</p>
            </div>
            `
        if (eleCat.isActive == 1) {
            eleCat.details.forEach((ele) => {
                let isAddedToCart = ele.isAddedToCart == 1 ? 'style="opacity:0.5;pointer-events:none"' : '';

                document.querySelector(".burgersCards").innerHTML += `
                <div class="burgerCard">
    
                <div class="burgerImageContainer">
                    <div class="icons-navBar-Burger">
                        <i class="fa-solid fa-heart" 
                            ${favStyle}></i>
                    </div>
                    <img src=${ele.image} alt="">
                </div>
    
                <div class="priceAndRate">
                    <label for="">${ele.price}EGP</label>
                    <div class="rate">
                        <i class="fa-solid fa-star"></i>
                        <p for="">${ele.rate}</p>
                    </div>
    
                </div>
                <div class="lineDiv">
                </div>
                <div class="sandText">
                    <p>${ele.title}</p>
                </div>
    
                <div class="sandwitchDesc">
                    <div class="sandwitchDeatils">
                        <i class="fa-regular fa-circle-check"></i>
                        <p for="">${ele.pieces} Pieces</p>
                    </div>
                    <div class="sandwitchDeatils">
                        <i class="fa-regular fa-circle-check"></i>
                        <p for="">${ele.isSpicy ? 'Spicy Sauce' : 'Regular Sauce'}</p>
                    </div>
                </div>
                <div>
                    
                    <button class="AddFavBtn"${isAddedToCart} id='${`AddToCart-${ele.id}-${eleCat.id})`}' onclick="addToCart(${ele.id},${eleCat.id})">Add To Cart</button>
    
                </div>
            </div>
                 `


            })
        }

    });
    if(localStorage.getItem("CartItems") != null)
    document.querySelector(".cart-counter").textContent = JSON.parse( localStorage.getItem("CartItems")).length

}

getCat()

function getCatData(id) {
    //getCat(id)
    let changedResult = JSON.parse(localStorage.getItem("CatResults"));
    changedResult.forEach((ele) => {
        ele.isActive = 0
    })
    // changedResult[id - 1].isActive = 1
    changedResult.filter(f => f.id == id)[0].isActive = 1
    localStorage.setItem("CatResults", JSON.stringify(changedResult))
    getCat()
}


function addToCart(itemId, catID) {
    // burgersObject[itemId-1].isAddedToCart = 1;

    document.getElementById(`AddToCart-${itemId}-${catID})`).style.pointerEvents = "none";
    document.getElementById(`AddToCart-${itemId}-${catID})`).style.opacity = "0.5";
    //  const cartCount = burgersObject.filter(item => item.isAddedToCart === 1).length;

    // document.querySelector(".cart-counter").textContent = cartCount;
    let localData = JSON.parse(localStorage.getItem("CatResults"));
    let clickedITem = localData.filter(f => f.id == catID)[0].details.filter(f => f.id == itemId)[0]

    localData.forEach((ele) => {
        ele.details.forEach((x) => {
            if (x == clickedITem) {
                x.isAddedToCart = 1;
            }

        })

    })
    localStorage.setItem("CatResults", JSON.stringify(localData))
    // localStorage.setItem("CatResults", JSON.stringify(
    //     JSON.parse(localStorage.getItem("CatResults")).
    //     filter(f => f.id == catID)[0].details.filter(f => f.id == itemId)[0].isAddedToCart =1))

    // JSON.parse(localStorage.getItem("CartItems")).filter(f=>f.id == catID)[0].details.filter(f => f.id == itemId)[0]

    let cartResult = JSON.parse(localStorage.getItem("CartItems"));
    if (cartResult == null) {
        cartResult = [clickedITem]
    } else {
        cartResult.push(clickedITem)
    }
    localStorage.setItem("CartItems", JSON.stringify(cartResult))
}

function showCart() {
    //titleSection not ready
    //catCls ready
    const titleTxt = document.querySelector(".shopTitle p");
    let localData = localStorage.getItem("CartItems")
    if (localData != null) {
        let pasredData = JSON.parse(localData);
        if (titleTxt.innerText == 'Home - Shop') {
            titleTxt.innerText = 'Home - cart'
            titleSection.style.display = "none"
            catCls.style.display = "none"
            burgersSection.style.display = "none"

            cartParent.style.display = "flex"
        } else {
            titleTxt.innerText = 'Home - Shop'
            titleSection.style.display = "flex"
            catCls.style.display = "flex"
            burgersSection.style.display = "flex"
            cartParent.style.display = "none"
        }
        CartPart.innerHTML = ''
        pasredData.forEach((ele) => {
            CartPart.innerHTML += `
                 <div class="singleCart"  >
              <div class="singleCartImag">
                <img src='${ele.image}' alt="" />
              </div>
              <div class="singleCartData">
                <p>${ele.title}</p>
                <label>${ele.price} EGP</label>
                <div class="lastRowCar">
                  <p> ${ele.pieces} Pieces</p>
                  <p>${ele.isSpicy ? 'Spicy' : 'Regular'} Sauce</p>
                  <div class="addedBtn">
                    <p onclick=dec(${ele.id},${ele.price})>-</p>
                  </div>
                  <div id='total-${ele.id}' >1</div>
                  <div class="addedBtn">
                    <p onclick=inc(${ele.id},${ele.price})>+</p>
                  </div>
                </div>
              </div>
            </div>
            `
        })

        let totalPrice = 0;
        pasredData.forEach((ele) => {
            totalPrice += ele.price
        })
        finalPrice.innerHTML = totalPrice + ' EGP'
        localStorage.setItem("TotalPrice", totalPrice)


    } else {

    }

}

function inc(id, price) {
    let incEle = document.getElementById(`total-${id}`);
    let incVal = parseInt(incEle.innerText);
    incVal++;
    incEle.innerHTML = incVal;
    let finalPriceVal = Math.round(parseFloat(localStorage.getItem("TotalPrice")))

    finalPriceVal += price
    localStorage.setItem("TotalPrice", finalPriceVal)
    finalPrice.innerHTML = finalPriceVal + ' EGP'
}
function dec(id, price) {
    let incEle = document.getElementById(`total-${id}`);
    let incVal = parseInt(incEle.innerText)
    incVal--


   
    let finalPriceVal = Math.round(parseFloat(localStorage.getItem("TotalPrice")))
    finalPriceVal -= price
    if (incVal < 0)
        return
    else if(incVal == 0){
        incEle.innerHTML = incVal;
        localStorage.setItem("TotalPrice", finalPriceVal)
        finalPrice.innerHTML = finalPriceVal + ' EGP'
    }
    else {
        incEle.innerHTML = incVal;
        localStorage.setItem("TotalPrice", finalPriceVal)
        finalPrice.innerHTML = finalPriceVal + ' EGP'
    }

}