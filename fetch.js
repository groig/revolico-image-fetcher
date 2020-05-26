document.querySelectorAll("[data-cy=adPhoto]").forEach(element => {
  element.addEventListener("mouseenter", event => {
    const adUrl = element.parentNode.firstChild.href;
    fetch(adUrl)
      .then(response => response.text())
      .then(text => {
        var fake = document.createElement("html");
        fake.innerHTML = text;
        const imgUrl = fake.querySelectorAll("[data-cy=zoomAdImage]")[0].href;
        let img = document.createElement("img");
        img.src = imgUrl;
        img.style.position = "absolute";
        img.style.left = `${event.clientX}px`;
        img.style.top = `${event.clientY}px`;
        const body = document.getElementsByTagName("body")[0];
        body.appendChild(img);
        element.addEventListener("mouseleave", () => body.removeChild(img));
      });
  });
});
