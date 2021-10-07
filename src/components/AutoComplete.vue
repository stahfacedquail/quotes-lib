<template>
    <ion-item>
        <ion-label position="stacked">{{ labelName }}</ion-label>
        <ion-input v-model="searchValue"
            @ionChange="updateSearchResults"
            @ionFocus="updateSearchResults"
            @ionBlur="searchResults = []; multipleValues ? null : updateSearchField(null)"
            @keydown.enter="multipleValues ? updateSearchField(null) : null"
        />  <!-- if input field loses focus, only update the model if it's a single-value field. -->
            <!-- if user presses enter on input field, only activate update protocol if it's a multi-value field -->
    </ion-item>
    <ion-list v-show="searchValue.length > 0">
        <!--  @mousedown.prevent prevents blur event so that click event can happen first, so that update
                of value box can happen before input area loses focus -->
        <ion-item v-for="(result, idx) in searchResults"
                :key="idx"
                button
                @mousedown.prevent
                @click="updateSearchField(result)"
        >
            <ion-label>{{ result.value }}</ion-label>
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
        labelName: { type: String, required: true }, //name of the field
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
            this.searchResults = this.data.filter(elem => elem.value.toLowerCase().includes(this.searchValue.toLowerCase()));
      
            /*  Once user chooses a match, Vue will try to search again and create another list with search results
                This check clears the list if the only result matches what is in the search box */
            if(this.searchResults.length == 1 && this.searchResults[0].value.toLowerCase() == this.searchValue.toLowerCase())
                this.searchResults = [];
        },
        updateSearchField(result) {
            if(this.multipleValues) {
                if(result) { //got here by clicking one of the search results
                    this.searchValue = ""; //clear the field; search result will be added to separate display list
                } else {
                    //got here by pressing enter -- take whatever value is in the input box
                    //but first make sure you get an existing matching result
                    result = this.formResultObj();

                    this.searchValue = "";
                }
            } else {
                if(result) {
                    this.searchValue = result.value;
                    this.searchResults = []; //clear search results after match selected
                } else //the field lost focus.  Send whatever value is in the input box
                    result = this.formResultObj();
            }

            this.$emit("value-updated", this.labelName, result);
        },
        formResultObj() {
            let result;
            let i;
            let found = false;
            
            for(i = 0; i < this.data.length && !found; i++)
                if(this.data[i].value.toLowerCase() == this.searchValue.toLowerCase()) {
                    found = true;
                    i--;
                }
            
            if(found)
                result = this.data[i];
            else
                result = {
                    id: -1,
                    value: this.searchValue
                }
            
            return result;
        }
    },
    emits: [
        "value-updated"
    ]
})
</script>
