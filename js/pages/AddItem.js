
export default class addItem extends HTMLElement {
  connectedCallback() {
    const categories = getCategories(); //From app.js
    let id = this.id;
    let editItem = getSingleWalletoItem(id);
    let type = "income";
    if(editItem != null) {
        type = editItem.type == "income" ? "expenses" : "income";
    }
    let currentCategories = categories.filter(category => category.type != type).sort(sortByName());
    
    this.innerHTML = `
    <ion-header translucent>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-back-button default-href="/"></ion-back-button>
            </ion-buttons>
            <ion-select value="${editItem?editItem.type:"expenses"}" interface="popover" style="width:90%;" id="typeSelector">
                <ion-select-option value="expenses">Expenses</ion-select-option>
                <ion-select-option value="income">Income</ion-select-option>
            </ion-select>
        </ion-toolbar>
    </ion-header>
    
    
    <ion-item>
        <ion-avatar id="currentCategoryAvatar" slot="start" category="${currentCategories[0].id}" style="background-color: ${currentCategories[0].color};">
            <ion-icon id="currentCategoryIcon" name="${currentCategories[0].icon}"></ion-icon>
        </ion-avatar>
        <ion-grid>
            <ion-row>
                <ion-col size="8">
                    <ion-input placeholder="Memo" value="${editItem?editItem.memo:""}" autocomplete="on" id="input-memo" enterkeyhint="next" spellcheck=true></ion-input>
                </ion-col>
                <ion-col size="4">
                    <ion-input class="ion-text-end" value="${editItem?editItem.money:""}" placeholder="Amount" id="input-amount" type="number" autofocus=true enterkeyhint="done" inputmode="numeric" required=true style="font-weight: bold; font-size:18px;"></ion-input>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-item>
    <ion-item>
      <ion-label>Date</ion-label>
      <ion-datetime display-format="DD-MMM-YYYY" placeholder="Select Date"  value="${editItem?editItem.date:(new Date())}"></ion-datetime>
    </ion-item>
    
    <ion-content class="ion-padding">
      
      <ion-grid class="ion-text-center">
        <ion-row id="categoriesList">
            ${listCategories(currentCategories)}
        </ion-row>
      </ion-grid>
    </ion-content>
    
    <ion-button color="primary" id="btnSubmit">Save</ion-button>
      
      `;


    const btnSubmit = document.getElementById("btnSubmit");
    const typeSelector = document.getElementById('typeSelector');
    const categoriesList = document.getElementById('categoriesList');
    
    if(editItem != null) {
        handleCategorySelect(editItem.category.icon,editItem.category.color,editItem.category.id)
    }
    
    typeSelector.addEventListener('ionChange', (ev) => {
        let currentCategoryAvatar = document.getElementById("currentCategoryAvatar");
        let currentCategoryIcon = document.getElementById("currentCategoryIcon");
        let currentSelect = ev.detail.value; 
        
        if(currentSelect == "income"){
            currentCategories = categories.filter(category => category.type != "expenses");
        } else {
            currentCategories = categories.filter(category => category.type != "income");
        }
        categoriesList.innerHTML = listCategories(currentCategories.sort(sortByName()));
        currentCategoryAvatar.style.backgroundColor = currentCategories[0].color;
        currentCategoryIcon.setAttribute("name", currentCategories[0].icon);
        currentCategoryAvatar.setAttribute("category", currentCategories[0].id);
        
    })

    btnSubmit.addEventListener("click", () => {
        const memoInput = document.getElementById('input-memo');
        const amountInput = document.getElementById('input-amount');
        const dateInput = document.querySelector('ion-datetime');
        const typeSelector = document.getElementById('typeSelector');
        
        const category = document.getElementById("currentCategoryAvatar").getAttribute("category");
        const money = amountInput.value;
        const type = typeSelector.value;
        const date = dateInput.value;
        const memo = memoInput.value ? memoInput.value : "";
        let id = null;
        if(editItem != null) {
            id = editItem.id;
        }
        const newItem = {category, money, date, memo, type, id}
    
        if(!money>0) {
            const alert = document.createElement('ion-alert');
            alert.header = 'Error';
            //alert.subHeader = 'Subtitle';
            alert.message = "Fill the Amount field";
            alert.buttons = ['OK'];

            document.body.appendChild(alert);
            return alert.present();
        } else {
            addWalletoItem(newItem, (error, data) => {
                if(editItem != null) {
                    presentToast("Item modified successfully");
                } else {
                    presentToast("New item added successfully");
                }
                
                document.querySelector('ion-router').back();
            })
        }
        
    });

    function listCategories(currentCategories) {
      return currentCategories.map((category) => `
            <ion-col size="3" onclick="handleCategorySelect('${category.icon}','${category.color}','${category.id}')">
                <ion-avatar class="iconAvatar" id="avatar-${category.id}" style="margin: 0 auto; height:50px; width:50px; background-color: ${category.icon==currentCategories[0].icon?category.color:"#F5F5F5"};">
                    <ion-icon class="iconIcon" id="icon-${category.id}" name="${category.icon}" style="color: ${category.icon==currentCategories[0].icon?"#FFF":"#000"};"></ion-icon>
                </ion-avatar>
                <ion-note>${category.name}</ion-note>
            </ion-col>
        `).join("")
    }
    
    function sortByName() {
      return function(a, b) {
          var nameA = a.name.toUpperCase(); // ignore upper and lowercase
          var nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA == 'OTHER' | a.userAdded) {
            return 1;
          }
          if (nameB == 'OTHER' | b.userAdded) {
            return -1;
          }
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        }
    }
  }
}

customElements.define("add-item-page", addItem);