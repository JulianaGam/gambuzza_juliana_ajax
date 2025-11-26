(() => {
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialContainer = document.querySelector("#material-container");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const loader = document.querySelector("#loader");

  function loadInfoBoxes() {
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then(response => response.json())
      .then(infoboxes => {
        console.log(infoboxes);

        infoboxes.forEach((infoBox, index) => {
          const selected = document.querySelector(`#hotspot-${index + 1}`);

          const titleElement = document.createElement("h2");
          titleElement.textContent = infoBox.heading;

          const textElement = document.createElement("p");
          textElement.textContent = infoBox.description;

          selected.appendChild(titleElement);
          selected.appendChild(textElement);
        });
      })
      .catch(error => {
        console.log(error);
        const errorMessage = document.createElement("p");
        errorMessage.textContent =
          "Oops! Something went wrong while loading the infoboxes. It could be your connections or the sevrer, please try again later!";
        materialContainer.appendChild(errorMessage);
      });
  }

  function loadMaterialInfo() {
    loader.classList.remove("hidden");

    fetch("https://swiftpixel.com/earbud/api/materials")
      .then(response => response.json())
      .then(materialListData => {
        console.log(materialListData);

        materialList.innerHTML = "";

        materialListData.forEach(material => {
          const clone = materialTemplate.content.cloneNode(true);

          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const materialDescription = clone.querySelector(".material-description");
          materialDescription.textContent = material.description;

          materialList.appendChild(clone);
        });

        loader.classList.add("hidden");
      })
      .catch(error => {
        console.log(error);
        const errorMessage = document.createElement("p");
        errorMessage.textContent =
          "Oops! Something went wrong while loading the materials. It could be your connection or the server, please try again later!";
        materialContainer.appendChild(errorMessage);
      });
  }

  function showInfo() {
    const selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    const selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  hotspots.forEach(hotspot => {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

  loadInfoBoxes();
  loadMaterialInfo();
})();
