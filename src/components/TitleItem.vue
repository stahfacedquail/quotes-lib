<template>
   <ion-item>
        <ion-label>
        <h2>{{ title.value }}</h2>
        <p v-show="authors.length > 0" class="author">
            {{ authorsLine }}
        </p>
        </ion-label>
    </ion-item> 
</template>

<script>
import { defineComponent } from 'vue'
import {
    IonItem,
    IonLabel
} from "@ionic/vue";

export default defineComponent({
    name: "TitleItem",
    components: {
        IonItem,
        IonLabel
    },
    props: {
        title: { type: Object,  required: true  },
        authors: { type: Array  }
    },
    computed: {
        authorsLine() {
            switch(this.authors.length) {
                case 0: return "";
                case 1: return this.authors[0].value;
                case 2: return this.authors[0].value + " & " + this.authors[1].value;
                default: {
                    let str = "";
                    let i = 0;
                    for(; i < this.authors.length - 2; i++)
                        str += ( this.authors[i].value + ", " );
                    str += ( this.authors[i].value + " & " + this.authors[i+1].value );

                    return str;
                }
            }
        }
    }
})
</script>

<style scoped>
.author {
    font-size: 12px !important;
    line-height: 18px !important;
}
</style>
