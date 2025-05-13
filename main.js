document.addEventListener("DOMContentLoaded", function () {
  // Lista de músicas
  const musicas = [
    {
      nome: "Música 1",
      estilo: "Rock",
      artista: "Banda A",
      video: "https://www.youtube.com/watch?v=xxxxxx"
    },
    {
      nome: "Música 2",
      estilo: "Pop",
      artista: "Cantora B",
      video: "https://www.youtube.com/watch?v=yyyyyy"
    },
    {
      nome: "Música 3",
      estilo: "Rap",
      artista: "Artista C",
      video: "https://www.youtube.com/watch?v=zzzzzz"
    }
  ];

  // Encontra o elemento com ID "title"
  const titleElement = document.getElementById("title");
  if (!titleElement) return;

  // Cria o container
  const container = document.createElement("div");
  container.id = "lista-musicas";

  // Gera o conteúdo
  musicas.forEach((musica) => {
    const item = document.createElement("div");
    item.className = "musica";
    item.innerHTML = `
      <h3>${musica.nome}</h3>
      <p><strong>Estilo:</strong> ${musica.estilo}</p>
      <p><strong>Artista:</strong> ${musica.artista}</p>
      <p><a href="${musica.video}" target="_blank">Ver vídeo</a></p>
    `;
    container.appendChild(item);
  });

  // Insere depois do elemento com ID "title"
  titleElement.insertAdjacentElement("afterend", container);
});
