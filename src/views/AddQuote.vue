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
            <ion-chip v-for="(author, idx) in chosenAuthors" :key="idx">
              <ion-label>{{ author.value }}</ion-label>
              <ion-icon :icon="closeCircle" @click="chosenAuthors.splice(idx, 1)" />
            </ion-chip>
          </ion-list>

          <ion-item>
            <ion-label position="stacked">Type</ion-label>
            <ion-select v-model="chosenType" :disabled="chosenTitle.id && chosenTitle.id >= 0">
              <ion-select-option v-for="(type, idx) in types" :key="idx" :value="type.id">
                {{ type.value }}
              </ion-select-option>
            </ion-select>
          </ion-item>

          <AutoComplete labelName="Tags" :data="tags" :multipleValues="true" @valueUpdated="updateReqObj" />
          <ion-list>
            <ion-chip v-for="(tag, idx) in chosenTags" :key="idx">
              <ion-label>{{ tag.value }}</ion-label>
              <ion-icon :icon="closeCircle" @click="chosenTags.splice(idx, 1)" />
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

      titles: [],
      authors: [],
      types: [],
      tags: [],

      chosenTitle: {},
      chosenAuthors: [],
      chosenType: null,
      chosenTags: []
    };
  },

  mounted() {
    Promise.all([
      this.getAllTitles(),
      this.getAllAuthors(),
      this.getAllTitleTypes(),
      this.getAllTags()
    ])
    .then(() => console.log("ADDQUOTE done mounting"))
    .catch(error => console.log("ERROR", error));
  },
  
  methods: {
    getAllTitles() {
      return this.$axios.get("/titles").then(({ data }) => this.titles = data);
    },

    getAllAuthors() {
      return this.$axios.get("/authors").then(({ data }) => this.authors = data);
    },

    getAllTitleTypes() {
      return this.$axios.get("/types").then(({ data }) => this.types = data);
    },

    getAllTags() {
      return this.$axios.get("/tags").then(({ data }) => this.tags = data);
    },

    updateReqObj(field, input) {
      if(field == "Title") {
        if(this.chosenTitle && input.id >= 0 && this.chosenTitle.id == input.id)
        //nothing new has been sent; don't react
          return;
        
        this.chosenTitle = input;
        console.log(input);

        if(input.id >= 0) {
          this.$axios.get(`/title/${input.id}?full=true`)
          .then(({ data }) => {
            console.log(data);

            if(data) {
              this.chosenAuthors = data.authors;
              this.chosenType = data.type.id;
            } else {
              console.log("A funk: can't find title in db", input)
            }
          })
        } else { //reset
          this.chosenAuthors = [];
          this.chosenType = null;
        }
      } else if(field == "Authors") {
        if(this.chosenAuthors.map(author => author.value.toLowerCase()).includes(input.value.toLowerCase()))
          return;
        this.chosenAuthors.push(input);
      } else if(field == "Tags") {
        if(this.chosenTags.map(tag => tag.value.toLowerCase()).includes(input.value.toLowerCase()))
          return;
        this.chosenTags.push(input);
      }
    },
    createQuote() {
      let postObj = {
        quote: {
          text: this.quoteText,
          title_id: "id" in this.chosenTitle ? this.chosenTitle.id : null
        },
        title: {
          value: "value" in this.chosenTitle && this.chosenTitle.value.trim().length > 0 ? this.chosenTitle.value : null,
          type_id: this.chosenType ? this.chosenType : null
        },
        authors: this.chosenAuthors,
        tags: this.chosenTags
      };

      let msg = "";
      this.$axios.post('/quote', postObj)
      .then(() => {
        msg = "Quote successfully added (\",)";
      })
      .catch(error => {
        console.log("ERROR", error);
        msg = "Quote creation failed :(";
      })
      .then(() => {
        return toastController.create({
            message: msg,
            duration: 2000
          });
      })
      .then(toast => {
        this.$router.push("home");
        
        return toast.present();
      });
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