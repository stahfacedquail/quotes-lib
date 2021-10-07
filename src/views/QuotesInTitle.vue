<template>
  <ion-page>
    <AppHeader :title="title.value" />
    
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
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import db from '../db/mockDb.js';
import QuoteCard from "../components/QuoteCard.vue";
import AppHeader from "../components/AppHeader.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: 'QuotesInTitle',
  components: {
    IonContent,
    IonPage,
    QuoteCard,
    AppHeader
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

      console.log(this.quotes[idx]);
    },

    deleteQuote(quoteId) {
      let { success } = db.deleteQuote(quoteId);

      if(success) {
        this.quotes = db.getQuotesInTitle(this.id);
      }
    }
  },

  setup() {
    const route = useRoute();
    const { id } = route.params;
    return { id };
  }
});
</script>