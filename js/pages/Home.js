import ItemCard from "./components/ItemCard.js";
import { menuController } from 'https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/index.esm.js';

export default class HomePage extends HTMLElement {
    connectedCallback() {
      cid = this.id;
        
        this.innerHTML = `
          <ion-menu side="start" content-id="main-content">
              <ion-header>
                <ion-toolbar translucent>
                  <ion-title>Menu</ion-title>
                </ion-toolbar>
              </ion-header>
      
              <ion-content>
                <ion-list>
                  <ion-item href="/settings">
                    <ion-icon name="settings-outline" slot="start"></ion-icon>
                    <ion-label>Settings</ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-icon name="star-outline" slot="start"></ion-icon>
                    <ion-label>Rate Us</ion-label>
                  </ion-item>
                  <ion-item href="/about">
                    <ion-icon name="information-circle-outline" slot="start"></ion-icon>
                    <ion-label>About</ion-label>
                  </ion-item>
                </ion-list>
              </ion-content>
            </ion-menu>

            <div class="ion-page" id="main-content">
              <ion-header>
                <ion-toolbar>
                  <ion-buttons slot="start">
                    <ion-menu-button></ion-menu-button>
                  </ion-buttons>
                  <ion-buttons slot="end" id="btnFilter">
                    <ion-icon  slot="icon-only" class="icon-tool" ios="ios-options-outline" md="md-options"></ion-icon>
                  </ion-buttons>
                  <ion-title>Walleto</ion-title>
                </ion-toolbar>
              </ion-header>
              
              <ion-content>
                <ion-card>
                    <ion-card-content>
                        <ion-grid>
                            <ion-row>
                                <ion-col class="ion-text-center">
                                    <ion-text color="secondary">
                                        <p>Income</p>
                                        <h1>$100</h1>
                                    </ion-text>
                                </ion-col>
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                    </ion-card-content>
                </ion-card>
                
                <!-- Data to display after skeleton screen -->
                <div id="data">
                
                  <ion-list>
                    <ion-list-header>
                      <ion-label>
                        Data
                      </ion-label>
                    </ion-list-header>
                    <div id='dataList'></div>
                  </ion-list>
                </div>
                
                <!-- Skeleton screen -->
                <div id="skeleton">
                
                  <ion-list>
                    <ion-list-header>
                      <ion-label>
                        <ion-skeleton-text animated style="width: 20%"></ion-skeleton-text>
                      </ion-label>
                    </ion-list-header>
                    
                    ${
                    [1,2,3,4,5].map((item) => { return `
                    <ion-item>
                      <ion-thumbnail slot="start">
                        <ion-skeleton-text animated></ion-skeleton-text>
                      </ion-thumbnail>
                      <ion-label>
                        <h3>
                          <ion-skeleton-text animated style="width: 50%"></ion-skeleton-text>
                        </h3>
                        <p>
                          <ion-skeleton-text animated style="width: 80%"></ion-skeleton-text>
                        </p>
                        <p>
                          <ion-skeleton-text animated style="width: 60%"></ion-skeleton-text>
                        </p>
                      </ion-label>
                    </ion-item>
                    `}).join("")
                    }
                      
                  </ion-list>
                </div>
          
              </ion-content>
            </div>
          `;
            
        let router = document.querySelector('ion-router');
        
        router.addEventListener("ionRouteWillChange", () => {
          if (menuController.isOpen()) {
            menuController.close();
          }
        })
        
        
        axios.get('/run/idb/poly/data.json')
          .then(function(response) {
            // handle success
            mainData = currentData = response.data;
            const skeletonEl = document.getElementById('skeleton');
            const dataEl = document.getElementById('data');
            skeletonEl.style.display = 'none';
            dataEl.style.display = 'block';
        
            showFiles();
          })
          .catch(function(error) {
            // handle error
            console.log(error);
          })
          .then(function() {
            // always executed
          });
        
    }
}

customElements.define("home-page", HomePage);