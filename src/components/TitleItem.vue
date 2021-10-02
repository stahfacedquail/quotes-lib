<template>
   <ion-item>
        <ion-label>
        <h2>{{ title.name }}</h2>
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
                case 1: return this.authors[0].name;
                case 2: return this.authors[0].name + " & " + this.authors[1].name;
                default: {
                    let str = "";
                    let i = 0;
                    for(; i < this.authors.length - 2; i++)
                        str += ( this.authors[i].name + ", " );
                    str += ( this.authors[i].name + " & " + this.authors[i+1].name );

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
