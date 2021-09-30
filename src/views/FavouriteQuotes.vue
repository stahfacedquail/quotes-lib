<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons>
            <ion-button href="/home">
                <ion-icon :icon="chevronBackOutline"></ion-icon>
            </ion-button>
            <ion-title>
                Favourite quotes
            </ion-title>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Add quote</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div id="container">
          <ion-textarea placeholder="Write the quote here..." style="text-align:left;border:solid gray 1px;margin:3px;"></ion-textarea>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonButton, IonButtons, IonTextarea } from '@ionic/vue';
import { defineComponent } from 'vue';
import{ chevronBackOutline } from "ionicons/icons";
//import db from '../db/mockDb.js';

export default defineComponent({
  name: 'FavouriteQuotes',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonButton,
    IonButtons,
    IonTextarea
  },

  data() {
    return {
      
    };
  },

  setup() {
    return {
      chevronBackOutline
    };
  },

  methods: {
 
  }
});
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 10%;
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>