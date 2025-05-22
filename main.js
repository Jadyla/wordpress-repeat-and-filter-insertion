document.addEventListener("DOMContentLoaded", async function () {
  const sheet = 'https://docs.google.com/spreadsheets/d/1Xr3zBjYQYFV9ACutlksbecSY3T5fWnkQAHGoob5juLo/edit'
  const sheet2JsonUrl = 'https://api.sheets2json.com/v1/doc/?url='
  let musicasArray = []

  // TODO: get all tabs
  const tabs = [
    ['Entrada do noivo', 'entrada_noivo'],
    ['Entrada dos pais', 'entrada_pais'],
    ['Entrada da noiva', 'entrada_noiva'],
    ['Entrada das alianças', 'entrada_aliancas'],
    ['Entrada dos padrinhos', 'entrada_padrinhos'],
    ['Entrada de plaquinha ou florist', 'floristas']
  ]
  for (let i = 0; i < tabs.length; i++) {
    const tab = tabs[i][0];
    const key = tabs[i][1]
    const musicas = await fetch(sheet2JsonUrl + `${sheet}&sheet=${tab}`).then(res => res.json())
    musicasArray = [...musicasArray, ...musicas.slice(1).map(m => [...m, key])]
  }

  // TODO: get imagem or generate random
  const musicas = musicasArray
    .map(m => ({ nome: m?.[0], momento: m?.[8], descricao: m?.[1], estilo: m?.[2], artista: m?.[4], video: m?.[5] || '', imagem: '' }))
    .filter((m) => m.nome && m.momento && m.descricao && m.estilo && m.artista)

  // Container principal
  const titleElement = document.getElementById("title");
  if (!titleElement) return;

  const containerPrincipal = document.createElement("div");
  containerPrincipal.id = "playlist-container";

  titleElement.insertAdjacentElement("afterend", containerPrincipal);

  // Filtros
  const filtroWrapper = document.createElement("div");
  filtroWrapper.className = "filtro-wrapper";

  const select = document.createElement("select");
  select.id = "filtro-estilo";
  select.className = "select-filtro";
  const opt = document.createElement("option");
  opt.value = "";
  opt.textContent = "Selecionar";
  select.appendChild(opt);

  const estilosUnicos = [...new Set(musicas.map(m => m.estilo.toUpperCase()))];
  estilosUnicos.forEach(estilo => {
    const estiloSplited = estilo.split('/')
    estiloSplited.forEach(v => {
      const opt = document.createElement("option");
      opt.value = v.trim();
      opt.textContent = v.trim();
      select.appendChild(opt);
    })
  });

  const botaoFiltrar = document.createElement("button");
  botaoFiltrar.textContent = "Filtrar";
  botaoFiltrar.className = "botao-filtrar";

  const botaoReset = document.createElement("button");
  botaoReset.textContent = "Todos";
  botaoReset.className = "botao-reset";

  filtroWrapper.appendChild(select);
  filtroWrapper.appendChild(botaoFiltrar);
  filtroWrapper.appendChild(botaoReset);

  const searchTextContainer = document.createElement("div");
  searchTextContainer.className = "search-text-wrapper";

  const inputSearchText = document.createElement("input");
  inputSearchText.id = "input-search-text";
  inputSearchText.type = "text"
  inputSearchText.placeholder = "Pesquisar..."
  inputSearchText.className = "input-search-text";

  searchTextContainer.appendChild(inputSearchText);

  containerPrincipal.appendChild(searchTextContainer);

  inputSearchText.addEventListener("input", (e) => {
    if (select.selectedIndex)
      select.remove(select.selectedIndex);
    const otherElements = Array.from(momentDiv.children);
    otherElements?.forEach(el => el.className = '')
    const value = e.target.value;
    const filtradas = musicas.filter(m => m.nome.toLowerCase().includes(value.toLowerCase())
      || m.descricao.toLowerCase().includes(value.toLowerCase()));
    renderizarMusicas(containerPrincipal, filtradas, containerLista);
  });

  containerPrincipal.appendChild(filtroWrapper);

  botaoFiltrar.addEventListener("click", () => {
    const otherElements = Array.from(momentDiv.children);
    const selected = otherElements?.find(el => Array.from(el.classList).some(el => el === 'selected'))?.id || ''
    console.log(selected)
    inputSearchText.value = ""
    const estiloSelecionado = select.value;
    const filtradas = musicas.filter(m => m.estilo.toLowerCase().includes(estiloSelecionado.toLowerCase()) && m.momento.includes(selected));
    renderizarMusicas(containerPrincipal, filtradas, containerLista);
  });

  botaoReset.addEventListener("click", () => {
    const otherElements = Array.from(momentDiv.children);
    otherElements?.forEach(el => el.className = '')
    inputSearchText.value = ""
    renderizarMusicas(containerPrincipal, musicas, containerLista);
  });

  // Container de Lista de Musicas e Momentos
  const container = document.createElement("div");
  container.className = "container-musicas";
  containerPrincipal.appendChild(container);

  // Lista de Musicas
  const containerLista = document.createElement("div");
  containerLista.id = "lista-musicas";
  containerLista.className = "lista-musicas";
  container.appendChild(containerLista);

  // Momentos
  const momentDiv = document.createElement("div");
  momentDiv.className = "moment-musicas";
  container.appendChild(momentDiv);

  criaBotaoMomento(momentDiv, "ENTRADA DO NOIVO", "entrada_noivo.png", "entrada_noivo")
  criaBotaoMomento(momentDiv, "ENTRADA DOS PAIS", "entrada_pais.png", "entrada_pais")
  criaBotaoMomento(momentDiv, "ENTRADA DA NOIVA", "entrada_noiva-scaled.jpg", "entrada_noiva")
  criaBotaoMomento(momentDiv, "ENTRADA DAS ALIANÇAS", "entrada_aliancas-scaled.jpg", "entrada_aliancas")
  criaBotaoMomento(momentDiv, "ENTRADA DOS PADRINHOS", "entrada_padrinhos-scaled.jpg", "entrada_padrinhos")
  criaBotaoMomento(momentDiv, "FLORISTAS", "floristas-scaled.jpg", "floristas")
  // TODO: Adicionar mais momentos

  renderizarMusicas(containerPrincipal, musicas, containerLista);
});

