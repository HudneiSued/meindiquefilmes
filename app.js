function init(SeletorFilme, seletorAutor) {
    const filme = document.querySelector(SeletorFilme);
    const autor = document.querySelector(seletorAutor);
    const body = document.querySelector('body');

    const btns = {
        action: document.getElementById('action'),
        romance: document.getElementById('romance'),
        comedy: document.getElementById('comedy')
    };

    async function fetchFilme(genero) {
        try {
            const response = await fetch(`./movies/${genero}.json`);
            const filmes = await response.json();
            const aleatorio = filmes[Math.floor(Math.random() * filmes.length)];

            filme.innerText = aleatorio.movie;
            autor.innerText = aleatorio.director;

            gradientColor();
        } catch (erro) {
            console.error(`Erro ao carregar filmes de ${genero}:`, erro);
            alert(`Erro ao carregar filmes de ${genero}:`, erro);
        }
    }

    async function gradientColor() {
        try {
            const colorsResponse = await fetch('./colors.json');
            const colorsJSON = await colorsResponse.json();
            const aleatorioColors = colorsJSON[Math.floor(Math.random() * colorsJSON.length)].color;
            body.style.background = aleatorioColors;
        } catch (erro) {
            console.error("Erro ao carregar cores:", erro);
        }
    }

    // Adiciona eventos para cada botão
    Object.keys(btns).forEach(genero => {
        if (btns[genero]) {
            btns[genero].addEventListener('click', () => fetchFilme(genero));
        }
    });

    // Carrega um filme de ação por padrão ao entrar
    fetchFilme('action');
}

// Inicializa o app
init('.filme', '.autor');
