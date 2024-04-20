


document.addEventListener("DOMContentLoaded", function () {
    // Fetch product data from JSON
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448')
      .then(response => response.json())
      .then(data => {
        const product = data.product;
  
        // Update product details
        document.querySelector(".product_title").textContent = product.vendor;
        document.querySelector(".description").textContent = product.description;
        document.querySelector(".product_title1").textContent = product.title;
        document.querySelector(".main_price").textContent = product.price;
        document.querySelector(".actual_price").textContent = product.compare_at_price;

        const mainImg = document.querySelector('.main_img');
            const imgList = document.querySelectorAll('.img_list');

            imgList.forEach((img, index) => {
                img.addEventListener('click', function () {

                    const imgUrl = this.style.backgroundImage.slice(4, index).replace(/"/g, "");
                    mainImg.style.background= `url('${imgUrl}')`;
                

                });
            });
  
    
  
        // Update color options
        const colors = product.options.find(option => option.name === 'Color').values;
        const colorsContainer = document.querySelector('.colors');
        colors.forEach(color => {
            const colorName = Object.keys(color)[0];

          const colorOption = document.createElement('div');
          colorOption.className = 'color_option';
          colorOption.style.backgroundColor = color[colorName];
          colorOption.dataset.color = colorName;
          colorOption.addEventListener('click', function() {
            // Remove selected class from all color options
            colorsContainer.querySelectorAll('.color_option').forEach(option => option.classList.remove('selected'));
            // Add selected class to the clicked color option
            this.classList.add('selected');
          });
          colorsContainer.appendChild(colorOption);
        });
        // Update size options
        const sizes = product.options.find(option => option.name === 'Size').values;
        const sizeContainer = document.querySelector('.size_options');
        sizes.forEach(size => {
            const sizeOption = document.createElement('input');
            sizeOption.type = 'radio';
            sizeOption.name = 'size';
            sizeOption.value = size;
            sizeOption.id = size;
            const sizeLabel = document.createElement('label');
            sizeLabel.textContent = size;
            sizeLabel.htmlFor = size;
            sizeContainer.appendChild(sizeOption);
            sizeContainer.appendChild(sizeLabel);
        });

        // Calculate discount based on price and actual price
        const mainPrice = parseFloat(product.price.substring(1));
        const actualPrice = parseFloat(product.compare_at_price.substring(1));
        const discountPercentage = ((actualPrice - mainPrice) / actualPrice) * 100;
        // Update product price with discount applied
        document.querySelector(".main_price").textContent = `$${mainPrice.toFixed(2)} (-${discountPercentage.toFixed(2)}%)`;
        // Update cart success message with selected color and size
  
        // Add event listener to add to cart button
        const addToCartButton = document.querySelector('.add_cart');
        addToCartButton.addEventListener('click', function() {
          const selectedColor = document.querySelector('.color_option.selected');
          const selectedSize = document.querySelector('.size_options input[type="radio"]:checked');
          if (!selectedColor || !selectedSize) {
            alert('Please select color and size');
            return;
          }
          const color = selectedColor.dataset.color;
          const size = selectedSize.value;
          console.log(color);
          console.log(size);
          const message = `Embrace Sideboard with Color ${color} and Size ${size} added to cart`;
          document.querySelector('.cart_success p').textContent = message;
          document.querySelector('.cart_success').style.display = 'block';
        });
      })
      .catch(error => console.error('Error fetching product data:', error));
  });
  