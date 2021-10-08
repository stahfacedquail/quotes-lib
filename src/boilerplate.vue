<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div id="container">

            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue'
import { IonPage, IonContent } from "@ionic/vue";

export default defineComponent({
    name: "",
    components: {
        IonPage,
        IonContent
    }
})
</script>

<style scoped>

</style>
