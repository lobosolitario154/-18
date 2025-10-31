document.getElementById("form").addEventListener("submit", async function(e) {
  e.preventDefault();
  const form = e.target;
  const whatsapp = form.whatsapp.value;
  const legenda = form.legenda.value;
  const files = form.fotos.files;

  if (files.length > 4) {
    alert("Máximo de 4 fotos.");
    return;
  }

  const uploadPromises = Array.from(files).map(file => {
    const ref = storage.ref().child("anuncios/" + Date.now() + "-" + file.name);
    return ref.put(file).then(() => ref.getDownloadURL());
  });

  const fotos = await Promise.all(uploadPromises);
  await db.collection("anuncios").add({ whatsapp, legenda, fotos });
  window.location.href = "index.html";
});
