<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons>
          <ion-button @click="openMenu">
            <ion-icon :icon="menuOutline"></ion-icon>
          </ion-button>
          <ion-title> Home </ion-title>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <Menu />
  
    <ion-content :fullscreen="true" id="container">    
      <ion-button href="/add-quote">
        <ion-icon :icon="addOutline"></ion-icon> Add new quote
      </ion-button>

      <swiper :slidesPerView="'auto'" :spaceBetween="30" :pagination='{ "clickable": true }' >
        <swiper-slide class="swiper-slide"
          v-for="(quote,idx) in recentQuotes"
          :key="idx">
            <QuoteCard
              :quote="quote"
              :index="idx"
              @updateFavourite="updateFavourite"
              @deleteQuote="deleteQuote"
            />
        </swiper-slide>
      </swiper>

      <ion-list>
        <TitleItem v-for="(obj, idx) in titles" :key="idx" :title="obj.title" :authors="obj.authors" />
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
import db from "../db/mockDb.js";

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
      recentQuotes: db.getRecentlyAddedQuotes(),
      titles: db.getAllTitlesAndAuthors()
    };
  },

  setup() {
    return {
      addOutline,
      menuOutline,
    };
  },

  methods: {
    updateFavourite(quote, idx) {
      this.recentQuotes[idx] = db.updateQuote(
        quote.id,
        { is_favourite: !quote.is_favourite  }
      );
    },

    deleteQuote(quoteId) {
      let successDelete = db.deleteQuote(quoteId);

      if (successDelete) {
        this.recentQuotes = db.getRecentlyAddedQuotes();
      }
    },

    openMenu() {
      menuController.open("first");
    },
  }
});
</script>

<style scoped>
ion-content {
  text-align: center;
  --padding-top: 10%;
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

.swiper-slide {
  width: 60%;
}
</style>