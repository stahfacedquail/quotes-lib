<template>
    <ion-item>
        <ion-label position="stacked">{{ name }}</ion-label>
        <ion-input v-model="searchValue" @ionChange="updateSearchResults" @ionFocus="updateSearchResults" @ionBlur="searchResults = []" />
    </ion-item>
    <ion-list id="results" v-show="searchValue.length > 0">
        <!--  @mousedown.prevent prevents blur event so that click event can happen first, so that update
                of title box can happen before input area loses focus -->
        <ion-item v-for="(result, idx) in searchResults" :key="idx" button @mousedown.prevent @click="updateSearchField(result)">
            <ion-label>{{ result }}</ion-label>
        </ion-item>
    </ion-list>
</template>

<script>
import { defineComponent } from 'vue';
import { IonItem, IonLabel, IonInput, IonList } from "@ionic/vue";

export default defineComponent({
    name: "AutoComplete",
    components: {
        IonItem,
        IonLabel,
        IonInput,
        IonList
    },
    props: {
        name: { type: String, required: true }, //name of the field
        data: { type: Array, required: true, default: () => [] } //all possible values (currently) for this field
    },
    data() {
        return {
            searchValue: "",
            searchResults: []
        };
    }, methods: {
        updateSearchResults() {
            this.searchResults = this.data.filter(value => value.toLowerCase().includes(this.searchValue.toLowerCase()));
      
            /*  Once user chooses a match, Vue will try to search again and create another list with search results
                This check clears the list if the only result matches what is in the search box */
            if(this.searchResults.length == 1 && this.searchResults[0] == this.searchValue)
                this.searchResults = [];
        },
        updateSearchField(result) {
            this.searchValue = result;
            this.searchResults = []; //clear search results after match selected
        }
    }
})
</script>
