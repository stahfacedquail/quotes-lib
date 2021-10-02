<template>
    <ion-card style="border: solid black 12;">
        <ion-card-content class="quoteText">
            {{ quote.text }}
        </ion-card-content>
        <ion-card-content style="border-top:1px solid gray; padding:0px; margin-top:13px;">
        <ion-button fill="clear" @click="updateFavourite">
            <ion-icon v-if="quote.is_favourite" :icon="heart"></ion-icon>
            <ion-icon v-else :icon="heartOutline"></ion-icon>
        </ion-button>
        <ion-button fill="clear">
            <!-- @click="deleteQuote(quote.id)" -->
            <ion-icon :icon="trashOutline"></ion-icon>
        </ion-button>
        </ion-card-content>
    </ion-card>
</template>

<script>
import { IonCard, IonCardContent, IonButton, IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';
import { heartOutline, heart, trashOutline } from "ionicons/icons";

export default defineComponent({
  name: 'QuoteCard',
  props: {
      quote: {  type: Object,   required: true },
      index: {  type: Number,   required: false}
  },
  components: {
      IonCard,
      IonCardContent,
      IonButton,
      IonIcon
  },
  setup() {
    return {
      heartOutline,
      heart,
      trashOutline
    };
  },
  methods: {
      updateFavourite() {
          this.$emit("updateFavourite", this.quote, this.index);
      }
  },
  emits: [
      "updateFavourite"
  ]
});
</script>

<style scoped>
    .quoteText {
        display: -webkit-box;
        max-width: 100%;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        overflow: hidden;
        padding-bottom: 0px; /* withouth this, one more line appears after the clamp */
    }
</style>