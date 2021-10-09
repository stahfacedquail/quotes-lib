<template>
    <ion-card style="border: solid black 12;">
        <ion-card-content class="quoteText" button :router-link="'/quotes/' + quote.id">
            {{ quote.text }}
        </ion-card-content>
        <ion-card-content style="border-top:1px solid gray; padding:0px; margin-top:13px;">
        <ion-button fill="clear" @click="$emit('update-favourite', quote, index);">
            <ion-icon v-if="quote.is_favourite" :icon="heart"></ion-icon>
            <ion-icon v-else :icon="heartOutline"></ion-icon>
        </ion-button>
        <ion-button fill="clear" @click="confirmQuoteDelete">
            <ion-icon :icon="trashOutline"></ion-icon>
        </ion-button>
        </ion-card-content>
    </ion-card>
</template>

<script>
import { IonCard, IonCardContent, IonButton, IonIcon, alertController } from '@ionic/vue';
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
  methods: {
    async confirmQuoteDelete() {
        const alert = await alertController
            .create({
                message: 'Are you sure you want to delete this quote?',
                buttons: [
                    {
                        text: 'Yes',
                        handler: () => {
                            this.$emit('delete-quote', this.quote.id)
                        },
                    },
                    {
                        text: 'No',
                        role: "cancel"
                    },
                ]
            });
        
        return alert.present();
    }
  },
  setup() {
    return {
      heartOutline,
      heart,
      trashOutline
    };
  },
  emits: [
      "update-favourite", "delete-quote"
  ]
});
</script>

<style scoped>
    .quoteText {
        height: 118px;
        display: -webkit-box;
        max-width: 100%;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        overflow: hidden;
        padding-bottom: 0px; /* without this, one more line appears after the clamp */
    }
</style>