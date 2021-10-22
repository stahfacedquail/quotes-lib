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
      favQuotes: []
    };
  },

  mounted() {
    return this.getFavouriteQuotes()
      .then(() => console.log("Done mounting FAVOURITES"))
      .catch(error => console.log(error));
  },

  methods: {
    updateFavourite(quote, idx) {
      this.$axios.patch(`/quote/${quote.id}`, { is_favourite: !quote.is_favourite })
      .then(({ data }) => {
        this.favQuotes[idx] = data;
        this.favQuotes.splice(idx, 1); //remove from list of favourites
      })
      .catch(error => console.log("ERROR!", error));
    },

    deleteQuote(quoteId) {
      this.$axios.delete(`/quote/${quoteId}`)
      .then(res => {
        let { success } = res.data;

        if(success)
          return this.getFavouriteQuotes();
        else {
          //inform user delete was unsuccessful -- a toast?
        }
      })
      .catch(error => console.log("ERROR!", error));
    },

    getFavouriteQuotes() {
      return this.$axios.get('/quotes?favourite=true').then(({ data }) => this.favQuotes = data);
    }
  }
});
</script>