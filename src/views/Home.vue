<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons>
            <ion-button @click="openMenu">
                <ion-icon :icon="menuOutline"></ion-icon>
            </ion-button>
            <ion-title>
                Home
            </ion-title>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <Menu></Menu>
    <ion-router-outlet id="menu-sibling" />
  
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

        <QuoteCard v-for="(quote, idx) in recentQuotes" :key="quote.id" :quote="quote" :index="idx">
        </QuoteCard>

      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonButton, IonButtons, IonRouterOutlet, menuController } from '@ionic/vue';
import { defineComponent } from 'vue';
import Menu from "../components/Menu.vue";
import QuoteCard from "../components/QuoteCard.vue";
import{ addOutline, menuOutline } from "ionicons/icons";
import db from '../db/mockDb.js';

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonButton,
    IonButtons,
    IonRouterOutlet,
    Menu,
    QuoteCard
  },

  data() {
    return {
      recentQuotes: db.getRecentlyAddedQuotes()
    };
  },

  setup() {
    return {
      addOutline,
      menuOutline
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
    },

    openMenu() {
      menuController.open("first");
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

.quoteText {
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding-bottom: 0px; /* withouth this, one more line appears after the clamp */
}
</style>