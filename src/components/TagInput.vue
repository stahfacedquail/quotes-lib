<template>
    <ion-item>
        <ion-label position="stacked">Tags <span class="littleText">(max 5)</span></ion-label>
        <ion-input
            v-model="tagValue"
            :disabled="tagList.length == 5"
            @ionChange="updateTagSearchList"
            @ionFocus="updateTagSearchList"
            @ionBlur="tagSearchList = []"
            @keydown.enter="updateTagList(tagValue)"
        />
    </ion-item>
    <ion-list v-show="tagValue.length > 0">
        <!--  @mousedown.prevent prevents blur event so that click event can happen first, so that update
                of title box can happen before input area loses focus -->
        <ion-item v-for="(result, idx) in tagSearchList" :key="idx" button @mousedown.prevent @click="updateTagList(result)">
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
        data: { type: Array, required: true, default: () => [] } //all possible values (currently) for this field
    },
    data() {
        return {
            tagValue: "",
            tagList: [],
            tagSearchList: []
        };
    }, methods: {
        updateTagSearchList() {
            this.tagSearchList = this.data.filter(value => value.toLowerCase().includes(this.tagValue.toLowerCase()));
      
            /*  Once user chooses a match, Vue will try to search again and create another list with search results
                This check clears the list if the only result matches what is in the search box */
            if(this.tagSearchList.length == 1 && this.tagSearchList[0] == this.tagValue)
                this.tagSearchList = [];
        },
        updateTagList(result) {
            this.tagList.push(result);
            this.tagValue = "";
            console.log(this.tagList);
            //this.tagSearchList = []; //clear search results after match selected
        }
    }
})
</script>

<style scoped>
.littleText {
    font-size: 12px;
}
</style>