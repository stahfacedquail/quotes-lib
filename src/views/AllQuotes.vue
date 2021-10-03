<template>
  <ion-page>
    <AppHeader :title="'All quotes'" />
    
    <ion-content :fullscreen="true">
      <div id="container">
        <QuoteCard
          v-for="(quote, idx) in allQuotes"
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
  name: 'AllQuotes',
  components: {
    IonContent,
    IonPage,
    QuoteCard,
    AppHeader
  },

  data() {
    return {
      allQuotes: db.getAllQuotes()
    };
  },

  methods: {
    updateFavourite(quote, idx) {
      this.allQuotes[idx] = db.updateQuote(
        quote.id,
        { is_favourite: !quote.is_favourite  }
      );
    },

    deleteQuote(quoteId) {
      let { success } = db.deleteQuote(quoteId);

      if(success) {
        this.allQuotes = db.getAllQuotes();
      }
    }
  }
});
</script>