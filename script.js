document.addEventListener('DOMContentLoaded', function () {
    const navbarHamburger = document.querySelector('.navbarhamburger');
    const ulMenu = document.querySelector('.ulmenu');

    navbarHamburger.addEventListener('click', function () {
        ulMenu.classList.toggle('show-menu');
    });

    const sidebar = document.getElementById('sidebar');
    const cartIcon = document.querySelector('.fa-solid.fa-cart-shopping');
    const closeSidebarButton = document.getElementById('closeSidebar');

    cartIcon.addEventListener('click', function () {
        sidebar.classList.add('show');
    });

    closeSidebarButton.addEventListener('click', function () {
        sidebar.classList.remove('show');
    });
    
    AOS.init();
});

let currentIndex = 0;
let interval;

const showSlide = (index) => {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const slideWidth = slides[0].clientWidth;
    currentIndex = (index + slides.length) % slides.length;
    slider.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
};

const autoplay = () => {
    interval = setInterval(() => showSlide(currentIndex + 1), 3500);
};

const stopAutoplay = () => clearInterval(interval);

const changeSlide = (direction) => {
    stopAutoplay();
    showSlide(currentIndex + direction);
};

autoplay();

let listproduct = document.querySelector("#userlist");
fetch("db.json")
    .then(response => response.json())
    .then(db => {
        db.products.forEach(product => {
            let dom = document.createElement('li');

            if (product.image) {
                let img = document.createElement('img');
                img.src = product.image;
                img.alt = product.name || 'No Name';
                dom.appendChild(img);

                let button = document.createElement('button');
                button.className = 'quickview'; 
                button.textContent = 'Quick View';
                dom.appendChild(button);
            } else {
                console.error('Image URL is undefined for:', product);
            }

            if (product.name) {
                let name = document.createElement('p');
                name.textContent = `Name: ${product.name}`;
                dom.appendChild(name);
            } else {
                console.error('Name is undefined for:', product);
                return;
            }

            if (product.price) {
                let price = document.createElement('p');
                price.textContent = `Price: $${product.price.toFixed(2)}`;
                dom.appendChild(price);
            } else {
                console.error('Price is undefined for:', product);
                return;
            }

            listproduct.appendChild(dom);

            const quickviewbutton = listproduct.getElementsByClassName("quickview");
            quickviewbutton[quickviewbutton.length - 1].addEventListener("click", (e) => { 
                e.preventDefault();
                const modal = document.createElement("div");
                modal.className = "view-card";
                modal.innerHTML = `
                    <div class="products-images">
                        <img src=${product.image} alt="">
                        <img src=${product.image} alt="">
                        <img src=${product.image} alt="">
                    </div>
                    <div class="product-slider">
                        <div class="product-slides">
                            <div class="product-slide" style="background-image: url(${product.image});"></div>
                            <div class="product-slide" style="background-image: url(${product.image});"></div>
                            <div class="product-slide" style="background-image: url(${product.image});"></div>
                        </div>
                    </div>
                    <div class="product-infos">
                        <h2>${product.name}</h2>
                        <h3>${product.name}</h3>
                        <p>$${product.price}</p>
                        <div class="buttons1"><button>-</button><span>1</span><button>+</button></div>
                        <button class="add-to-card">ADD TO CARD</button>
                    </div>
                `;
                document.body.appendChild(modal);
            });
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });



const addtocartbutton = listproduct.getElementsByClassName("add-to-card");

Array.from(addtocartbutton).forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();

        const product = {
            name: e.target.parentElement.querySelector('h2').textContent,
            price: e.target.parentElement.querySelector('p').textContent,
            image: e.target.parentElement.parentElement.querySelector('img').src
        };

        updateCart(product);
        sidebar.classList.add('show');
    });
});

function updateCart(product) {
   

    const cartList = document.querySelector("#sidebar .cart-list");

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
        </div>
    `;

    cartList.appendChild(cartItem);
}

