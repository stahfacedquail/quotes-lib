<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>QuotePad</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Home</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div id="container">
        <ion-button href="/add-quote">
          <ion-icon :icon="addOutline"></ion-icon> Add new quote
        </ion-button>

        <ion-card v-for="(quote, idx) in recentQuotes" :key="quote.id" style="border: solid black 12;">
          <ion-card-content>
            {{ quote.text }}
          </ion-card-content>
          <ion-card-content style="border-top: 1px solid gray;">
            <ion-button fill="clear" @click="updateFavourite(quote, idx)">
              <ion-icon v-if="quote.is_favourite" :icon="heart"></ion-icon>
              <ion-icon v-else :icon="heartOutline"></ion-icon>
            </ion-button>
            <ion-button fill="clear" @click="deleteQuote(quote.id)">
              <ion-icon :icon="trashOutline"></ion-icon>
            </ion-button>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonIcon, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import{ heartOutline, heart, trashOutline, addOutline } from "ionicons/icons";
import db from '../db/mockDb.js';

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonIcon,
    IonButton
  },

  data() {
    return {
      recentQuotes: db.getRecentlyAddedQuotes()
    };
  },

  setup() {
    return {
      heartOutline,
      heart,
      trashOutline,
      addOutline
    };
  },

  methods: {
    updateFavourite(quote, idx) { //currently, this is being used for Recently Added
      let success = db.updateQuote(quote.id, { is_favourite: !quote.is_favourite });
      if(! success.is_favourite) {
        this.recentQuotes[idx].is_favourite = !quote.is_favourite; //reset because update was not successful
      }

      this.recentQuotes = this.recentQuotes.concat([]); //necessary to trigger reactivity (recognises whole array being replaced vs one item being modified)
    },

    deleteQuote(quoteId) { //currently, this is being used for Recently Added
      let successDelete = db.deleteQuote(quoteId);

      if(successDelete) {
        this.recentQuotes = db.getRecentlyAddedQuotes();
      }
    }
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