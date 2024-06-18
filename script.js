function updateCart() {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update the cart list
    cartList.innerHTML = '';
    let total = 0;
    cartItems.forEach((item, index) => {
        if(item.name!== "Shopping Cart"){
            const cartItem = document.createElement('li');
            cartItem.textContent = `${item.name} - $${item.price}`;
            cartItem.innerHTML += ` <button class="remove-btn" data-index="${index}">Remove</button>`;
            cartList.appendChild(cartItem);

            // Update the total price
            total += parseFloat(item.price.slice(1));
        }
    });

    // Update the cart total
    cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
}

// Add event listener to cart buttons
document.querySelectorAll('button.add').forEach(button => {
    button.addEventListener('click', () => {
        // Get the product name and price
        const productName = button.parentNode.querySelector('h2').textContent;
        const productPrice = button.parentNode.querySelector('p').textContent;

        // Add the product to the cart
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems.push({ name: productName, price: productPrice });
        localStorage.setItem('cart', JSON.stringify(cartItems));

        // Update the cart
        updateCart();
    });
});

// Event delegation for remove buttons
document.getElementById('cart-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-btn')) {
        // Get the index of the item to remove
        const index = event.target.getAttribute('data-index');

        // Remove the product from the cart
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cartItems));

        // Update the cart
        updateCart();
    }
});

// Initial cart update on page load
updateCart();