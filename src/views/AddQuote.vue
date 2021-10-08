<template>
  <ion-page>
    <AppHeader :title="'Add quote'" />
    
    <ion-content :fullscreen="true">    
      <div id="container">
          <ion-item>
            <ion-label position="stacked">Quote</ion-label>
            <ion-textarea class="inputQuote" rows="10" v-model="quoteText"></ion-textarea>
          </ion-item>

          <AutoComplete labelName="Title" :data="titles" @valueUpdated="updateReqObj" />
          <AutoComplete labelName="Authors" :data="authors" :multipleValues="true" @valueUpdated="updateReqObj" />
          <ion-list>
            <ion-item lines="none" v-for="(author, idx) in chosenAuthors" :key="idx">
              <ion-label>{{ author.value }}</ion-label>
              <ion-icon :icon="closeCircle" @click="chosenAuthors.splice(idx, 1)" />
            </ion-item>
          </ion-list>

          <ion-item>
            <ion-label position="stacked">Type</ion-label>
            <ion-select v-model="chosenType">
              <ion-select-option v-for="(type, idx) in types" :key="idx" :value="type">
                {{ type.value }}
              </ion-select-option>
            </ion-select>
          </ion-item>

          <AutoComplete labelName="Tags" :data="tags" :multipleValues="true" @valueUpdated="updateReqObj" />
          <ion-list>
            <ion-chip v-for="(tag, idx) in chosenTags" :key="idx">
              <ion-label>{{ tag.value }}</ion-label>
              <ion-icon :icon="closeCircle" @click="chosenTags.splice(idx), 1" />
            </ion-chip>
          </ion-list>

          <ion-button @click="createQuote" :disabled="quoteText.trim().length == 0">
            <ion-icon :icon="addOutline"></ion-icon>&nbsp;&nbsp;Save quote
          </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage, IonTextarea, IonLabel, IonItem, IonSelect, IonSelectOption, IonIcon, IonButton, IonList, IonChip, toastController } from '@ionic/vue';
import { defineComponent } from 'vue';
import AppHeader from "../components/AppHeader.vue";
import AutoComplete from "../components/AutoComplete.vue";
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
    IonIcon,
    IonButton,
    IonList,
    IonChip
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
  },
  
  methods: {
    updateReqObj(field, data) {
      if(field == "Title") 
        this.chosenTitle = data;
      else if(field == "Authors") {
        if(this.chosenAuthors.map(author => author.value.toLowerCase()).includes(data.value.toLowerCase()))
          return;
        this.chosenAuthors.push(data);
      } else if(field == "Tags") {
        if(this.chosenTags.map(tag => tag.value.toLowerCase()).includes(data.value.toLowerCase()))
          return;
        this.chosenTags.push(data);
      }
    },
    async createQuote() {
      let postObj = {
        quote: {
          text: this.quoteText,
          title_id: "id" in this.chosenTitle ? this.chosenTitle.id : null
        },
        title: {
          value: "value" in this.chosenTitle ? this.chosenTitle.value : null,
          type_id: "id" in this.chosenType ? this.chosenType.id : null
        },
        authors: this.chosenAuthors,
        tags: this.chosenTags
      };

      let createdObj = db.createQuote(postObj);
      let msg = "";
      
      if(createdObj)
        msg = "Quote successfully added (\",)";
      else
        //quote creation failed -- alert??
        msg = "Quote creation failed :(";

      console.log("CREATED", createdObj);

      const toast = await toastController
        .create({
          message: msg,
          duration: 2000
        });
      
      this.$router.push("home");
      
      return toast.present();
    }
  },
  setup() {
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