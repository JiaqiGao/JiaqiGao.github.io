import Head from 'next/head'
import React, { Component } from 'react'
import styles from '../styles/Home.module.css'
import { Button, Checkbox, Container } from 'semantic-ui-react'

class Donation extends Component {
  constructor(props){
    super(props);

    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck() {
    this.props.onChange(this.props.qId, !this.props.checked);
  }

  render(){
    if (this.props.control_type) {
      return (
        <div className={styles.card}>
          <h3>{this.props.title}</h3>
          <p>{this.props.description}</p>
          <br/>
          <Checkbox label={<label>{this.props.msg1}</label>} onClick={this.handleCheck} />
          <br/><br/>
          <label>{this.props.msg2}</label>
        </div>
      )
    } else {
      return (
        <div className={styles.card}>
          <h3>{this.props.title}</h3>
          <p>{this.props.description}</p>
          <br/>
          <Checkbox label={<label>{this.props.msg1}</label>} onClick={this.handleCheck} checked={this.props.checked}/>
          <br/><br/>
          <Checkbox label={<label>{this.props.msg2}</label>} onClick={this.handleCheck} checked={!this.props.checked}/>
        </div>
      )
    }
    
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
      eq1: true,
      eq2: true,
      eq3: true,
      eq4: true,
      eq5: true,
      cq1: false,
      cq2: false,
      cq3: false,
      cq4: false,
      cq5: false,
      totalDonations: 0,
      queryString: "#"
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
    var total = 0;
    if (this.state.controlStatus){
      if (this.state.cq1){
        total += 20;
      }
      if (this.state.cq2){
        total += 15;
      }
      if (this.state.cq3){
        total += 27;
      }
      if (this.state.cq4){
        total += 12;
      }
      if (this.state.cq5){
        total += 16;
      }
    }else{
      if (this.state.eq1){
        total += 20;
      }
      if (this.state.eq2){
        total += 15;
      }
      if (this.state.eq3){
        total += 27;
      }
      if (this.state.eq4){
        total += 12;
      }
      if (this.state.eq5){
        total += 16;
      }
    }
    

    // Create Qualtrics Query String
    var link = "https://uchicago.co1.qualtrics.com/jfe/form/SV_dgV556kBNVvZVmC?";
    link+="Experiment="
    if (this.state.controlStatus){
      link+="control"
    }else{
      link+="experiment";
    }
    link+="&TimeSpent="+((Date.now()-this.state.startTime)/1000).toString();
    link+="&TotalDonations="+(total).toString();

    this.setState({
      endTime: Date.now(),
      disabledButton: false,
      donationText: "Thank you!",
      totalDonations: total,
      queryString: link
    })
  }

  componentDidUpdate() {
    console.log((this.state.endTime-this.state.startTime)/1000, this.state.totalDonations);
  }

  handleChange(qId, checked) {
    if (qId == "cq1"){
      this.setState({cq1: checked});
    }
    if (qId == "cq2"){
      this.setState({cq2: checked});
    }
    if (qId == "cq3"){
      this.setState({cq3: checked});
    }
    if (qId == "cq4"){
      this.setState({cq4: checked});
    }
    if (qId == "cq5"){
      this.setState({cq5: checked});
    }
    if (qId == "eq1"){
      this.setState({eq1: checked});
    }
    if (qId == "eq2"){
      this.setState({eq2: checked});
    }
    if (qId == "eq3"){
      this.setState({eq3: checked});
    }
    if (qId == "eq4"){
      this.setState({eq4: checked});
    }
    if (qId == "eq5"){
      this.setState({eq5: checked});
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
          <h3 className={styles.personal}><a href="actually-me/index.html">If you are here for my personal website, click here please!</a> (Excuse my reuse of github pages haha!)</h3>
          <br />
          <h1 className={styles.title}>
            Kirby's Campaign Donation Website
          </h1>
  
          <p className={styles.description}>
            This is a campaign donation portal for ✨Kirby✨, your preferred, beloved💕 candidate running in a local election!
            <br/>You truly want to support Kirby's campaign, but you have an approximate donation budget of $40.
          </p>

          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/SSU_Kirby_artwork.png/220px-SSU_Kirby_artwork.png"/>
            
          <p className={styles.description}>
            You will be asked to confirm your donation, then directed to fill out a quick survey.
            <br/>Click the button below when you're ready. 
            <br/>Disclaimer: This donation portal is totally fake and your real money is safe in your wallet (safe from this website at least).
          </p>
  
          { this.state.start ? 

          <div>
            {this.state.controlStatus ? 

            // CONTROL OPTIONS
            <div className={styles.grid, styles.start}>
              <Donation title={"One-time donation"}
                        msg1={"Donate $20"} 
                        msg2={"Leave unchecked for no donation this time."}  
                        onChange={this.handleChange} 
                        qId="cq1" 
                        checked={this.state.cq1}
                        control_type={true}/>
              
              <Donation title={"Monthly donation"}
                        msg1={"Donate another $3 at the end of each month until the election in September."}  
                        msg2={"Leave unchecked for no monthly donation at this time."}   
                        onChange={this.handleChange} 
                        qId="cq2" 
                        checked={this.state.cq2}
                        control_type={true}/>
              
              <Donation title={"Birthday donation"}
                        description={"Kirby is turning 29 in a few days on April 27th. Wish Kirby a happy birthday with a small donation!"}
                        msg1={"Donate an additional $27 on April 29th"}  
                        msg2={"Leave unchecked for no birthday donation at this time."}   
                        onChange={this.handleChange} 
                        qId="cq3" 
                        checked={this.state.cq3}
                        control_type={true}/>
              
              <Donation title={"Super Kirby Fan donation"}
                        description={"Demonstrate yourself as Kirby's TOP grassroots supporter! This is your last chance to get your status of Super Kirby Fan!"}
                        msg1={"Donate a one-time additional $12"}  
                        msg2={"Leave unchecked for no Super Kirby Fan donation."}   
                        onChange={this.handleChange} 
                        qId="cq4" 
                        checked={this.state.cq4}
                        control_type={true}/>

              <Donation title={"Secret Bonus donation"}
                        description={"Congratulations! You've been selected to be special true Kirby supporter. Donate to secure your spot!"}
                        msg1={"Make this a monthly reoccuring donation of $2 for the year."}  
                        msg2={"Leave unchecked for no special true Kirby supporter status."}   
                        onChange={this.handleChange} 
                        qId="cq5" 
                        checked={this.state.cq5}
                        control_type={true}/>

            </div> 
           
           : 

            // EXPERIMENT OPTIONS
            <div className={styles.grid, styles.start}>
              <Donation title={"One-time donation"} 
                        msg1={"Donate $20"}
                        msg2={"I want Kirby to lose!"}
                        onChange={this.handleChange} 
                        qId="eq1" 
                        checked={this.state.eq1}
                        control_type={false}/>

              <Donation title={"Monthly donation"} 
                        msg1={"Donate $3 at the end of each month until the election in June."} 
                        msg2={"Betray Kirby. Check this = Kirby loses the election."} 
                        onChange={this.handleChange} qId="eq2" checked={this.state.eq2}
                        control_type={false}/>
              
              <Donation title={"Birthday donation"}
                        description={"Kirby is turning 29 in a few days on April 27th. Wish Kirby a happy birthday with a small donation!"}
                        msg1={"Donate an additional $27 on April 29th"}  
                        msg2={"You hope Kirby never gets to celebrate their 29th birthday 👀"}   
                        onChange={this.handleChange} 
                        qId="eq3" 
                        checked={this.state.eq3}
                        control_type={false}/>

              <Donation title={"Super Kirby Fan donation"}
                        description={"Demonstrate yourself as Kirby's TOP grassroots supporter! This is your last chance to get your status of Super Kirby Fan!"}
                        msg1={"Donate a one-time additional $12"}  
                        msg2={"If you check this box, we will HAVE TO tell Kirby you're a DEFECTOR & side with Meta Knight."}   
                        onChange={this.handleChange} 
                        qId="eq4" 
                        checked={this.state.eq4}
                        control_type={false}/>
              
              <Donation title={"Secret Bonus donation"}
                        description={"Congratulations! You've been selected to be special true Kirby supporter. Donate to secure your spot!"}
                        msg1={"Make this a monthly reoccuring donation of $2 for the year."}  
                        msg2={"Miss out on this rare, LAST chance to join hands with Kirby and win the election."}   
                        onChange={this.handleChange} 
                        qId="eq5" 
                        checked={this.state.eq5}
                        control_type={false}/>
            </div>

            }

            <br/>

              <a href={this.state.queryString} target="_blank">
                <Button disabled={this.state.disabledButton} color='orange' floated='right'>
                  Take Survey!
                </Button>
              </a>
            
              <Button disabled={!this.state.disabledButton} inverted color='green' onClick={this.handleEnd} floated='right'>
                  {this.state.donationText}
              </Button>

          </div>
          
            :

          <Button inverted color='green' onClick={this.handleStart} size='big'>
            Alrighty, let's starty.
          </Button> }
          
        </main>
  
        <footer className={styles.footer}>
          <p>
            This website was scratched together for a UChicago class assignment using Next.js and React. Thank you!
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
