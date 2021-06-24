import {
  IonContent,
  IonHeader,
  IonItem,
  IonPage,
  IonToggle,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";

const Setting: React.FC = () => {
  const [dark, setdark] = useState(false);
  const toggleDarkModeHandler = () => {
    if (dark) {
      document.body.classList.remove("dark");
      setdark(false);
    } else {
      document.body.classList.toggle("dark");
      setdark(true);
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Setting</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Setting</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem>
          Dark Mode
          <IonToggle checked={dark} onIonChange={()=>toggleDarkModeHandler()} color="primary" />
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Setting;
