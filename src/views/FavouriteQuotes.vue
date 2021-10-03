<template>
  <ion-page>
    <AppHeader :title="'Favourite quotes'" />
    
    <ion-content :fullscreen="true">
      <div id="container">
        <QuoteCard
          v-for="(quote, idx) in favQuotes"
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
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import db from '../db/mockDb.js';
import QuoteCard from "../components/QuoteCard.vue";
import AppHeader from "../components/AppHeader.vue";

export default defineComponent({
  name: 'FavouriteQuotes',
  components: {
    IonContent,
    IonPage,
    QuoteCard,
    AppHeader
  },

  data() {
    return {
      favQuotes: db.getFavouriteQuotes()
    };
  },

  methods: {
    updateFavourite(quote, idx) {
      this.favQuotes[idx] = db.updateQuote(
        quote.id,
        { is_favourite: !quote.is_favourite  }
      );

      this.favQuotes.splice(idx, 1);
    },

    deleteQuote(quoteId) {
      let { success } = db.deleteQuote(quoteId);

      if(success) {
        this.favQuotes = db.getFavouriteQuotes();
      }
    }
  }
});
</script>