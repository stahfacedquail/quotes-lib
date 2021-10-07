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
        /> <!-- keydown., as well? -->
    </ion-item>
    <ion-list v-show="tagValue.length > 0">
        <!--  @mousedown.prevent prevents blur event so that click event can happen first, so that update
                of title box can happen before input area loses focus -->
        <ion-item v-for="(result, idx) in tagSearchList" :key="idx" button @mousedown.prevent @click="updateTagList(result)">
            <ion-label>{{ result.value }}</ion-label>
        </ion-item>
    </ion-list>
    <ion-list>
        <ion-chip v-for="(tag, idx) in tagList" :key="idx">
            <ion-label>{{ tag.value }}</ion-label>
            <ion-icon :icon="closeCircle" @click="removeTag(idx)" />
        </ion-chip>
    </ion-list>

    
</template>

<script>
import { defineComponent } from 'vue';
import { IonItem, IonLabel, IonInput, IonList, IonChip, IonIcon } from "@ionic/vue";
import { closeCircle } from "ionicons/icons";

export default defineComponent({
    name: "AutoComplete",
    components: {
        IonItem,
        IonLabel,
        IonInput,
        IonList,
        IonChip,
        IonIcon
    },
    props: {
        data: { type: Array, required: true, default: () => [] } //all possible values (currently) for this field
    },
    data() {
        return {
            tagValue: "",
            tagList: [],
            tagSearchList: [],
            tagListLowerCase: []
        };
    }, methods: {
        updateTagSearchList() {
            this.tagSearchList = this.data.filter(tag => tag.value.toLowerCase().includes(this.tagValue.toLowerCase()));
        },
        updateTagList(result) {
            let res = {};
            
            if(typeof result == "string") {
                if(this.tagSearchList.length > 0 && result.toLowerCase() == this.tagSearchList[0].value) //matches an existing db entry
                    res = this.tagSearchList[0];
                else
                    //doesn't exist on db yet, so flag that db needs to create it
                    res = { id: -1, value: result };
            } else { //one of the tags that already as a db-assigned id
                //so check if it's a duplicate in the list of tags
                res = result;
            }

            if(this.tagListLowerCase.includes(res.value.toLowerCase())) {
                this.tagValue = "";
                return;
            }

            this.tagList.push(res);
            this.tagListLowerCase.push(res.value.toLowerCase());
            this.tagValue = "";

            this.$emit("value-updated", "Tags", this.tagList);
        },
        removeTag(i) {
            this.tagList.splice(i, 1);
            this.tagListLowerCase.splice(i, 1);
            this.$emit("value-updated", "Tags", this.tagList);
        }
    }, setup() {
        return {
            closeCircle
        }
    }, emits: [
        "value-updated"
    ]
})
</script>

<style scoped>
.littleText {
    font-size: 12px;
}
</style>