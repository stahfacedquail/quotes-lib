<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons>
          <ion-button @click="openMenu">
            <ion-icon :icon="menuOutline"></ion-icon>
          </ion-button>
          <ion-title> QuotePad </ion-title>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <Menu @close-menu="closeMenu" />
  
    <ion-content :fullscreen="true" id="container">    
      <ion-button router-link="/add-quote">
        <ion-icon :icon="addOutline"></ion-icon> Add new quote
      </ion-button>

      <swiper :slidesPerView="'auto'" :spaceBetween="30" :pagination='{ "clickable": true }' >
        <swiper-slide class="swiper-slide"
          v-for="(quote,idx) in recentQuotes"
          :key="idx">
            <QuoteCard
              :quote="quote"
              :index="idx"
              @update-favourite="updateFavourite"
              @delete-quote="deleteQuote"
            />
        </swiper-slide>
      </swiper>

      <ion-list>
        <TitleItem
          v-for="(title, idx) in titles"
          :key="idx"
          :title="title"
          :authors="title.authors"

          :router-link="'/quotes/title/' + title.id"
        />
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButton,
  IonButtons,
  menuController,
  IonList
} from "@ionic/vue";
import { defineComponent } from "vue";
import Menu from "../components/Menu.vue";
import QuoteCard from "../components/QuoteCard.vue";
import TitleItem from "../components/TitleItem.vue";
import { addOutline, menuOutline } from "ionicons/icons";

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.min.css';
import SwiperCore, {
  Pagination
} from 'swiper';
SwiperCore.use([Pagination]);

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonButton,
    IonButtons,
    Menu,
    QuoteCard,
    Swiper,
    SwiperSlide,
    IonList,
    TitleItem
  },

  data() {
    return {
      recentQuotes: [],
      titles: []
    };
  },

  mounted() {
      return Promise.all([
        this.getRecentlyAddedQuotes(),
        this.getAllTitlesAndAuthors()
      ])
      .then(() => console.log("HOME Done mounting!"))
      .catch(error => console.log("ERROR!", error));
  },

  setup() {
    return {
      addOutline,
      menuOutline,
    };
  },

  methods: {
    updateFavourite(quote, idx) {
      this.$axios.patch(`/quote/${quote.id}`, { is_favourite: !quote.is_favourite })
      .then(({ data }) => this.recentQuotes[idx] = data )
      .catch(error => console.log("ERROR!", error));
    },

    deleteQuote(quoteId) {
      this.$axios.delete(`/quote/${quoteId}`)
      .then(res => {
        let { success, lastQuoteInTitle } = res.data;

        let nextActions = [];
        if(success) {
          nextActions.push(this.getRecentlyAddedQuotes());

          if(lastQuoteInTitle) {
            //update list of titles so as to remove zombie title
            nextActions.push(this.getAllTitlesAndAuthors());
          }
        } else {
          //inform user delete was unsuccessful -- a toast?
        }

        return Promise.all(nextActions);
      })
      .catch(error => console.log("ERROR!", error));
    },

    getRecentlyAddedQuotes() {
      return this.$axios.get('/quotes?recent=true').then(({ data }) => this.recentQuotes = data);
    },

    getAllTitlesAndAuthors() {
      return this.$axios.get('/titles?full=true').then(({ data }) => this.titles = data);
    },

    openMenu() {
      menuController.open("first");
    },

    closeMenu() {
      menuController.close("first");
    }
  },
  emits: [
    "last-quote-in-title"
  ]
});
</script>

<style scoped>
#container {
  text-align: center;
  --padding-top: 2%;
  --padding-bottom: 30%;
}

.quoteText {
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding-bottom: 0px; /* without this, one more line appears after the clamp */
}

.swiper-slide {
  width: 60%;
}
</style>