function renderizarMusicas(containerPrincipal, lista, containerLista, paginaAtual = 1, itensPorPagina = 6) {
  containerLista.innerHTML = "";

  if (!lista) return

  const totalPaginas = Math.ceil(lista.length / itensPorPagina);
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const paginaMusicas = lista?.slice(inicio, fim);


  paginaMusicas.forEach((musica) => {
    const item = document.createElement("div");
    const defaultMusicUrl = 'https://institutomusicaldanilomenezes.com/wp-content/uploads/2025/05/entrada_aliancas-scaled.jpg'
    item.className = "musica-card";

    item.innerHTML = `
      <img src="${musica.imagem || defaultMusicUrl}" alt="${musica.nome}">
      <div class="info">
        <h3>${musica.nome}</h3>
        <p>${musica.descricao.length > 75 ? (musica.descricao.substring(0, 75) + '...') : musica.descricao}</p>
        <p><strong>Tags:</strong> ${musica.artista}</p>
        <div class="botoes">
          <span class="estilo-tag">${musica.estilo}</span>
          ${musica?.video ? '<a href="' + musica.video + '" target="_blank">Assistir vídeo</a>' : ''}
        </div>
      </div>
    `;
    containerLista.appendChild(item);
  });

  // Paginação
  const paginacao = document.getElementById("paginacao") || document.createElement("div");
  paginacao.innerHTML = "";
  paginacao.className = "paginacao";
  paginacao.id = "paginacao";

  for (let i = 1; i <= totalPaginas; i++) {
    const botao = document.createElement("button");
    botao.textContent = i;
    botao.className = "botao-pagina";
    if (i === paginaAtual) {
      botao.classList.add("ativo");
    }
    botao.addEventListener("click", () => {
      renderizarMusicas(containerPrincipal, lista, containerLista, i, itensPorPagina);
    });
    paginacao.appendChild(botao);
  }

  containerPrincipal.insertAdjacentElement("afterend", paginacao);
}

function criaBotaoMomento(momentDiv, txt, img, id) {
  const el = document.createElement("div");
  const elImg = document.createElement("img");
  const elSpan = document.createElement("spam");
  elSpan.innerHTML = txt
  elImg.src = `https://institutomusicaldanilomenezes.com/wp-content/uploads/2025/05/${img}`
  el.id = id
  el.appendChild(elImg)
  el.appendChild(elSpan)
  momentDiv.appendChild(el);
  el.addEventListener("click", () => {
    const otherElements = Array.from(momentDiv.children);
    otherElements?.forEach(el => {
      if (el.id !== id) el.className = ''
    })
    if (Array.from(el.classList).some(el => el === 'selected')) {
      el.className = ''
    } else {
      el.className = 'selected'
    }
  });
}