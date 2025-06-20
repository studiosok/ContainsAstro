 import { actions } from "astro:actions";

  function listenForEnter(e: KeyboardEvent) {
    e = e || window.event;
    if (e.code === "0x001C" || e.code === "Enter") {
      document.getElementById("submitButton")!.click();
      const inputBox: HTMLInputElement | null =
        document.querySelector("#ingredients");
      inputBox!.value = "";
      return false;
    }
    return true;
  }
  document.addEventListener("keydown", listenForEnter);

  const getInput = () => {
    const inputBox: HTMLInputElement | null =
      document.querySelector("#ingredients");

    return inputBox?.value || "";
  };

  const searchButton = document.querySelector("#submitButton");

  searchButton?.addEventListener("click", async () => {
    const input = getInput();
    const { data, error } = await actions.searchData(input);

    if (error) {
      alert(`Error searching data, ${error.message}`);
    }

    const { safe, allergens, risks } = data!;
    const inputBox: HTMLInputElement | null =
      document.querySelector("#ingredients");
    inputBox!.value = "";

    document.getElementById("safeText")!.innerHTML = safe
      ? "Allergen free!"
      : "Potential allergen(s) found:";

    const list = document.getElementById("allergenText")!;

    // clean list of previous search's allergens
    if (list.firstChild) {
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
    }
    // populate new list of allergens
    if (!safe) {
      for (let i = 0; i < allergens.length; i++) {
        let li = document.createElement("li");
        li.innerText = allergens[i];
        li.className = "danger";
        list.appendChild(li);
      }
    }
    // populate any possible allergens
    if (risks.length > 0) {
      for (let i = 0; i < risks.length; i++) {
        let li = document.createElement("li");
        li.innerText = `${risks[i][0]} may be related to ${risks[i][1]}`;
        li.className = "warn";
        list.appendChild(li);
      }
    }
  });