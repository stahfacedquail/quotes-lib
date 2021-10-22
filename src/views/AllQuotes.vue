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
      allQuotes: []
    };
  },

  mounted() {
    return this.getAllQuotes()
      .then(() => console.log("ALLQUOTES Done mounting!"))
      .catch(error => console.log("ERROR!", error));
  },

  methods: {
    updateFavourite(quote, idx) {
      this.$axios.patch(`/quote/${quote.id}`, { is_favourite: !quote.is_favourite })
      .then(({ data }) => this.allQuotes[idx] = data )
      .catch(error => console.log("ERROR!", error));
    },

    deleteQuote(quoteId) {
      this.$axios.delete(`/quote/${quoteId}`)
      .then(res => {
        let { success } = res.data;

        if(success)
          return this.getAllQuotes();
        else {
          //inform user delete was unsuccessful -- a toast?
        }
      })
      .catch(error => console.log("ERROR!", error));
    },

    getAllQuotes() {
      return this.$axios.get('/quotes').then(({ data }) => this.allQuotes = data);
    }
  }
});
</script>