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

        <QuoteCard
          v-for="(quote, idx) in recentQuotes"
          :key="quote.id"
          :quote="quote"
          :index="idx"
          @updateFavourite="updateFavourite"
        />

        <!--<QuoteCard
          :quote="recentQuotes"
          :index="0"
          v-model="recentQuotes.is_favourite"
          @updateFavourite="updateFavourite"
        />-->
      </div>
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
  IonRouterOutlet,
  menuController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import Menu from "../components/Menu.vue";
import QuoteCard from "../components/QuoteCard.vue";
import { addOutline, menuOutline } from "ionicons/icons";
import db from "../db/mockDb.js";
//import app from "../main.js";

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
    IonRouterOutlet,
    Menu,
    QuoteCard,
  },

  data() {
    return {
      recentQuotes: db.getRecentlyAddedQuotes()
    };
  },

  /*mounted() {
    this.recentQuotes = this.abc;
  },

  computed: {
    abc() {
      return db.getRecentlyAddedQuotes();
    }
  },*/

  setup() {
    return {
      addOutline,
      menuOutline,
    };
  },

  methods: {
    updateFavourite(quote, idx) {
      // let final = this.recentQuote♦s;
      //currently, this is being used for Recently Added
      /*this.recentQuotes[idx] = {};*/
      
      this.recentQuotes[idx] = db.updateQuote(quote.id, {
        is_favourite: !quote.is_favourite,
      });

      console.log(this.recentQuotes[idx]);

      //app.set(this.recentQuotes, idx, quote);
      //this.recentQuotes = [].concat(db.getRecentlyAddedQuotes());

      /*let newArr = [];
      for(let i = 0; i < this.recentQuotes.length; i++)
        newArr.push(this.recentQuotes[i]);

      let arr = db.getRecentlyAddedQuotes();
      console.log(arr[0]);
      this.recentQuotes = [];
      this.recentQuotes.push(arr[0]);
      this.recentQuotes.push({id: 11, text: "ya"});
      

      console.log("suc",quote.is_favourite)

      /*if (!success.is_favourite) {
        // this.recentQuotes[idx].is_favourite = !quote.is_favourite; //reset because update was not successful
        this.recentQuotes[idx] = {
          ...this.recentQuotes[idx],
          is_favourite: quote.is_favourite
        }
      } /*else {
        // final[idx].is_favourite = quote.is_favourite;
        /*this.recentQuotes = []
        this.recentQuotes[idx] = {
          ...this.recentQuotes[idx],
          is_favourite: quote.is_favourite
        }

      }*/

      /*let obj = {};
      for(let p in quote)
        obj[p] = quote[p];

      quote = {};
      for(let p in obj)
        quote[p] = obj[p];

      console.log(quote);

      let newArr = [];
      for(let i = 0; i < this.recentQuotes.length; i++)
        if(i == idx)
          newArr[i] = quote;
        else
          newArr[i] = this.recentQuotes[i];
      
      this.recentQuotes = [];
      for(let i = 0; i < newArr.length; i++)
        this.recentQuotes.push(newArr[i]);*/

      // console.log("abx", final[idx]);
      // update recentQuotes

      //this.$emit("updateFavouriteComplete");
      //quote = this.recentQuotes[idx]; //necessary to trigger reactivity (recognises whole array being replaced vs one item being modified)
    },

    deleteQuote(quoteId) {
      //currently, this is being used for Recently Added
      let successDelete = db.deleteQuote(quoteId);

      if (successDelete) {
        this.recentQuotes = db.getRecentlyAddedQuotes();
      }
    },

    openMenu() {
      menuController.open("first");
    },
  },

  emits: ["updateFavouriteComplete"],
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