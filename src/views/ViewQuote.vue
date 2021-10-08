<template>
<ion-page>
    <AppHeader />

    <ion-content :fullscreen="true">    
        <div id="container">
            <p>{{ data.quote.text }}</p>
            <br>
            <a v-show="data.title && data.title.url" :href="data.title ? data.title.url : ''" style="text-align:right;font-style:italic;">— {{ data.title ? data.title.value : "" }}</a>
            <p v-show="data.title && data.title.url == null" style="text-align:right;font-style:italic;">— {{ data.title ? data.title.value : "" }}</p>
            
            <br>
            
            <div v-show="data.authors.length > 0">
                <strong>Authors</strong>
                <p v-for="(author, idx) in data.authors" :key="idx">{{ author.value }}</p>
            </div>

            <br>

            <div v-show="data.tags.length > 0">
                <strong>Tags</strong>
                <p>{{ data.tags.map(tag => tag.value).join(", ") }}</p>
            </div>
        </div>
    </ion-content>
</ion-page>
</template>

<script>
import { defineComponent } from 'vue'
import { IonPage, IonContent } from "@ionic/vue";
import { useRoute } from "vue-router";
import db from "../db/mockDb.js";
import AppHeader from "../components/AppHeader.vue";

export default defineComponent({
    name: "ViewQuote",
    components: {
        AppHeader,
        IonPage,
        IonContent
    },
    setup() {
        const route = useRoute();
        const { id } = route.params;
        return { id };
    },
    data() {
        return {
            data: db.getQuoteWithAllAttributes(this.id)
        };
    }
});
</script>

<style scoped>

</style>
