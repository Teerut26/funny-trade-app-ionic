import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Home from "./pages/Home";
import Market from "./pages/Market.jsx";
import Trade from "./pages/Trade";
import Wallet from "./pages/Wallet";
import Setting from "./pages/Setting";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/Home">
            <Home />
          </Route>
          <Route exact path="/Market">
            <Market />
          </Route>
          <Route exact path="/Trade">
            <Trade />
          </Route>
          <Route exact path="/Wallet">
            <Wallet />
          </Route>
          <Route exact path="/Setting">
            <Setting />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="Home" href="/Home">
            <i className="fal fa-2x fa-home-lg-alt" />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Market" href="/Market">
            <i className="fal fa-poll fa-2x" />
            <IonLabel>Market</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Trade" href="/Trade">
            <i className="fal fa-exchange fa-2x" />
            <IonLabel>Trade</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Wallet" href="/Wallet">
            <i className="fal fa-wallet fa-2x" />
            <IonLabel>Wallet</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Setting" href="/Setting">
            <i className="fal fa-user fa-2x" />
            <IonLabel>Setting</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
