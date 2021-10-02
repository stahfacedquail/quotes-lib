<template>
    <ion-menu side="start" menu-id="first" content-id="container">
        <ion-content>
        <ion-list>
            <ion-item router-link="/all-quotes" @click="closeMenu">All quotes</ion-item>
            <ion-item router-link="/favourite-quotes" @click="closeMenu">Favourites</ion-item>
        </ion-list>
        </ion-content>
    </ion-menu>
</template>

<script>
import { IonMenu, IonContent, IonList, IonItem } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Menu',
  components: {
      IonMenu,
      IonContent,
      IonList,
      IonItem
  },
  methods: {
      closeMenu() {
          this.$emit("close-menu");
      }
  },
  emits: [
      "close-menu"
  ]
});

</script>