import React from "react";
import data from "./comp/data.json";
import "./App.css";
import dota2Img from "./comp/image/dota2.jpg";
import csImg from "./comp/image/cs.jpg";
import fortniteImg from "./comp/image/fortnite.jpg";
import lolImg from "./comp/image/lol2.jpg";

const bgList = [dota2Img, csImg, fortniteImg, lolImg];

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      lineStyle: { left: 0 },
    };
  }

  render() {
    return (
      <div className="nav">
        {data.map((d, i) => {
          return (
            <div
              key={i}
              className="nav-item"
              onClick={(event) => this.sendIndex(event, i)}
            >
              <div className="title">{d.Game}</div>
            </div>
          );
        })}
        <div className="line" style={this.state.lineStyle}></div>
      </div>
    );
  }

  sendIndex = (event, i) => {
    this.props.setIndex(i);
    this.setState({
      lineStyle: { left: i * 140 - 2 },
    });
  };
}

function Content(props) {
  return (
    <div className="content" style={props.style}>
      {data.map((d) => {
        return (
          <div key={d.Game} className="content-item" id={d.Game}>
            <div className="summary">
              <p>
                <strong>{d.Game}</strong> has total prize money of{" "}
                {formatter.format(d.AwardingMoney)} from {d.Tournaments}{" "}
                tournaments.
              </p>
            </div>
            <div className="ranking">
              <div className="rank head">
                <span>Country</span>
                <span>Name</span>
                <span>Age</span>
              </div>
              <div className="rank first">
                <span>{d.Player1_country}</span>
                <span>{d.Player1_name}</span>
                <span>{d.Player1_age}</span>
              </div>
              <div className="rank second">
                <span>{d.Player2_country}</span>
                <span>{d.Player2_name}</span>
                <span>{d.Player2_age}</span>
              </div>
              <div className="rank third">
                <span>{d.Player3_country}</span>
                <span>{d.Player3_name}</span>
                <span>{d.Player3_age}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tabIndex: 0,
      contentStyle: {
        transform: "translate(0,0)",
      },
      backgroundImage: `url(${bgList[0]})`,
    };
  }

  render() {
    const rootEl = document.querySelector("#root");
    rootEl.style.backgroundImage = this.state.backgroundImage;

    return (
      <div className="main">
        <Nav setIndex={this.setIndex} />
        <Content style={this.state.contentStyle} />
        <div className="source">
          <a href="https://www.esportsearnings.com/games" target="_blank">
            Source: esports earnings
          </a>
        </div>
      </div>
    );
  }

  setIndex = (i) => {
    this.setState({
      tabIndex: i,
      contentStyle: {
        transform: `translate(-${i * 600}px,0)`,
      },
      backgroundImage: `url(${bgList[i]})`,
    });
  };
}

export default App;
