function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]")
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {

      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

populateUFs()

function getCities(event) {
  const citySelect = document.querySelector("[name=city]");
  const stateInput = document.querySelector("[name=state]");
  const ufValue = event.target.value;
  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = `<option value=">Selecione a Cidade</option>`
  citySelect.disabled = true;
  fetch(url)
    .then(res => res.json())
    .then(cities => {

      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }
      citySelect.disabled = false;
    });
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities);

//Itens de coleta
//Pegar todos os Li's

const ItenstoCollect = document.querySelectorAll(".itens-grid li");

for (const item of ItenstoCollect) {
  item.addEventListener("click", handleSelectedItem)
}

const collectedItens = document.querySelector("input[name=itens]");

let selectedItens = []

function handleSelectedItem(event) {
  //adicionar ou remover uma classe com JS
  const itemLi = event.target

  itemLi.classList.toggle("selected");

  const itemId = event.target.dataset.id;

  //verificar se exitem itens selecionados, se sim, pegar os itens selecionados.

  const alreadySelected = selectedItens.findIndex((item) => {
    const itemFound = item === itemId;
    return itemFound;
  })

  //Se já estiver selecionado, tirar da seleção,
  if (alreadySelected >= 0) {
    //Tirar da seleção
    const filteredItems = selectedItens.filter(item => {
      const itemIsDifferent = item != itemId;
      return itemIsDifferent;
    })
    selectedItens = filteredItems;
  } else {
    //se não estiver selecionado, adicionar á seleção
    selectedItens.push(itemId);
  }

  //atualizar o campo escondido com os itens selecionados
  collectedItens.value = selectedItens;
}