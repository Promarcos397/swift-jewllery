document.addEventListener('DOMContentLoaded', () => {

    // product data
    const products = [
        { id: 1, name: "Solitaire Diamond Ring", price: 2450, image: "assets/images/solitaire_ring.webp", category: "rings" },
        { id: 2, name: "Classic Tennis Bracelet", price: 3800, image: "assets/images/tennis_bracelet.webp", category: "bracelets" },
        { id: 3, name: "Diamond Stud Earrings", price: 1200, image: "assets/images/diamond_earrings.webp", category: "earrings" },
        { id: 4, name: "Solitaire Pendant", price: 1550, image: "assets/images/silver_pendant.webp", category: "necklaces" },
        { id: 5, name: "Men's Silver Band", price: 1200, image: "assets/images/mens_ring.webp", category: "rings" },
        { id: 6, name: "Diamond Solitaire Pendant", price: 2450, image: "assets/images/womens_necklace_2.webp", category: "necklaces" },
        { id: 7, name: "South Sea Pearl Bracelet", price: 1450, image: "assets/images/pearl_bracelet.webp", category: "bracelets" },
        { id: 8, name: "Pearl Stud Earrings", price: 950, image: "assets/images/pearl_earrings.webp", category: "earrings" },
        { id: 9, name: "Diamond Pavé Curved Barbell", price: 650, image: "assets/images/diamond_piercing.webp", category: "earrings" },
        { id: 10, name: "Diamond Huggie Hoop", price: 850, image: "assets/images/diamond_huggie.webp", category: "earrings" },
        { id: 11, name: "Radiant Pear Cut Necklace", price: 5200, image: "assets/images/womens_necklace.webp", category: "necklaces" },
        { id: 12, name: "Pearl Huggie Hoop", price: 750, image: "assets/images/pearl_huggie.webp", category: "earrings" }
    ];

    // rendering logic

    function renderProductCard(product) {
        return `
        <div class="product-card" data-category="${product.category}" data-id="${product.id}">
            <div style="cursor: pointer;">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">£${product.price.toLocaleString()}</p>
                </div>
            </div>
            <button class="add-to-bag-btn" data-id="${product.id}">Add to Bag</button>
        </div>
        `;
    }

    const featuredContainer = document.getElementById('featured-products-grid');
    const collectionContainer = document.getElementById('all-products-grid');

    if (featuredContainer) {
        // show first 10 on homepage
        const featuredProducts = products.slice(0, 10);
        featuredContainer.innerHTML = featuredProducts.map(renderProductCard).join('');
    }

    if (collectionContainer) {
        // render all for collections page
        collectionContainer.innerHTML = products.map(renderProductCard).join('');
    }

    // cart state
    let cart = JSON.parse(localStorage.getItem('userCart')) || [];

    // ui elements
    const bagNav = document.querySelector('.nav-right .nav-link:last-child');
    const body = document.body;

    // initial update
    updateCartUI();

    // functions

    function saveCart() {
        localStorage.setItem('userCart', JSON.stringify(cart));
        updateCartUI();
    }

    function updateCartUI() {
        // update bag count in nav
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (bagNav) bagNav.textContent = `Bag (${totalItems})`;

        // render cart page items
        const cartPageContainer = document.querySelector('.cart-page-items');
        const cartPageTotal = document.querySelector('.cart-page-total');
        const fullCartContent = document.getElementById('full-cart-content');
        const emptyCartMessage = document.getElementById('empty-cart-message');
        const cartSubtotal = document.getElementById('cart-subtotal');

        if (cartPageContainer) {
            const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const formattedTotal = `£${totalPrice.toLocaleString()}`;

            if (cart.length === 0) {
                if (fullCartContent) fullCartContent.style.display = 'none';
                if (emptyCartMessage) emptyCartMessage.style.display = 'block';
            } else {
                if (fullCartContent) fullCartContent.style.display = 'block';
                if (emptyCartMessage) emptyCartMessage.style.display = 'none';

                cartPageContainer.innerHTML = cart.map((item) => `
                    <tr>
                        <td class="product-col">
                            <div class="product-flex">
                                <img src="${item.image || 'assets/images/placeholder.webp'}" alt="${item.name}">
                                <div>
                                    <p class="product-name">${item.name}</p>
                                    <p class="product-price">£${item.price.toLocaleString()}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="quantity-controls">
                                <button class="qty-btn minus" data-id="${item.id}">-</button>
                                <span class="qty-display">${item.quantity}</span>
                                <button class="qty-btn plus" data-id="${item.id}">+</button>
                            </div>
                        </td>
                        <td class="total-col">£${(item.price * item.quantity).toLocaleString()}</td>
                        <td><span class="remove-item" data-id="${item.id}" style="cursor:pointer; font-size: 1.2rem;">&times;</span></td>
                    </tr>
                `).join('');
            }
            // update total on cart page
            if (cartPageTotal) {
                cartPageTotal.textContent = formattedTotal;
            }
            if (cartSubtotal) {
                cartSubtotal.textContent = formattedTotal;
            }
        }
    }

    function addToCart(productId) {
        const product = products.find(p => p.id == productId);
        if (!product) return;

        const existingItem = cart.find(item => item.id == productId);
        if (existingItem) {
            if (existingItem.quantity < 3) {
                existingItem.quantity += 1;
            } else {
                window.showToast("Limit reached: max 3 per item.");
                return;
            }
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        saveCart();
        window.showToast("Added to Bag");
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id != productId);
        saveCart();
    }

    function updateQuantity(productId, change) {
        const item = cart.find(item => item.id == productId);
        if (item) {
            const newQuantity = item.quantity + change;

            if (newQuantity > 3) {
                window.showToast("Limit reached: max 3 per item.");
                return;
            }

            if (newQuantity <= 0) {
                removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                saveCart();
            }
        }
    }

    // modal logic
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="product-modal">
            <div class="modal-close">&times;</div>
            <div class="modal-image">
                <img src="" alt="Product">
            </div>
            <div class="modal-info">
                <p class="modal-category">Category</p>
                <h2 class="modal-title">Product Name</h2>
                <p class="modal-price">£0</p>
                <p class="modal-description">
                    Expertly crafted with the finest materials, this piece embodies the essence of Luxury Lune. 
                    A timeless addition to any collection, designed to catch the light and the eye.
                </p>
                <button class="add-to-bag-btn modal-add-btn" style="width: 100%;">Add to Bag</button>
            </div>
        </div>
    `;
    body.appendChild(modalOverlay);

    const modalImg = modalOverlay.querySelector('img');
    const modalCategory = modalOverlay.querySelector('.modal-category');
    const modalTitle = modalOverlay.querySelector('.modal-title');
    const modalPrice = modalOverlay.querySelector('.modal-price');
    const modalAddBtn = modalOverlay.querySelector('.modal-add-btn');
    const modalClose = modalOverlay.querySelector('.modal-close');

    function openModal(product) {
        modalImg.src = product.image;
        modalCategory.textContent = product.category;
        modalTitle.textContent = product.name;
        modalPrice.textContent = `£${product.price.toLocaleString()}`;
        modalAddBtn.setAttribute('data-id', product.id);

        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // event listeners

    body.addEventListener('click', (e) => {
        // product card clicks and modal triggers
        if (e.target.closest('.product-card') && !e.target.classList.contains('add-to-bag-btn')) {
            const card = e.target.closest('.product-card');
            const id = card.getAttribute('data-id');
            const product = products.find(p => p.id == id);
            if (product) {
                openModal(product);
            }
        }

        // add to bag
        if (e.target.classList.contains('add-to-bag-btn') || e.target.classList.contains('modal-add-btn')) {
            const id = e.target.getAttribute('data-id');
            addToCart(id);
            if (e.target.classList.contains('modal-add-btn')) {
                closeModal();
            }
        }

        // remove item from cart
        if (e.target.classList.contains('remove-item')) {
            const id = e.target.getAttribute('data-id');
            removeFromCart(id);
        }

        // quantity controls
        if (e.target.classList.contains('qty-btn')) {
            const id = e.target.getAttribute('data-id');
            if (e.target.classList.contains('plus')) {
                updateQuantity(id, 1);
            } else if (e.target.classList.contains('minus')) {
                updateQuantity(id, -1);
            }
        }
    });

    // collection page filtering
    const filterLinks = document.querySelectorAll('.filter-nav a');
    if (filterLinks.length > 0 && collectionContainer) {
        filterLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // active state
                filterLinks.forEach(l => l.classList.remove('active'));
                const elem = e.target;
                elem.classList.add('active');

                const category = elem.textContent.toLowerCase();

                // filter products
                if (category === 'all') {
                    collectionContainer.innerHTML = products.map(renderProductCard).join('');
                } else {
                    const filtered = products.filter(p => p.category === category);
                    collectionContainer.innerHTML = filtered.map(renderProductCard).join('');
                }
            });
        });
    }

    // newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            if (email) {
                window.showToast(`Subscribed: ${email}`);
                newsletterForm.reset();
            }
        });
    }

    // mobile menu
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileClose = document.querySelector('.close-mobile-menu');

    function toggleMobileMenu() {
        if (mobileNav) mobileNav.classList.toggle('open');
        if (mobileOverlay) mobileOverlay.classList.toggle('open');
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
    if (mobileClose) {
        mobileClose.addEventListener('click', toggleMobileMenu);
    }
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', toggleMobileMenu);
    }
});

// toast notification
window.showToast = function (message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
};
