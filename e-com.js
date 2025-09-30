 // Sample product data
        const products = [
            {
                id: 1,
                name: "Art Silk Embroidered Kurta",
                price: 2499,
                category: "men",
                images: [
                    "https://images.unsplash.com/photo-1594938354285-ca2b3be604b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                ],
                rating: 4.5,
                reviewCount: 128,
                description: "This elegant men's silk kurta is perfect for festive occasions and weddings. Made from premium art silk fabric with intricate embroidery, it offers both comfort and style. The kurta features a modern fit that complements all body types and is available in a range of sizes from S to XXL.",
                features: ["100% Art Silk", "Handcrafted Embroidery", "Available in S to XXL", "Comfortable Fit", "Machine Washable", "Festive Ready"],
                reviews: [
                    {
                        name: "Rajesh Kumar",
                        rating: 5,
                        date: "2023-09-15",
                        content: "Excellent quality and perfect fit. The embroidery is beautiful and the fabric is very comfortable. Will definitely purchase again!"
                    },
                    {
                        name: "Amit Sharma",
                        rating: 4,
                        date: "2023-09-10",
                        content: "Good product but the delivery took longer than expected. The kurta quality is good though and fits well."
                    }
                ]
            },
            {
                id: 2,
                name: "Banarasi Silk Saree",
                price: 5999,
                category: "women",
                images: [
                    "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                ],
                rating: 4.0,
                reviewCount: 95,
                description: "A beautiful Banarasi silk saree with traditional prints and elegant drape, perfect for weddings and special occasions. The saree features intricate zari work and comes with a matching blouse piece. The rich fabric and detailed craftsmanship make this a timeless addition to your wardrobe.",
                features: ["Authentic Banarasi Silk", "Traditional Zari Work", "Elegant Drape", "Includes Matching Blouse", "Hand Wash Only", "Premium Packaging"],
                reviews: [
                    {
                        name: "Priya Patel",
                        rating: 4,
                        date: "2023-09-12",
                        content: "Beautiful saree, the color is exactly as shown. The fabric quality is good and the zari work is exquisite."
                    },
                    {
                        name: "Anjali Gupta",
                        rating: 5,
                        date: "2023-09-08",
                        content: "Absolutely stunning! Received many compliments when I wore it to a wedding. The drape is perfect and the fabric feels luxurious."
                    }
                ]
            }
        ];

        // Shopping cart
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // DOM elements
        const pages = document.querySelectorAll('.page');
        const navLinks = document.querySelectorAll('.nav-links a, .footer-links a');
        const cartLink = document.querySelector('.cart-link');
        const cartCount = document.querySelector('.cart-count');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinksContainer = document.querySelector('.nav-links');
        const productsContainer = document.querySelector('#products .products');
        const cartItemsContainer = document.querySelector('.cart-items');
        const checkoutBtn = document.querySelector('.checkout-btn');
        const addToCartButtons = document.querySelectorAll('.add-to-cart');

        // Initialize the application
        function init() {
            updateCartCount();
            loadProductsPage();
            setupEventListeners();
        }

        // Set up event listeners
        function setupEventListeners() {
            // Navigation
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const pageId = link.getAttribute('data-page');
                    if (pageId) {
                        showPage(pageId);
                    }
                    
                    // Close mobile menu if open
                    if (window.innerWidth <= 768) {
                        navLinksContainer.classList.remove('active');
                        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                    }
                });
            });

            // Mobile menu toggle
            mobileMenuBtn.addEventListener('click', () => {
                navLinksContainer.classList.toggle('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (navLinksContainer.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });

            // Cart link
            cartLink.addEventListener('click', (e) => {
                e.preventDefault();
                showPage('cart');
                updateCartPage();
            });

            // Add to cart buttons
            addToCartButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const productElement = e.target.closest('.product');
                    const productId = parseInt(productElement.getAttribute('data-id'));
                    addToCart(productId);
                });
            });

            // Product click events
            document.addEventListener('click', (e) => {
                const productElement = e.target.closest('.product');
                if (productElement) {
                    const productId = parseInt(productElement.getAttribute('data-id'));
                    showProductDetail(productId);
                }
                
                const categoryElement = e.target.closest('.category');
                if (categoryElement) {
                    const category = categoryElement.getAttribute('data-category');
                    showProductsByCategory(category);
                }
            });

            // Checkout button
            checkoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (cart.length > 0) {
                    alert('Checkout functionality would be implemented here in a real application.');
                } else {
                    alert('Your cart is empty. Add some products before checking out.');
                }
            });

            // Product detail page interactions
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('thumbnail')) {
                    // Remove active class from all thumbnails
                    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                    
                    // Add active class to clicked thumbnail
                    e.target.classList.add('active');
                    
                    // Update main image
                    document.querySelector('.main-image').src = e.target.src;
                }
                
                if (e.target.classList.contains('quantity-btn')) {
                    const quantityInput = document.querySelector('.quantity-input');
                    let value = parseInt(quantityInput.value);
                    
                    if (e.target.classList.contains('minus') && value > 1) {
                        quantityInput.value = value - 1;
                    } else if (e.target.classList.contains('plus')) {
                        quantityInput.value = value + 1;
                    }
                }
                
                if (e.target.classList.contains('add-to-cart-detail')) {
                    const productId = parseInt(document.querySelector('.product-detail').getAttribute('data-id'));
                    const quantity = parseInt(document.querySelector('.quantity-input').value);
                    addToCart(productId, quantity);
                }
            });

            // Back to products button
            const backToProductsBtn = document.querySelector('.back-to-products');
            if (backToProductsBtn) {
                backToProductsBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    showPage('products');
                });
            }
        }

        // Show specific page
        function showPage(pageId) {
            // Hide all pages
            pages.forEach(page => page.classList.remove('active'));
            
            // Show the requested page
            document.getElementById(pageId).classList.add('active');
        }

        // Show product detail page
        function showProductDetail(productId) {
            const product = products.find(p => p.id === productId);
            
            if (product) {
                // Update breadcrumb
                document.getElementById('product-category-breadcrumb').textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
                document.getElementById('product-name-breadcrumb').textContent = product.name;
                
                // Update product images
                const thumbnailList = document.querySelector('.thumbnail-list');
                thumbnailList.innerHTML = '';
                
                product.images.forEach((image, index) => {
                    const thumbnail = document.createElement('img');
                    thumbnail.src = image;
                    thumbnail.alt = `Thumbnail ${index + 1}`;
                    thumbnail.className = index === 0 ? 'thumbnail active' : 'thumbnail';
                    thumbnailList.appendChild(thumbnail);
                });
                
                // Update main image
                document.querySelector('.main-image').src = product.images[0];
                
                // Update product info
                document.getElementById('product-detail-name').textContent = product.name;
                document.getElementById('product-detail-price').textContent = `₹${product.price.toLocaleString('en-IN')}`;
                
                // Update rating
                const ratingStars = document.getElementById('product-detail-rating');
                ratingStars.innerHTML = generateStarRating(product.rating);
                
                document.getElementById('product-detail-rating-count').textContent = `(${product.reviewCount} reviews)`;
                
                // Update description
                document.getElementById('product-detail-description').textContent = product.description;
                
                // Update features
                const featuresList = document.getElementById('product-detail-features');
                featuresList.innerHTML = '';
                
                product.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    featuresList.appendChild(li);
                });
                
                // Set product ID on detail page for add to cart functionality
                document.querySelector('.product-detail').setAttribute('data-id', product.id);
                
                // Show product detail page
                showPage('product-detail');
            }
        }

        // Show products by category
        function showProductsByCategory(category) {
            showPage('products');
            // In a real application, we would filter products by category here
        }

        // Update cart count in header
        function updateCartCount() {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }

        // Add product to cart
        function addToCart(productId, quantity = 1) {
            const product = products.find(p => p.id === productId);
            
            if (product) {
                // Check if product is already in cart
                const existingItem = cart.find(item => item.id === productId);
                
                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    cart.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.images[0],
                        quantity: quantity
                    });
                }
                
                // Save to localStorage
                localStorage.setItem('cart', JSON.stringify(cart));
                
                // Update UI
                updateCartCount();
                
                // Show confirmation message
                alert(`Added ${quantity} ${product.name} to cart!`);
            }
        }

        // Load products page with all products
        function loadProductsPage() {
            productsContainer.innerHTML = '';
            
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product';
                productElement.setAttribute('data-id', product.id);
                
                productElement.innerHTML = `
                    <div class="product-img">
                        <div class="product-badge">New</div>
                        <img src="${product.images[0]}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-price">₹${product.price.toLocaleString('en-IN')}</div>
                        <div class="product-rating">
                            ${generateStarRating(product.rating)}
                            <span>(${product.reviewCount})</span>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                `;
                
                productsContainer.appendChild(productElement);
            });
        }

        // Generate star rating HTML
        function generateStarRating(rating) {
            let stars = '';
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 >= 0.5;
            
            for (let i = 0; i < fullStars; i++) {
                stars += '<i class="fas fa-star"></i>';
            }
            
            if (hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            }
            
            const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
            for (let i = 0; i < emptyStars; i++) {
                stars += '<i class="far fa-star"></i>';
            }
            
            return stars;
        }

        // Update cart page
        function updateCartPage() {
            cartItemsContainer.innerHTML = '';
            
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p style="text-align: center; padding: 40px; color: #666;">Your cart is empty. Start shopping to add items!</p>';
                document.querySelector('.subtotal').textContent = '₹0.00';
                document.querySelector('.tax').textContent = '₹0.00';
                document.querySelector('.total').textContent = '₹0.00';
                return;
            }
            
            let subtotal = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h3 class="cart-item-title">${item.name}</h3>
                        <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
                        <div class="cart-item-actions">
                            <button class="quantity-btn minus" data-id="${item.id}">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn plus" data-id="${item.id}">+</button>
                            <span class="remove-item" data-id="${item.id}">Remove</span>
                        </div>
                    </div>
                `;
                
                cartItemsContainer.appendChild(cartItemElement);
            });
            
            // Calculate totals
            const shipping = 50.00;
            const tax = subtotal * 0.18; // 18% GST
            const total = subtotal + shipping + tax;
            
            // Update totals in UI
            document.querySelector('.subtotal').textContent = `₹${subtotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;
            document.querySelector('.tax').textContent = `₹${tax.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;
            document.querySelector('.total').textContent = `₹${total.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;
            
            // Add event listeners to cart item buttons
            document.querySelectorAll('.cart-item-actions .minus').forEach(button => {
                button.addEventListener('click', () => {
                    const productId = parseInt(button.getAttribute('data-id'));
                    updateCartItemQuantity(productId, -1);
                });
            });
            
            document.querySelectorAll('.cart-item-actions .plus').forEach(button => {
                button.addEventListener('click', () => {
                    const productId = parseInt(button.getAttribute('data-id'));
                    updateCartItemQuantity(productId, 1);
                });
            });
            
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', () => {
                    const productId = parseInt(button.getAttribute('data-id'));
                    removeFromCart(productId);
                });
            });
        }

        // Update cart item quantity
        function updateCartItemQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            
            if (item) {
                item.quantity += change;
                
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartCount();
                    updateCartPage();
                }
            }
        }

        // Remove item from cart
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            updateCartPage();
        }

        // Initialize the application
        init();