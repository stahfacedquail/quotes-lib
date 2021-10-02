<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons>
            <ion-button router-link="/home">
                <ion-icon :icon="chevronBackOutline"></ion-icon>
            </ion-button>
            <ion-title>
                {{ title.name }}
            </ion-title>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <div id="container">
        <QuoteCard
          v-for="(quote, idx) in quotes"
          :key="idx"
          :quote="quote"
          :index="idx"
          @update-favourite="updateFavourite"
          @delete-quote="deleteQuote"
        />
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonButton, IonButtons } from '@ionic/vue';
import { defineComponent } from 'vue';
import{ chevronBackOutline } from "ionicons/icons";
import db from '../db/mockDb.js';
import QuoteCard from "../components/QuoteCard.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: 'QuotesInTitle',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonButton,
    IonButtons,
    QuoteCard
  },

  data() {
    return {
        quotes: db.getQuotesInTitle(this.id),
        title: db.findTitleById(this.id)
    };
  },

  methods: {
    updateFavourite(quote, idx) {
      this.quotes[idx] = db.updateQuote(
        quote.id,
        { is_favourite: !quote.is_favourite  }
      );
    },

    deleteQuote(quoteId) {
      let successDelete = db.deleteQuote(quoteId);

      if (successDelete) {
        this.quotes = db.getQuotesInTitle(this.id);
      }
    }
  },

  setup() {
    const route = useRoute();
    const { id } = route.params;
    return { id, chevronBackOutline };
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