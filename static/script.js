document.addEventListener('DOMContentLoaded', function() {
    // Captura o formulário de busca
    const searchForm = document.getElementById('searchForm');

    // Adiciona um listener para o evento de submit do formulário
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o comportamento padrão do formulário

        // Captura o texto digitado pelo usuário na barra de pesquisa
        const searchInput = document.getElementById('buscaInput').value;

        // Realiza uma solicitação AJAX para o servidor Flask
        fetch('/search_movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `searchQuery=${searchInput}`
        })
        .then(response => response.json())
        .then(data => {
            // Limpa a lista de recomendações de filmes
            const recomendacaoLista = document.getElementById('recomendacaoLista');
            recomendacaoLista.innerHTML = '';
        
            // Verifica se há resultados de busca
            if (data.results && data.results.length > 0) {
                // Itera sobre os resultados de busca e os exibe na página
                data.results.forEach(filme => {
                    const filmeElement = document.createElement('div');
                    filmeElement.classList.add('filme');
                    filmeElement.innerHTML = `
                        <img src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" alt="${filme.title}">
                        <h3>${filme.title}</h3>
                        <p>${filme.overview}</p>
                    `;
                    recomendacaoLista.appendChild(filmeElement);
                });
            } else {
                // Se não houver resultados, exibe uma mensagem de erro
                const errorMessage = document.createElement('p');
                errorMessage.textContent = 'Nenhum filme encontrado.';
                recomendacaoLista.appendChild(errorMessage);
            }
        })
        
        .catch(error => {
            console.error('Erro:', error);
        });
    });
});
