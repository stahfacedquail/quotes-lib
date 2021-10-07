<template>
  <ion-page>
    <AppHeader :title="'Add quote'" />
    
    <ion-content :fullscreen="true">    
      <div id="container">
          <ion-item>
            <ion-label position="stacked">Quote</ion-label>
            <ion-textarea class="inputQuote" rows="10" v-model="quoteText"></ion-textarea>
          </ion-item>

          <AutoComplete labelName="Title" :data="titles" :multipleValues="false" @valueUpdated="updateReqObj" />
          <AutoComplete labelName="Authors" :data="authors" :multipleValues="true" @valueUpdated="updateReqObj" />
          <ion-list>
            <ion-item lines="none" v-for="(author, idx) in chosenAuthors" :key="idx">
              <ion-label>{{ author.value }}</ion-label>
              <ion-icon :icon="closeCircle" @click="removeAuthor(idx)" />
            </ion-item>
          </ion-list>

          <ion-item>
            <ion-label position="stacked">Type</ion-label>
            <ion-select v-model="chosenType">
              <ion-select-option v-for="(type, idx) in types" :key="idx" :value="type.id">
                {{ type.value }}
              </ion-select-option>
            </ion-select>
          </ion-item>

          <TagInput :data="tags" @valueUpdated="updateReqObj" />

          <ion-button @click="createQuote">
            <ion-icon :icon="addOutline"></ion-icon>&nbsp;&nbsp;Save quote
          </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage, IonTextarea, IonLabel, IonItem, IonSelect, IonSelectOption, IonIcon, IonButton, IonList } from '@ionic/vue';
import { defineComponent } from 'vue';
import AppHeader from "../components/AppHeader.vue";
import AutoComplete from "../components/AutoComplete.vue";
import TagInput from "../components/TagInput.vue";
import db from '../db/mockDb.js';
import { addOutline, closeCircle } from "ionicons/icons";

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
    IonSelectOption,
    TagInput,
    IonIcon,
    IonButton,
    IonList
  },

  data() {
    return {
      quoteText: "",

      titles: db.getAllTitles(),
      authors: db.getAllAuthors(),
      types: db.getAllTitleTypes(),
      tags: db.getAllTags(),

      chosenTitle: {},
      chosenAuthors: [],
      chosenType: {},
      chosenTags: []
    };
  }, methods: {
    updateReqObj(field, data) {
      if(field == "Title") 
        this.chosenTitle = data;
      else if(field == "Authors") {
        if(this.findInChosenAuthorsArr(data))
          return;
        this.chosenAuthors.push(data);
      } else if(field == "Tags")
        this.chosenTags = data;
    },
    removeAuthor(idx) {
      this.chosenAuthors.splice(idx, 1);
    },
    findInChosenAuthorsArr(authObj) {
      let found = false;
      console.log(authObj);
      console.log(this.chosenAuthors);

      for(let i = 0; i < this.chosenAuthors.length && !found; i++) {
        if(this.chosenAuthors[i].id == authObj.id && this.chosenAuthors[i].value.toLowerCase() == authObj.value.toLowerCase())
          found = true;
      }

      console.log(found);

      return found;
    },
    createQuote() {
      let postObj = {
        quote: {
          text: this.quoteText,
          title_id: this.chosenTitle.id
        },
        title: {
          value: this.chosenTitle.value,
          type: this.chosenType
        },
        authors: this.chosenAuthors,
        tags: this.chosenTags
      };

      console.log(postObj);
      db.createQuote(postObj);
    }
  }, setup() {
    return {
      addOutline,
      closeCircle
    };
  }
});
</script>

<style scoped>
.inputQuote {
  text-align:left;
}
</style>