document.addEventListener("DOMContentLoaded", function () {
  const musicas = [
    {
      nome: "Stand by Me",
      estilo: "Moderna",
      artista: "Banda A",
      video: "https://www.youtube.com/watch?v=xxxxxx",
      imagem: "https://picsum.photos/400/300"
    },
    {
      nome: "Stand by Me",
      estilo: "Cristã",
      artista: "Cantora B",
      video: "https://www.youtube.com/watch?v=yyyyyy",
      imagem: "https://picsum.photos/400/300"
    },
    {
      nome: "Stand by Me",
      estilo: "Pop",
      artista: "Artista C",
      video: "https://www.youtube.com/watch?v=zzzzzz",
      imagem: "https://picsum.photos/400/300"
    },
    {
      nome: "Stand by Me",
      estilo: "Moderna",
      artista: "Banda A",
      video: "https://www.youtube.com/watch?v=xxxxxx",
      imagem: "https://picsum.photos/400/300"
    },
    {
      nome: "Stand by Me",
      estilo: "Cristã",
      artista: "Cantora B",
      video: "https://www.youtube.com/watch?v=yyyyyy",
      imagem: "https://picsum.photos/400/300"
    },
    {
      nome: "Stand by Me",
      estilo: "Pop",
      artista: "Artista C",
      video: "https://www.youtube.com/watch?v=zzzzzz",
      imagem: "https://picsum.photos/400/300"
    },
    {
      nome: "Stand by Me",
      estilo: "Moderna",
      artista: "Banda A",
      video: "https://www.youtube.com/watch?v=xxxxxx",
      imagem: "https://picsum.photos/400/300"
    },
    {
      nome: "Stand by Me",
      estilo: "Cristã",
      artista: "Cantora B",
      video: "https://www.youtube.com/watch?v=yyyyyy",
      imagem: "https://picsum.photos/400/300"
    },
    {
      nome: "Stand by Me",
      estilo: "Pop",
      artista: "Artista C",
      video: "https://www.youtube.com/watch?v=zzzzzz",
      imagem: "https://picsum.photos/400/300"
    },
    {
      nome: "Stand by Me",
      estilo: "Moderna",
      artista: "Banda A",
      video: "https://www.youtube.com/watch?v=xxxxxx",
      imagem: "https://picsum.photos/400/300"
    },
    {
      nome: "Stand by Me",
      estilo: "Cristã",
      artista: "Cantora B",
      video: "https://www.youtube.com/watch?v=yyyyyy",
      imagem: "https://picsum.photos/400/300"
    },
    {
      nome: "Stand by Me",
      estilo: "Pop",
      artista: "Artista C",
      video: "https://www.youtube.com/watch?v=zzzzzz",
      imagem: "https://picsum.photos/400/300"
    }
  ];

  const titleElement = document.getElementById("title");
  if (!titleElement) return;

  const containerPrincipal = document.createElement("div");
  containerPrincipal.id = "playlist-container";

  const filtroWrapper = document.createElement("div");
  filtroWrapper.className = "filtro-wrapper";

  const select = document.createElement("select");
  select.id = "filtro-estilo";
  select.className = "select-filtro";

  const estilosUnicos = [...new Set(musicas.map(m => m.estilo))];
  estilosUnicos.forEach(estilo => {
    const opt = document.createElement("option");
    opt.value = estilo;
    opt.textContent = estilo;
    select.appendChild(opt);
  });

  const botaoFiltrar = document.createElement("button");
  botaoFiltrar.textContent = "Filtrar";
  botaoFiltrar.className = "botao-filtrar";

  const botaoReset = document.createElement("button");
  botaoReset.textContent = "Mostrar todos";
  botaoReset.className = "botao-reset";

  filtroWrapper.appendChild(select);
  filtroWrapper.appendChild(botaoFiltrar);
  filtroWrapper.appendChild(botaoReset);
  containerPrincipal.appendChild(filtroWrapper);

  const container = document.createElement("div");
  container.className = "container-musicas";
  containerPrincipal.appendChild(container);

  const momentDiv = document.createElement("div");
  momentDiv.className = "moment-musicas";
  container.appendChild(momentDiv);


  const containerLista = document.createElement("div");
  containerLista.id = "lista-musicas";
  containerLista.className = "lista-musicas";
  container.appendChild(containerLista);

  titleElement.insertAdjacentElement("afterend", containerPrincipal);

  function renderizarMusicas(lista) {
    containerLista.innerHTML = "";
    lista.forEach((musica) => {
      const item = document.createElement("div");
      item.className = "musica-card";

      item.innerHTML = `
        <img src="${musica.imagem}" alt="${musica.nome}">
        <div class="info">
          <h3>${musica.nome}</h3>
          <p><strong>Estilo:</strong> ${musica.estilo}</p>
          <p><strong>Artista:</strong> ${musica.artista}</p>
          <div class="botoes">
            <span class="estilo-tag">${musica.estilo}</span>
            <a href="${musica.video}" target="_blank">Assistir vídeo</a>
          </div>
        </div>
      `;
      containerLista.appendChild(item);
    });
  }

  renderizarMusicas(musicas);

  botaoFiltrar.addEventListener("click", () => {
    const estiloSelecionado = select.value;
    const filtradas = musicas.filter(m => m.estilo === estiloSelecionado);
    renderizarMusicas(filtradas);
  });

  botaoReset.addEventListener("click", () => {
    renderizarMusicas(musicas);
  });
});
