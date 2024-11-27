document.addEventListener('DOMContentLoaded', () => {
    // Helper Functions
    function getCartItems() {
        let cartItems = localStorage.getItem('cartItems');
        return cartItems ? JSON.parse(cartItems) : [];
    }

    function setCartItems(items) {
        localStorage.setItem('cartItems', JSON.stringify(items));
    }

    // Update Cart Count
    const cartCountElement = document.getElementById('cart-count');
    let cartItems = getCartItems();
    cartCountElement.textContent = cartItems.length;

    // Add to Cart Functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.stopPropagation(); // Prevent triggering the card click event
            let productCard = button.closest('.product-card');
            let productId = button.getAttribute('data-product-id');
            let imgSrc = productCard.querySelector('img').src;
            let title = productCard.querySelector('h2').textContent;
            let price = productCard.querySelector('p').textContent;

            let cartItems = getCartItems();

            // Check if the item already exists in the cart
            let existingItem = cartItems.find(item => item.id === productId);

            if (existingItem) {
                // Increase quantity if item already exists
                existingItem.quantity += 1;
            } else {
                // Add new item with quantity 1
                cartItems.push({
                    id: productId,
                    imgSrc: imgSrc,
                    title: title,
                    price: price,
                    quantity: 1
                });
            }
            setCartItems(cartItems);

            cartCountElement.textContent = cartItems.length;
            alert('Item added to cart!');
        });
    });

    // Modal Functionality
    const modal = document.getElementById('product-modal');
    if (modal) {
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
                const productId = card.querySelector('.add-to-cart').getAttribute('data-product-id');

                modalImage.src = imgSrc;
                modalTitle.textContent = title;
                modalPrice.textContent = price;
                modalDescription.textContent = getProductDescription(productId);
                modalAddToCart.setAttribute('data-product-id', productId);

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
            let productId = modalAddToCart.getAttribute('data-product-id');
            let imgSrc = modalImage.src;
            let title = modalTitle.textContent;
            let price = modalPrice.textContent;

            let cartItems = getCartItems();

            // Check if the item already exists in the cart
            let existingItem = cartItems.find(item => item.id === productId);

            if (existingItem) {
                // Increase quantity if item already exists
                existingItem.quantity += 1;
            } else {
                // Add new item with quantity 1
                cartItems.push({
                    id: productId,
                    imgSrc: imgSrc,
                    title: title,
                    price: price,
                    quantity: 1
                });
            }
            setCartItems(cartItems);

            cartCountElement.textContent = cartItems.length;
            modal.style.display = 'none';
            alert('Item added to cart!');
        });
    }

    // Cart Page Functionality
    if (document.body.classList.contains('cart-page')) {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');
        const checkoutButton = document.getElementById('checkout-button');

        function updateCartDisplay() {
            cartItems = getCartItems();
            cartItemsContainer.innerHTML = '';
            let cartTotal = 0;

            if (cartItems.length > 0) {
                cartItems.forEach((item, index) => {
                    let itemPrice = parseFloat(item.price.replace(' Лв', '').replace(',', '.'));
                    let itemTotalPrice = itemPrice * item.quantity;
                    cartTotal += itemTotalPrice;

                    let cartItemDiv = document.createElement('div');
                    cartItemDiv.classList.add('cart-item');

                    cartItemDiv.innerHTML = `
                        <img src="${item.imgSrc}" alt="${item.title}">
                        <div class="cart-item-details">
                            <h2>${item.title}</h2>
                            <p>Price: ${item.price}</p>
                            <div class="quantity-control">
                                <button class="quantity-btn decrease" data-index="${index}">-</button>
                                <input type="number" min="1" value="${item.quantity}" data-index="${index}" readonly>
                                <button class="quantity-btn increase" data-index="${index}">+</button>
                            </div>
                            <p>Total: ${itemTotalPrice.toFixed(2)} Лв</p>
                            <button class="btn remove-item" data-index="${index}">Remove</button>
                        </div>
                    `;
                    cartItemsContainer.appendChild(cartItemDiv);
                });
                cartTotalElement.textContent = cartTotal.toFixed(2) + ' Лв';
                checkoutButton.style.display = 'block';
            } else {
                cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
                checkoutButton.style.display = 'none';
            }

            cartCountElement.textContent = cartItems.length;
        }

        updateCartDisplay();

        // Event delegation for quantity buttons and remove buttons
        cartItemsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('quantity-btn')) {
                let index = event.target.getAttribute('data-index');
                if (event.target.classList.contains('increase')) {
                    cartItems[index].quantity += 1;
                } else if (event.target.classList.contains('decrease')) {
                    if (cartItems[index].quantity > 1) {
                        cartItems[index].quantity -= 1;
                    }
                }
                setCartItems(cartItems);
                updateCartDisplay();
            }

            if (event.target.classList.contains('remove-item')) {
                let index = event.target.getAttribute('data-index');
                cartItems.splice(index, 1);
                setCartItems(cartItems);
                updateCartDisplay();
            }
        });

        // Checkout button functionality
        checkoutButton.addEventListener('click', () => {
            alert('Checkout successful! Thank you for your purchase.');
            localStorage.removeItem('cartItems');
            updateCartDisplay();
        });
    }

    // Product Descriptions
    function getProductDescription(productId) {
        const descriptions = {
            '1': 'A classic bouquet of fresh red roses.',
            '2': 'A vibrant bundle of colorful tulips.',
            '3': 'An arrangement of bright sunflowers to light up your day.',
            '4': 'A bouquet of elegant white lilies.',
            '5': 'Beautiful potted orchids, perfect for any occasion.',
            '6': 'A cheerful bundle of fresh daisies.',
            '7': 'A bouquet of lush hydrangeas.',
            '8': 'A mixed arrangement of seasonal flowers.'
            // Add more descriptions as needed
        };

        return descriptions[productId] || 'No description available.';
    }
});
