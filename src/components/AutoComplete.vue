<template>
    <ion-item>
        <ion-label position="stacked">{{ name }}</ion-label>
        <ion-input v-model="searchValue"
            @ionChange="updateSearchResults"
            @ionFocus="updateSearchResults"
            @ionBlur="updateSearchField(null)"
            @keydown.enter="updateSearchField(null)"
        />
    </ion-item>
    <ion-list v-show="searchValue.length > 0">
        <!--  @mousedown.prevent prevents blur event so that click event can happen first, so that update
                of title box can happen before input area loses focus -->
        <ion-item v-for="(result, idx) in searchResults"
                :key="idx"
                button
                @mousedown.prevent
                @click="updateSearchField(result)"
        >
            <ion-label>{{ result.name }}</ion-label>
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
        data: { type: Array, required: true, default: () => [] }, //all possible values (currently) for this field
        multipleValues: { type: Boolean, required: false, default: () => false }
    },
    data() {
        return {
            searchValue: "",
            searchResults: []
        };
    }, methods: {
        updateSearchResults() {
            this.searchResults = this.data.filter(elem => elem.name.toLowerCase().includes(this.searchValue.toLowerCase()));
      
            /*  Once user chooses a match, Vue will try to search again and create another list with search results
                This check clears the list if the only result matches what is in the search box */
            if(this.searchResults.length == 1 && this.searchResults[0].name == this.searchValue)
                this.searchResults = [];
        },
        updateSearchField(result) {
            if(this.multipleValues) {
                if(result) {
                    this.searchValue = "";
                } else {
                    //got here by pressing enter -- take whatever value is in the input box
                    let found = false;
                    let i;
                    for(i = 0; i < this.data.length && !found; i++)
                        if(this.data[i].name.toLowerCase() == this.searchValue.toLowerCase()) {
                            found = true;
                            i--;
                        }
                    
                    if(found)
                        result = this.data[i];
                    else {
                        result = {
                            "id": -1,
                            "name": this.searchValue
                        }
                    }

                    this.searchValue = "";
                }
            } else {
                if(result) {
                    this.searchValue = result.name;
                    this.searchResults = []; //clear search results after match selected
                } else { //either the field lost focus or the user hit enter?  Send whatever value is in the input box
                    let i;
                    let found = false;
                    
                    for(i = 0; i < this.data.length && !found; i++)
                        if(this.data[i].name.toLowerCase() == this.searchValue.toLowerCase()) {
                            found = true;
                            i--;
                        }
                    
                    if(found)
                        result = this.data[i];
                    else {
                        result = {
                            "id": -1,
                            "name": this.searchValue
                        }
                    }
                }
            }

            this.$emit("value-updated", this.name, result);
        }
    },
    emits: [
        "value-updated"
    ]
})
</script>
