import React, { Component } from "react";
import PictureCard from "./components/PictureCard/PictureCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Navbar from "./components/Navbar";
import pictures from "./images.jason";
import "./App.css";

//handle the restart button

class App extends Component {
  // Setting this.state.Pictures to the Pictures json array
  state = {
    pictures: pictures,
    currentScore: 0,
    topScore: 0,
    imagesAlreadyClicked: [],
    status: "Click an image to begin!"
  };
  

  handleImageClick = id => {
    var that=this
    const picArray = this.state.imagesAlreadyClicked;
    console.log("***", this.state.imagesAlreadyClicked);
    console.log("####", picArray.includes(id));

    if (picArray.includes(id)) {
      if (this.state.currentScore>this.state.topScore){
        this.setState({
          topScore: this.state.currentScore
        })
      }
      this.setState({
        status: "You guessed incorrect!",
        
      })
      
      document.querySelector("#status").classList.add("red-text")
      setTimeout(function () {
        document.querySelector("#status").classList.remove("red-text")
        that.setState({
          
          currentScore: 0,
          imagesAlreadyClicked: [],
          status:"Click any image to begin!"
        })
      }, 500)
      
    }
    else {
      this.state.imagesAlreadyClicked.push(id)
      this.setState({
        currentScore: this.state.currentScore + 1,
        status: "You guessed correctly!"
      });
      document.querySelector("#status").classList.add("green-text")
      setTimeout(function () {
        document.querySelector("#status").classList.remove("green-text")
      }, 500)
    }
    this.endGame();
    this.shuffle(pictures);
  }



  endGame() {
    // check if currentScore is larger than topScore

    if (this.state.currentScore > 12) {
      let score = this.state.currentScore
      this.setState({
        topScore: score,
        currentScore: 0,
        imagesAlreadyClicked: [],
        status:"Click any image to begin!"
      })
    }
    // take the current Pictures array and reorder

  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  // Map over this.state.Pictures and render a DisneyChar component for each character object
  render() {
    return (
      <div>
        <Navbar
          currentScore={this.state.currentScore}
          topScore={this.state.topScore}
          status={this.state.status}
        />
        <Wrapper>

          <Title>Clicky Game!</Title>
          <h1>Click on an image to earn points, but don't click on any more than once!</h1>
          
          {this.state.pictures.map((pictures, key) => (
            <PictureCard
              handleImageClick={this.handleImageClick}
              id={pictures.id}
              key ={key}
              name={pictures.name}
              image={pictures.image}
            />
          ))}
        </Wrapper>
      </div>
    );
  }
}
export default App;

