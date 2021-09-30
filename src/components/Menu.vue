<template>
    <ion-menu side="start" menu-id="first" content-id="container">
        <ion-content>
        <ion-list>
            <ion-item href="/all-quotes">All quotes</ion-item>
            <ion-item href="/favourite-quotes">Favourites</ion-item>
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
  }
});

</script>