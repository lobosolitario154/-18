db.collection("anuncios").get().then(snapshot => {
  const container = document.getElementById("anuncios");
  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "anuncio";
    div.innerHTML = `
      <p>${data.legenda}</p>
      <div class="carousel">
        ${data.fotos.map((url, i) => `<img src="${url}" class="${i === 0 ? 'active' : ''}">`).join("")}
      </div>
      <a href="https://wa.me/${data.whatsapp}" target="_blank">📱 WhatsApp</a>
    `;
    container.appendChild(div);

    let index = 0;
    const imgs = div.querySelectorAll("img");
    setInterval(() => {
      imgs.forEach((img, i) => img.classList.toggle("active", i === index));
      index = (index + 1) % imgs.length;
    }, 3000);
  });
});
