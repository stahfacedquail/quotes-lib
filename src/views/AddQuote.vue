<template>
  <ion-page>
    <AppHeader :title="'Add quote'" />
    
    <ion-content :fullscreen="true">    
      <div id="container">
          <ion-textarea placeholder="Write the quote here..." style="text-align:left;border:solid gray 1px;margin:3px;"></ion-textarea>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage, IonTextarea } from '@ionic/vue';
import { defineComponent } from 'vue';
import AppHeader from "../components/AppHeader.vue";
//import db from '../db/mockDb.js';

export default defineComponent({
  name: 'AddQuote',
  components: {
    IonContent,
    IonPage,
    IonTextarea,
    AppHeader
  },

  data() {
    return {
      
    };
  },

  methods: {
 
  }
});
</script>