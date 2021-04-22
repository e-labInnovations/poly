const nav = document.querySelector('ion-nav');
let walletoItems = null;
let categories = null;
const api = 'https://script.google.com/a/gptcthirurangadi.in/macros/s/AKfycbyf-Aw34g4kz-uBPuGWUk4zhCsR0h4oqHCwS5Zd-sVtdAXCdloYV1-DRLjF7H_hut_x/exec?action=read';
var mainData = null;
var currentData = null;

/*
// Make a request for a user with a given ID
axios.get(api)
  .then(function(response) {
    // handle success
    mainData = currentData = response.data;
    const skeletonEl = document.getElementById('skeleton');
    const dataEl = document.getElementById('data');
    skeletonEl.style.display = 'none';
    dataEl.style.display = 'block';
    
    const dataList = document.getElementById('dataList');
    
    currentData.children.forEach(children => {
      let newItem = document.createElement("ion-item");
      console.log(children);
      newItem.innerHTML = `
        <ion-thumbnail slot="start">
          <img src="${children.iconlink}">
        </ion-thumbnail>
        <ion-label>
          <h3>
            ${children.name}
          </h3>
          <p>
            Uploaded On : ${children.created}
          </p>
          <p>
            adipiscing elit.
          </p>
        </ion-label>
        `;
      dataList.append(newItem)
      console.log(newItem);
    })
  })
  .catch(function(error) {
    // handle error
    console.log(error);
  })
  .then(function() {
    // always executed
  });
  */
  
//Handles
//Open detailed item model in Home.js
const openDetailedItemModal = (id) => {
  const modalElement = document.createElement('ion-modal');
  modalElement.component = 'detailed-item-modal';
    modalElement.componentProps = {id};
  document.body.appendChild(modalElement);
  return modalElement.present();
}

const showFiles = () => {
  const dataEl = document.getElementById('data');
  const dataList = document.getElementById('dataList');
  let ls = currentLocation.split('/');
  console.log(ls);
  
  dataList.innerHTML = "";
  
  currentData.children.forEach(children => {
    let newItem = document.createElement("ion-item");
    newItem.setAttribute('href', children.id);
    newItem.setAttribute('button', '');
  
    newItem.innerHTML = `
    <ion-thumbnail slot="start">
      <img src="${children.iconlink}">
    </ion-thumbnail>
    <ion-label>
      <h3>
        ${children.name}
      </h3>
      <p>
        Uploaded On : ${children.created}
      </p>
      <p>
        Credit : Unknown
      </p>
    </ion-label>
    `;
    dataList.append(newItem)
  })
}

const handleItemSelect = (name) => {
  alert(name)
}

//Show toast message
async function presentToast(msg) {
  const toast = document.createElement('ion-toast');
  toast.message = msg;
  toast.duration = 2000;

  document.body.appendChild(toast);
  return toast.present();
}