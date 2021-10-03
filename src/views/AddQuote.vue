<template>
  <ion-page>
    <AppHeader :title="'Add quote'" />
    
    <ion-content :fullscreen="true">    
      <div id="container">
          <ion-item>
            <ion-label position="stacked">Quote</ion-label>
            <ion-textarea class="inputQuote" rows="10"></ion-textarea>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Title</ion-label>
            <ion-input v-model="titleSearch" @ionChange="updateTitleList" @ionBlur="removeTitleList" />
          </ion-item>
          <ion-list id="titleResults" v-show="titleSearch.length > 0">
            <ion-item v-for="(result, idx) in titleResults" :key="idx">{{ result }}</ion-item>
          </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage, IonTextarea, IonLabel, IonItem, IonInput, IonList } from '@ionic/vue';
import { defineComponent } from 'vue';
import AppHeader from "../components/AppHeader.vue";
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
    IonInput,
    IonList
  },

  data() {
    return {
      titles: db.getAllTitles(),
      titleSearch: "",
      titleResults: []
    };
  },

  methods: {
    updateTitleList() {
      this.titleResults = this.titles.filter(title => title.toLowerCase().includes(this.titleSearch.toLowerCase()));
    },
    removeTitleList() {
      this.titleResults = [];
    }
  }
});
</script>

<style scoped>
.inputQuote {
  text-align:left;
}
</style>