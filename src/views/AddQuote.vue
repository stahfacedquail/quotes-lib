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
            <ion-input v-model="titleSearch" @ionChange="updateTitleList" @ionBlur="done" />
          </ion-item>
          <ion-list id="titleResults" v-show="titleSearch.length > 0">
            <!--  @mousedown.prevent prevents blur event so that click event can happen first, so that update
                  of title box can happen before input area loses focus -->
            <ion-item v-for="(result, idx) in titleResults" :key="idx" button @mousedown.prevent @click="updateTitle(result)">
              <ion-label>{{ result }}</ion-label>
            </ion-item>
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
      
      /*  Once user chooses a match, Vue will try to search again and create another list with search results
          This check clears the list if the only result matches what is in the search box */
      if(this.titleResults.length == 1 && this.titleResults[0] == this.titleSearch)
        this.titleResults = [];
    },
    updateTitle(result) {
      this.titleSearch = result;
      this.titleResults = []; //clear search results after match selected
    },
    done() {
      this.titleResults = []; //remove search list if we are no longer searching
    }
  }
});
</script>

<style scoped>
.inputQuote {
  text-align:left;
}
</style>