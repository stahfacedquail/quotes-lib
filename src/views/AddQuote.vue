<template>
  <ion-page>
    <AppHeader :title="'Add quote'" />
    
    <ion-content :fullscreen="true">    
      <div id="container">
          <ion-item>
            <ion-label position="stacked">Quote</ion-label>
            <ion-textarea class="inputQuote" rows="10"></ion-textarea>
          </ion-item>

          <AutoComplete :name="'Title'" :allValues="titles" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage, IonTextarea, IonLabel, IonItem } from '@ionic/vue';
import { defineComponent } from 'vue';
import AppHeader from "../components/AppHeader.vue";
import AutoComplete from "../components/AutoComplete.vue";
import db from '../db/mockDb.js';

export default defineComponent({
  name: 'AddQuote',
  components: {
    IonContent,
    IonPage,
    IonTextarea,
    AppHeader,
    IonLabel,
    IonItem,
    AutoComplete
  },

  data() {
    return {
      titles: db.getAllTitles(),
    };
  },

  methods: {
    
  }
});
</script>

<style scoped>
.inputQuote {
  text-align:left;
}
</style>