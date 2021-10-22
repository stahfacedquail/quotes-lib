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
        quotes: [],
        title: {}
    };
  },

  mounted() {
    Promise.all([
      this.getQuotesInTitle(),
      this.findTitleById()
    ])
    .then(() => console.log("QUOTESINTITLE Done mounting"))
    .catch(error => console.log("ERROR", error));
  },

  methods: {
    getQuotesInTitle() {
      return this.$axios.get(`/quotes?titleId=${this.id}`).then(({ data }) => this.quotes = data);
    },

    findTitleById() {
      return this.$axios.get(`/title/${this.id}`).then(({ data }) => this.title = data);
    },

    updateFavourite(quote, idx) {
      this.$axios.patch(`/quote/${quote.id}`, { is_favourite: !quote.is_favourite })
      .then(({ data }) => this.quotes[idx] = data )
      .catch(error => console.log("ERROR!", error));
    },

    deleteQuote(quoteId) {
      this.$axios.delete(`/quote/${quoteId}`)
      .then(res => {
        let { success } = res.data;

        if(success)
          return this.getQuotesInTitle();
        else {
          //inform user delete was unsuccessful -- a toast?
        }
      })
      .catch(error => console.log("ERROR!", error));
    }
  },

  setup() {
    const route = useRoute();
    const { id } = route.params;
    return { id };
  }
});
</script>