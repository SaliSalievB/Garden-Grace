// Script for Cart Count
let cartCount = 0;
const cartCountElement = document.getElementById('cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        cartCountElement.textContent = cartCount;
        alert('Item added to cart!');
    });
});

// Script for Modal
const modal = document.getElementById('product-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalDescription = document.getElementById('modal-description');
const modalAddToCart = document.getElementById('modal-add-to-cart');
const closeButton = document.querySelector('.close-button');

const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('click', () => {
        const imgSrc = card.querySelector('img').src;
        const title = card.querySelector('h2').textContent;
        const price = card.querySelector('p').textContent;

        modalImage.src = imgSrc;
        modalTitle.textContent = title;
        modalPrice.textContent = price;
        modalDescription.textContent = "Detailed description of " + title + ".";

        modal.style.display = 'block';
    });
});

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', event => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Add to Cart from Modal
modalAddToCart.addEventListener('click', () => {
    cartCount++;
    cartCountElement.textContent = cartCount;
    modal.style.display = 'none';
    alert('Item added to cart!');
});
