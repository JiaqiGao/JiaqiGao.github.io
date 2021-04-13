import Head from 'next/head'
import React, { Component } from 'react'
import styles from '../styles/Home.module.css'
import { Button } from 'semantic-ui-react'

class Main extends Component {
  constructor(props){
    super(props)
    this.state = {start: false}
    this.handleClick = this.handleClick.bind(this);
  }

  
  handleClick(){
    this.setState({start: true})
  }


  runExperiment() {
    const control_status = Math.random() < 0.5;
    console.log(control_status);
    if (control_status) {
      ControlPage();
    } else {
      ExperimentPage();
    }
    
  }


  ControlPage() {
    return (
      <div className={styles.grid, styles.start}>
        <div className={styles.card}>
          <h3>Control</h3>
          <p>Learn about Next.js in an EXPERIMENT interactive course with quizzes!</p>
        </div>
      </div>
    )
  }

  ExperimentPage() {
    return (
      <div className={styles.grid, styles.start}>
          <div className={styles.card}>
            <h3>Experiment</h3>
            <p>Learn about Next.js in an EXPERIMENT interactive course with quizzes!</p>
          </div>

        </div>
    )
  }

  render(){
    const control_status = Math.random() < 0.5;
    console.log(control_status);
    
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
            Pretend this is a real donation portal for ✨Candidate X✨, your preferred, beloved choice running in your local election!
            <br/>You want to support X's campaign with donations, without giving more than what is financially reasonable for you.
            <br/>Review the following options and once you are done with your donation choices, take the survey on the bottom.
            <br/>Thank you for participating! 
          </p>
  
          { this.state.start ? 
            (control_status ? 
              <div className={styles.grid, styles.start}>
                <div className={styles.card}>
                  <h3>Control</h3>
                  <p>Learn about Next.js in an EXPERIMENT interactive course with quizzes!</p>
                </div>
              </div>
            : 
            <div className={styles.grid, styles.start}>
              <div className={styles.card}>
                <h3>Experiment</h3>
                <p>Learn about Next.js in an EXPERIMENT interactive course with quizzes!</p>
              </div>
            </div> ) 
            :  
          <Button inverted color='green' onClick={this.handleClick}>
            Sounds good! Let's start.
          </Button> }
          
        </main>
  
        <footer className={styles.footer}>
          {/* <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
          </a> */}
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
