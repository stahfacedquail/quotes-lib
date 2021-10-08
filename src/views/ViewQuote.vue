<template>
<ion-page>
    <AppHeader :title="data.title ? data.title.value : ''" />
    
    <ion-content :fullscreen="true">    
        <div id="container">
            <p>{{ data.quote.text }}</p>
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
})
</script>

<style scoped>

</style>
