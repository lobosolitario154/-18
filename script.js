// Exibir anúncios na index.html
if (document.getElementById("anuncios")) {
  const anuncios = JSON.parse(localStorage.getItem("anuncios")) || [];
  const container = document.getElementById("anuncios");

  anuncios.forEach((anuncio, i) => {
    const div = document.createElement("div");
    div.className = "anuncio";
    div.innerHTML = `
      <p>${anuncio.legenda}</p>
      <div class="carousel" id="carousel-${i}">
        ${anuncio.fotos.map((f, j) => `<img src="${f}" class="${j === 0 ? 'active' : ''}">`).join("")}
      </div>
      <a href="https://wa.me/${anuncio.whatsapp}" target="_blank">📱 WhatsApp</a>
    `;
    container.appendChild(div);

    // Carrossel automático
    let index = 0;
    const imgs = div.querySelectorAll("img");
    setInterval(() => {
      imgs.forEach((img, j) => img.classList.toggle("active", j === index));
      index = (index + 1) % imgs.length;
    }, 3000);
  });
}

// Formulário de cadastro
if (document.getElementById("form")) {
  document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();
    const form = e.target;
    const whatsapp = form.whatsapp.value;
    const legenda = form.legenda.value;
    const files = form.fotos.files;

    if (files.length > 4) {
      alert("Máximo de 4 fotos.");
      return;
    }

    const readerPromises = Array.from(files).map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readerPromises).then(fotos => {
      const anuncio = { whatsapp, legenda, fotos };
      const anuncios = JSON.parse(localStorage.getItem("anuncios")) || [];
      anuncios.push(anuncio);
      localStorage.setItem("anuncios", JSON.stringify(anuncios));
      window.location.href = "index.html";
    });
  });
}
