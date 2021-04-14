import Head from 'next/head'
import React, { Component } from 'react'
import styles from '../styles/Home.module.css'
import { Button, Checkbox } from 'semantic-ui-react'

class Donation extends Component {
  constructor(props){
    super(props);

    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck() {
    this.props.onChange(this.props.qId, !this.props.checked);
  }

  render(){
    return (
      <div className={styles.card}>
        <h3>{this.props.title}</h3>
        <Checkbox label={<label>{this.props.msg1}</label>} onClick={this.handleCheck} checked={this.props.checked}/>
        <br/><br/>
        <Checkbox label={<label>{this.props.msg2}</label>} onClick={this.handleCheck} checked={!this.props.checked}/>
      </div>
    )
  }
}

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      controlStatus: Math.random() < 0.5,
      start: false,
      startTime: 0,
      endTime: 0,
      disabledButton: true,
      donationText: "Submit Donations",
      cq1: true,
      cq2: false,
      eq1: true
    }

    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleChange = this.handleChange.bind(this);  // checkboxes
  }
  
  handleStart(){
    this.setState({
      start: true,
      startTime: Date.now()
    })
  }

  handleEnd(){
    this.setState({
      endTime: Date.now(),
      disabledButton: false,
      donationText: "Thanks for donating!"
    })
  }

  componentDidUpdate() {
    console.log((this.state.endTime-this.state.startTime)/1000);
  }

  handleChange(qId, checked) {
    console.log(`student ${qId} is ${checked ? 'checked' : 'unchecked'}`);
    if (qId == "cq1"){
      this.setState({cq1: checked});
    }
    if (qId == "cq2"){
      this.setState({cq2: checked});
    }
    if (qId == "eq1"){
      this.setState({eq1: checked});
    }
  }


  render(){
    return (
      <div className={styles.container}>
        <Head>
          <title>Ethics Assignment 3</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className={styles.main}>
          <h1 className={styles.title}>
            Super Legit Donation Campaign Website
          </h1>
  
          <p className={styles.description}>
            Pretend this is a real donation portal for ✨Kirby✨, your preferred, beloved💕 candidate running in a local election!
            <br/>You want to support X's campaign with donations, without giving more than you can financially afford.
          </p>

          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/SSU_Kirby_artwork.png/220px-SSU_Kirby_artwork.png"/>
            
          <p className={styles.description}>
            Click the button below when you're ready. 
            <br/>You will be asked to choose from available donation options, then given a quick survery to fill out.
          </p>
  
          { this.state.start ? 

          <div>
            {this.state.controlStatus ? 

            // CONTROL OPTIONS
            <div className={styles.grid, styles.start}>
              <Donation title={"One-time donation"} 
                        msg1={"Donate $10"}
                        msg2={"I want Kirby to lose!"}
                        onChange={this.handleChange} 
                        qId="cq1" 
                        checked={this.state.cq1}/>

              <Donation title={"Monthly-time donation"} 
                        msg1={"Donate $10"} 
                        msg2={"Tell Kirby you're a traitor and you want them to lose"} 
                        onChange={this.handleChange} qId="cq2" checked={this.state.cq2}/>
            </div>
           
           : 

            // EXPERIMENT OPTIONS
            <div className={styles.grid, styles.start}>
              <Donation title={"One-time donation"}
                        msg1={"Donate $10"} 
                        msg2={"No donation this time!"}  
                        onChange={this.handleChange} 
                        qId="eq1" 
                        checked={this.state.eq1}/>

            </div> 

            }

            <br/>

            <Button disabled={this.state.disabledButton} color='orange' floated='right'>
              Take Survey!
            </Button>

            <Button disabled={!this.state.disabledButton} inverted color='green' floated='right' onClick={this.handleEnd}>
                {this.state.donationText}
            </Button>
          </div>
          
            :

          <Button inverted color='green' onClick={this.handleStart} size='big'>
            Alrighty, let's start.
          </Button> }
          
        </main>
  
        <footer className={styles.footer}>
          <p>
            This was created for a class. Thank you!
          </p>
        </footer>
      </div>
    )
  }
  
}


export default function Home() {
  return (
   <Main />
  )
}
