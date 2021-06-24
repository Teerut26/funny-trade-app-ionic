import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonLabel,
  IonAvatar,
  IonSearchbar,
} from "@ionic/react";

import { useEffect, useState, Component } from "react";
import { useDispatch, connect } from "react-redux";

let socket = new WebSocket(
  "wss://wsdesktop.bitkub.com/websocket-market-api/subscribe/ticker"
);

const commaNumber = (number, n) => {
  try {
    var num = Number.parseFloat(number).toFixed(n);
    return numberWithCommas(num);
  } catch {
    return <i class="fas fa-circle-notch fa-spin"></i>;
  }
};

const numberWithCommas = (x) => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

const nFormatter = (num, digits) => {
  var si = [
    {
      value: 1,
      symbol: "",
    },
    {
      value: 1e3,
      symbol: "k",
    },
    {
      value: 1e6,
      symbol: "M",
    },
    {
      value: 1e9,
      symbol: "G",
    },
    {
      value: 1e12,
      symbol: "T",
    },
    {
      value: 1e15,
      symbol: "P",
    },
    {
      value: 1e18,
      symbol: "E",
    },
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
};

const Market = (props) => {
  const [dark, setdark] = useState(false);
  const [dataFromUrl, setData] = useState([]);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  const toggleDarkModeHandler = () => {
    if (dark) {
      document.body.classList.remove("dark");
      setdark(false);
    } else {
      document.body.classList.toggle("dark");
      setdark(true);
    }
  };

  const get_data = async () => {
    let res = await fetch(`https://api.bitkub.com/api/market/ticker`);
    let data = await res.json();
    let obj = [];
    for (let key in data) {
      dispatch({
        type: "SET_DATA_SYMBOL",
        data: {
          symbol: key,
          data: data[key],
        },
      });
    }
  };

  const wssOnmessage = () => {
    socket.onmessage = (event) => {
      let data = JSON.parse(event.data).data;
      dispatch({
        type: "SET_DATA_TRADE",
        data: {
          symbol:
            "THB_" +
            data.stream.replace("market.ticker.thb_", "").toUpperCase(),
          data: data,
        },
      });
    };
  };

  useEffect(() => {
    get_data();
    wssOnmessage();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">Market</IonTitle>
          {dark ? (
            <i
              onClick={() => toggleDarkModeHandler()}
              style={{ marginRight: 10 }}
              slot="end"
              className="fas fa-2x fa-sun"
            />
          ) : (
            <i
              onClick={() => toggleDarkModeHandler()}
              style={{ marginRight: 10 }}
              slot="end"
              className="fad fa-2x fa-moon"
            />
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Market</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Lists dataFromUrl={props.data} />
      </IonContent>
    </IonPage>
  );
};

const map_data = (state) => {
  return {
    data: state.crypto_data,
  };
};

export default connect(map_data)(Market);

function Lists(props) {
  return (
    <div>
      <IonList>
        {props.dataFromUrl.map((item) => (
          <List obj={item} baseValue={item.baseVolume} />
        ))}
      </IonList>
    </div>
  );
}

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      baseValue: 0,
      show: false,
    };
  }

  componentDidMount() {
    this.setState({ baseValue: this.props.baseValue });
  }

  componentDidUpdate() {
    if (
      this.props.baseValue !== this.state.baseValue &&
      this.state.baseValue != 0
    ) {
      this.setState({ show: true });
      // console.log(this.state.show);
      this.setState({ baseValue: this.props.baseValue });
      setTimeout(() => {
        this.setState({ show: false });
        // console.log(this.state.show);
      }, 300);
    }
  }
  render() {
    return (
      <IonItem >
        <IonAvatar slot="start">
          <img
            src={`https://bitkub.com/static/images/icons/${this.props.obj.symbol.replace(
              "THB_",
              ""
            )}.png`}
          />
        </IonAvatar>
        <IonLabel >
          {this.props.obj.symbol.replace("THB_", "")} <br />{" "}
          <small className={this.state.show ? "text-tiker" : ""} >Vol : {nFormatter(this.props.obj.data.baseVolume, 1)}</small>
          <br />{" "}
          <small>
            {this.props.obj.data.percentChange >= 0 ? (
              <div className="text-green">
                <i class="fas fa-caret-up"></i>{" "}
                {this.props.obj.data.percentChange}%
              </div>
            ) : (
              <div className="text-red">
                <i class="fas fa-caret-down"></i>{" "}
                {this.props.obj.data.percentChange.toString().replace("-", "")}%
              </div>
            )}
          </small>
        </IonLabel>
        <div slot="end">
          {commaNumber(this.props.obj.data.last, 2)} <br />{" "}
        </div>
      </IonItem>
    );
  }
}
