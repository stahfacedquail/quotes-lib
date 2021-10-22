<template>
<ion-page>
    <AppHeader />

    <ion-content :fullscreen="true">    
        <div id="container">
            <p>{{ quote.text }}</p>
            <br>
            <a v-show="quote.title && quote.title.url" :href="quote.title ? quote.title.url : ''" style="text-align:right;font-style:italic;">— {{ quote.title ? quote.title.value : "" }}</a>
            <p v-show="quote.title && quote.title.url == null" style="text-align:right;font-style:italic;">— {{ quote.title ? quote.title.value : "" }}</p>
            
            <br>
            
            <div v-show="quote.authors.length > 0">
                <strong>Authors</strong>
                <p v-for="(author, idx) in quote.authors" :key="idx">{{ author.value }}</p>
            </div>

            <br>

            <div v-show="quote.tags.length > 0">
                <strong>Tags</strong>
                <p>{{ quote.tags.map(tag => tag.value).join(", ") }}</p>
            </div>
        </div>
    </ion-content>
</ion-page>
</template>

<script>
import { defineComponent } from 'vue'
import { IonPage, IonContent } from "@ionic/vue";
import { useRoute } from "vue-router";
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
            quote: {
                text: "",
                authors: [],
                tags: [],
                title: null
            }
        };
    },

    mounted() {
        return this.getQuoteWithAllAttributes()
        .then(() => console.log("VIEWQUOTE Done mounting"))
        .catch(error => console.log("ERROR", error));
    },

    methods: {
        getQuoteWithAllAttributes() {
            return this.$axios.get(`/quote/${this.id}?full=true`).then(({ data }) => this.quote = data);
        }
    }
});
</script>

<style scoped>

</style>
