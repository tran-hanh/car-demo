import React, { Component } from "react";
import "./ChoosingCar.css";
import dataFeatures from "../data/arrayFeatures.json";
import dataWheels from "../data/wheels.json";

export default class ChoosingCar extends Component {
  //Create state to contain changed information
  state = {
    carCurrent: {
      id: 1,
      title: "Crystal Black",
      type: "Pearl",
      img: "./images/icons/icon-black.jpg",
      srcImg: "images-black/images-black-1/",
      color: "Black",
      price: "19,550",
      engineType: "In-Line 4-Cylinder",
      displacement: "1996 cc",
      horsepower: "158 @ 6500 rpm",
      torque: "138 lb-ft @ 4200 rpm",
      redline: "6700 rpm",
      wheels: [
        {
          idWheel: 1,
          srcImg: "images-black/images-black-1/",
        },
        {
          idWheel: 2,
          srcImg: "images-black/images-black-2/",
        },
        {
          idWheel: 3,
          srcImg: "images-black/images-black-3/",
        },
      ],
    },
  };

  changeCar = (newCar) => {
    this.setState({
      carCurrent: newCar,
    });
  };

  changeWheel = (newWheel) => {
    //Find in the current state
    let objectWheel = this.state.carCurrent.wheels.find(
      (item) => item.idWheel === newWheel.idWheel
    );
    if (objectWheel !== -1) {
      //Take srcImage from state
      this.setState({
        carCurrent: { ...this.state.carCurrent, srcImg: objectWheel.srcImg },
      });
    }
  };

  renderIcon = () => {
    return dataFeatures.map((item, index) => {
      return (
        <div
          onClick={() => {
            this.changeCar(item);
          }}
          style={{ cursor: "pointer" }}
          className="row mt-1 border border-color-default m-3"
          key={index}
        >
          <div className="col-2">
            <img
              className="p-2"
              src={item.img}
              alt={index}
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-10">
            <h3 className="p-3">{item.title}</h3>
            <p className="p-3 pt-0 mt-0">{item.type}</p>
          </div>
        </div>
      );
    });
  };

  renderWheels = () => {
    return dataWheels.map((item, index) => {
      return (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            this.changeWheel(item);
          }}
          className="row mt-1 border border-color-default m-3"
          key={index}
        >
          <div className="col-2">
            <img
              className="p-2"
              src={item.img}
              alt={index}
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-10 d-flex flex-colum align-items-center">
            <span className="p-3">{item.title}</span>
          </div>
        </div>
      );
    });
  };

  //This function runs after render() runs
  componentDidMount = () => {
    let tagScript = document.createElement("script");
    tagScript.src =
      "https://cdn.scaleflex.it/plugins/js-cloudimage-360-view/2.6.0/js-cloudimage-360-view.min.js";
    document.querySelector("#appendScript").appendChild(tagScript);
  };

  //This function runs after state changed -> dont set state in this function
  componentDidUpdate = () => {
    //Clean old image
    document.querySelector("#carCurrent").innerHTML = "";
    let tagScript = document.createElement("script");
    tagScript.src =
      "https://cdn.scaleflex.it/filerobot/js-cloudimage-360-view/v2.0.0.lazysizes.min.js";
    //Clear old script befor appending new script
    document.querySelector("#appendScript").innerHTML = "";
    document.querySelector("#appendScript").appendChild(tagScript);
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            <div className="model">
              {/* <img
                style={{ width: "100%" }}
                src="./images/images-black/images-black-1/civic-1.jpg"
              /> */}
              <div
                id="carCurrent"
                style={{ minWidth: "100%" }}
                className="cloudimage-360"
                data-folder={"./images/" + this.state.carCurrent.srcImg}
                data-filename="civic-{index}.jpg"
                data-amount={8}
              />
            </div>
            <div id="appendScript" />

            <div className="card mt-2">
              <h5 className="card-header text-default">Exterior Header</h5>
              <table className="table border border-color-light" border="1">
                <tbody>
                  <tr>
                    <td> Color </td>
                    <td> Black </td>
                  </tr>
                  <tr>
                    <td> Price </td>
                    <td> $ 19.000,00 </td>
                  </tr>
                  <tr>
                    <td> Engine Type </td>
                    <td> In-line-4-cylinder </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-6">
            <div className="card text-left">
              <h5 className="card-header text-default">Exterior color</h5>
              <div className="container-fluid">{this.renderIcon()}</div>
            </div>

            <div className="card text-left">
              <h5 className="card-header text-default">Wheels</h5>
              <div className="container-fluid">{this.renderWheels()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
