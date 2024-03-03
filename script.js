
    document.addEventListener('DOMContentLoaded', function () {
        const navbarHamburger = document.querySelector('.navbarhamburger');
        const ulMenu = document.querySelector('.ulmenu');

        navbarHamburger.addEventListener('click', function () {
            ulMenu.classList.toggle('show-menu');
        });
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
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    AOS.init();

    document.addEventListener('DOMContentLoaded', function () {
        const sidebar = document.getElementById('sidebar');
        const cartIcon = document.querySelector('.fa-solid.fa-cart-shopping');
        const closeSidebarButton = document.getElementById('closeSidebar');

        cartIcon.addEventListener('click', function () {
            sidebar.classList.add('show');
        });

        closeSidebarButton.addEventListener('click', function () {
            sidebar.classList.remove('show');
        });
    });

    axios.get('db.json')
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });