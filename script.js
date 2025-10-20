// Função para formatar preço em reais
function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
}

// Função para criar um card de produto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}" class="product-image" loading="lazy">
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <div class="product-price">${formatPrice(product.price)}</div>
            <a href="${product.permalink}" target="_blank" class="product-link">
                Ver no Mercado Livre
            </a>
        </div>
    `;

    return card;
}

// Função para carregar e exibir os produtos
async function loadProducts() {
    const productList = document.getElementById('product-list');

    try {
        // Mostrar loading
        productList.innerHTML = '<div class="loading">Carregando produtos...</div>';

        // Carregar dados dos produtos
        const response = await fetch('products_details.json');
        if (!response.ok) {
            throw new Error('Erro ao carregar dados dos produtos');
        }

        const products = await response.json();

        // Limpar loading
        productList.innerHTML = '';

        // Criar container grid
        const grid = document.createElement('div');
        grid.className = 'product-grid';

        // Adicionar cada produto
        products.forEach(product => {
            if (product.title && product.price && product.permalink) {
                const card = createProductCard(product);
                grid.appendChild(card);
            }
        });

        productList.appendChild(grid);

        // Adicionar contador de produtos
        const counter = document.createElement('p');
        counter.style.textAlign = 'center';
        counter.style.marginBottom = '2rem';
        counter.style.fontSize = '1.1rem';
        counter.style.color = '#666';
        counter.textContent = `${products.length} produtos encontrados`;
        productList.insertBefore(counter, grid);

    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        productList.innerHTML = `
            <div class="error">
                Erro ao carregar os produtos. Verifique se o arquivo products_details.json está disponível.
            </div>
        `;
    }
}

// Carregar produtos quando a página carregar
document.addEventListener('DOMContentLoaded', loadProducts);

