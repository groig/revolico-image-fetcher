// ==UserScript==
// @name        Revolico Image Fetcher
// @namespace   Violentmonkey Scripts
// @match       https://*.revolico.com/*
// @grant       none
// @version     0.3
// @author      roig
// @description 5/26/2020, 1:46:05 PM
// ==/UserScript==

document.querySelectorAll("[data-cy=adPhoto]").forEach(element => {
  element.addEventListener("click", event => {
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
        img.addEventListener("click", () => body.removeChild(img));
        body.appendChild(img);
      });
  });
});
