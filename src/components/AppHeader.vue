<template>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons>
            <ion-button router-link="/home">
                <ion-icon :icon="chevronBackOutline"></ion-icon>
            </ion-button>
            <ion-title>
                {{ title }}
            </ion-title>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
</template>

<script>
import { defineComponent } from 'vue';
import { IonHeader, IonButton, IonButtons, IonIcon, IonTitle, IonToolbar} from "@ionic/vue";
import { chevronBackOutline } from "ionicons/icons"

export default defineComponent({
    name: "AppHeader",
    components: {
        IonHeader,
        IonButton,
        IonButtons,
        IonIcon,
        IonTitle,
        IonToolbar
    },
    props: {
        title: { type: String,  required: true  }
    },
    setup() {
        return {
            chevronBackOutline
        };
    },
});
</script>
