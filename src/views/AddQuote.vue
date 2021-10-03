<template>
  <ion-page>
    <AppHeader :title="'Add quote'" />
    
    <ion-content :fullscreen="true">    
      <div id="container">
          <ion-item>
            <ion-label position="stacked">Quote</ion-label>
            <ion-textarea class="inputQuote" rows="10"></ion-textarea>
          </ion-item>

          <AutoComplete name="Title" :data="titles" />
          <AutoComplete name="Author" :data="authors" />

          <ion-item>
            <ion-label position="stacked">Type</ion-label>
            <ion-select v-model="chosenType">
              <ion-select-option v-for="(type, idx) in types" :key="idx" :value="type.id">
                {{ type.value }}
              </ion-select-option>
            </ion-select>
          </ion-item>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage, IonTextarea, IonLabel, IonItem, IonSelect, IonSelectOption } from '@ionic/vue';
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
    AutoComplete,
    IonSelect,
    IonSelectOption
  },

  data() {
    return {
      titles: db.getAllTitles(),
      authors: db.getAllAuthors(),
      chosenType: "",
      types: db.getAllTitleTypes()
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