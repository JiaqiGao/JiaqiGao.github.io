import Head from 'next/head'
import React, { useState, useCallback, Component } from "react";
import styles from '../styles/Home.module.css'
import { Button, Divider } from 'semantic-ui-react'
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images"; 

const ceramics = [
  {
      src: "/images/pottery/IMG_2112.jpg",
      width: 3,
      height: 4
  },
  {
      src: "/images/pottery/IMG_2115.jpg",
      width: 3,
      height: 4
  },
  {
      src: "/images/pottery/IMG_2117.jpg",
      width: 3,
      height: 4
  },
  {
      src: "/images/pottery/IMG_2119.jpg",
      width: 3,
      height: 4
  },
  {
      src: "/images/pottery/IMG_2122.jpg",
      width: 5,
      height: 7
  },
  {
      src: "/images/pottery/IMG_2123.jpg",
      width: 3,
      height: 4
  },
  {
      src: "/images/pottery/IMG_2125.jpg",
      width: 3,
      height: 4
  },
  {
      src: "/images/pottery/IMG_2126.jpg",
      width: 5,
      height: 6
  },
  {
      src: "/images/pottery/IMG_2128.jpg",
      width: 5,
      height: 6
  },
  {
      src: "/images/pottery/IMG_2130.jpg",
      width: 5,
      height: 6
  },
  {
      src: "/images/pottery/IMG_2132.jpg",
      width: 5,
      height: 6
  },
  {
      src: "/images/pottery/IMG_2136.jpg",
      width: 5,
      height: 6
  },
  {
      src: "/images/pottery/IMG_2137.jpg",
      width: 5,
      height: 6
  }
]

const italy = [
{
  src: "/images/IMG_0467.JPG",
  width: Math.floor(Math.random() * 3)+4,
  height: 3
},
{
  src: "/images/IMG_0475.JPG",
  width: Math.floor(Math.random() * 3)+4,
  height: 3
},
{
  src: "/images/IMG_0486.JPG",
  width: 4,
  height: 3
},
{
  src: "/images/IMG_0491.JPG",
  width: Math.floor(Math.random() * 3)+4,
  height: 3
},
{
  src: "/images/IMG_0493.JPG",
  width: Math.floor(Math.random() * 3)+4,
  height: 3
},
{
  src: "/images/IMG_0492.JPG",
  width: Math.floor(Math.random() * 3)+4,
  height: 3
},
{
  src: "/images/IMG_0482.JPG",
  width: Math.floor(Math.random() * 3)+4,
  height: 3
},
]

const photos = {ceramics, italy}


function randomizeGallery(images){
  var randomize = Math.floor(Math.random() * images.length-1)+1;
  return(images.slice(randomize, -1).concat(images.slice(0, randomize)))
}

function GalleryApp(gallery) {
  const images = gallery["gallery"];
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <div style={{width: '100vw'}}>
      <Gallery photos={images} onClick={openLightbox}  />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={images.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}

class Bookmark extends Component {
  constructor(props){
    super(props);
  }

  render(){
      return ( 
        <div className={styles.bookmark}>
          { this.props.link ? 
          <Button basic color={this.props.color} size='big'>
          <a target="_blank" rel="noopener noreferrer" href={this.props.link}>{this.props.text}</a>
          </Button>
           :
          <Button inverted color={this.props.color} size='big' onClick={this.props.clicker}>
            {this.props.text}
        </Button>
        }
          
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
      ceramics: true,
      italy: false,
      startTime: (new Date(Date.now())).toDateString(),
      disabledButton: true,
    }

    this.handleItaly = this.handleItaly.bind(this);
    this.handleCeramics = this.handleCeramics.bind(this);

  }

  handleCeramics(){
    if (this.state.ceramics){
      this.setState({
        ceramics: false,
      })
    }else{
      this.setState({
        ceramics: true,
        italy: false
      })
    }  
  }
  
  handleItaly(){
    if (this.state.italy){
      this.setState({
        italy: false,
      })
    }else{
      this.setState({
        italy: true,
        ceramics: false
      })
    }  
  }


  render(){
    

    return (
      <div className={styles.container}>
        <Head>
          <title>Jiaqi Gao</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className={styles.main}>
          <div>
          <h1 className={styles.title}>
            Jiaqi Gao
          </h1>
          </div>
          

          <div className={styles.date}>
           Date: {this.state.startTime}
          </div>
    
          <p className={styles.description}>
            </p>

            <div className={styles.description}>
            <Bookmark text="ceramics" color="green" clicker={this.handleCeramics}/>
            <Bookmark text="that one time i went to italy" color="blue" clicker={this.handleItaly}/>
            <Bookmark text="instagram" color="yellow" link="https://www.instagram.com/jqig_/"/>
            <Bookmark text="linkedin" color="yellow" link="https://www.linkedin.com/in/JiaqiGao1"/>
            </div>
       <Divider/>

{ this.state.italy ? <GalleryApp gallery={photos["italy"]} /> : <br />}
{ this.state.ceramics ? <GalleryApp gallery={photos["ceramics"]} /> : <br />}

          
        </main>
  
        <footer className={styles.footer}>
          <p>
            Want to reach me? Send me a message over on <a href="" >Instagram</a> or <a href="">LinkedIn</a>. 
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
