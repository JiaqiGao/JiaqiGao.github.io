import Head from 'next/head'
import Link from 'next/link'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  List,
  Menu,
  Segment
} from "semantic-ui-react";
import React, { Component } from 'react'
import styles from '../styles/Home.module.css'

const navItems = [
  {route: '/', name: 'home'},
  {route: '/about', name: 'about'},
  {route: '/blog', name: 'blog'},
]


class Donation extends Component {
  constructor(props){
    super(props);
  }

  render(){
      return (
        <div className={styles.card}>
          <h3>{this.props.title}</h3>
          <p>{this.props.description}</p>
          <br/>
          <br/><br/>
          <label>{this.props.msg2}</label>
        </div>
      )
  }
}

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }


  render(){
    return (
      <div className={styles.container}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <title>Jiaqi Gao</title>
          {/* <link rel="icon" href="/favicon.ico" /> */}
        </Head>
  
        <main className={styles.main}>
        {/* <Menu borderless inverted pointing color="blue">
          <Container>
            <Menu.Item header active>
              Home
            </Menu.Item>
            <Menu.Item>New feature</Menu.Item>
            <Menu.Item>Press</Menu.Item>
            <Menu.Item>New hires</Menu.Item>
            <Menu.Item>About</Menu.Item>
          </Container>
        </Menu> */}
        <Grid container stackable>
          <Grid.Row>
            <Segment basic>
              <Header as="h1" size="huge">
                <Header.Content>Jiaqi Gao</Header.Content>
                <Header.Subheader>
                  Online portfolio
                </Header.Subheader>
              </Header>
            </Segment>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={11}>
              <Header size="large" as="h2">
                <Header.Content>Sample blog post</Header.Content>
                <Header.Subheader>
                  March 6, 2017 by <a href="#root">Jack</a>
                </Header.Subheader>
              </Header>
              <Divider hidden />
              <p>
                This blog post shows a few different types of content that's
                supported and styled with Semantic-UI. Basic typesetting, list,
                and code are all supported.
              </p>
              <Divider />
              <p>
                Cum sociis natoque penatibus et magnis{" "}
                <a href="#root">dis parturient montes</a>, nascetur ridiculus
                mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam
                venenatis vestibulum. Sed posuere consectetur est at lobortis.
                Cras mattis consectetur purus sit amet fermentum.
              </p>
              <blockquote>
                Curabitur blandit tempus porttitor. Nullam quis risus eget urna
                mollis ornare vel eu leo. Nullam id dolor id nibh ultricies
                vehicula ut id elit.
              </blockquote>
              <p>
                Etiam porta sem malesuada magna mollis euismod. Cras mattis
                consectetur purus sit amet fermentum. Aenean lacinia bibendum
                nulla sed consectetur.
              </p>
              <Header as="h3" size="large">
                Heading
              </Header>
              <p>
                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                auctor. Duis mollis, est non commodo luctus, nisi erat porttitor
                ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta
                ac consectetur ac, vestibulum at eros.
              </p>
              <Header as="h3" size="medium">
                Sub-heading
              </Header>
              <p>
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus.
              </p>
              <Segment secondary>
                <code>Example code block</code>
              </Segment>
              <p>
                Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem
                malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus
                commodo, tortor mauris condimentum nibh, ut fermentum massa.
              </p>
              <Header size="medium">Sub-heading</Header>
              <p>
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Aenean lacinia bibendum nulla sed
                consectetur. Etiam porta sem malesuada magna mollis euismod.
                Fusce dapibus, tellus ac cursus commodo, tortor mauris
                condimentum nibh, ut fermentum massa justo sit amet risus.
              </p>
              <ul>
                <li>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur et.
                </li>
                <li>Donec id elit non mi porta gravida at eget metus.</li>
                <li>Nulla vitae elit libero, a pharetra augue.</li>
              </ul>
              <p>
                Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae
                elit libero, a pharetra augue.
              </p>
              <ol>
                <li>Vestibulum id ligula porta felis euismod semper.</li>
                <li>
                  Cum sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus.
                </li>
                <li>
                  Maecenas sed diam eget risus varius blandit sit amet non
                  magna.
                </li>
              </ol>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Sed posuere
                consectetur est at lobortis.
              </p>
              <Divider hidden />
              <Header size="large" as="h2">
                <Header.Content>Another blog post</Header.Content>
                <Header.Subheader>
                  April 1, 2027 by <a href="#root">Mac</a>
                </Header.Subheader>
              </Header>
              <Divider hidden />
              <p>
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare
                sem lacinia quam venenatis vestibulum. Sed posuere consectetur
                est at lobortis. Cras mattis consectetur purus sit amet
                fermentum.
              </p>
              <blockquote>
                Curabitur blandit tempus porttitor. Nullam quis risus eget urna
                mollis ornare vel eu leo. Nullam id dolor id nibh ultricies
                vehicula ut id elit.
              </blockquote>
              <p>
                Etiam porta sem malesuada magna mollis euismod. Cras mattis
                consectetur purus sit amet fermentum. Aenean lacinia bibendum
                nulla sed consectetur.
              </p>
              <p>
                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                auctor. Duis mollis, est non commodo luctus, nisi erat porttitor
                ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta
                ac consectetur ac, vestibulum at eros.
              </p>
              <Divider hidden />
              <Header size="large" as="h2">
                <Header.Content>New feature</Header.Content>
                <Header.Subheader>
                  Autumn 13, 2019 by <a href="#root">Semantic</a>
                </Header.Subheader>
              </Header>
              <Divider hidden />
              <p>
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare
                sem lacinia quam venenatis vestibulum. Sed posuere consectetur
                est at lobortis. Cras mattis consectetur purus sit amet
                fermentum.
              </p>
              <ul>
                <li>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur et.
                </li>
                <li>Donec id elit non mi porta gravida at eget metus.</li>
                <li>Nulla vitae elit libero, a pharetra augue.</li>
              </ul>
              <p>
                Etiam porta sem malesuada magna mollis euismod. Cras mattis
                consectetur purus sit amet fermentum. Aenean lacinia bibendum
                nulla sed consectetur.
              </p>
              <p>
                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                auctor. Duis mollis, est non commodo luctus, nisi erat porttitor
                ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta
                ac consectetur ac, vestibulum at eros.
              </p>
              <Divider hidden />
              
            </Grid.Column>
            <Grid.Column width={4} floated="right">
              <Segment secondary>
                <Header as="h4">About</Header>
                <p>
                  Etiam porta <i>sem malesuada magna mollis euismod</i>. Cras
                  mattis consectetur purus sit amet fermentum. Aenean lacinia
                  bibendum nulla sed consectetur.
                </p>
              </Segment>
            
              <Header as="h4">Elsewhere</Header>
              <List>
              {navItems.map(item => <List.Item><Link href={item.route}>{item.name}</Link></List.Item >)} 
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>


          
          {/* <h1 className={styles.title}>
            Jiaqi Gao
          </h1>

          <ul>
            {navItems.map(item => <List.Item><Link href={item.route}>{item.name}</Link></List.Item >)} 
          </ul> */}

  
        
          {/* { this.state.start ?  : } */}
          
         
          
        </main>
  
        {/* <footer className={styles.footer}>
          <p>
            This <a href="https://github.com/JiaqiGao/JiaqiGao.github.io">website</a> was put together using Next.js and React. 
          </p>
        </footer> */}
      </div>
    )
  }
  
}


export default function Home() {
  return (
   <Main />
  )
}
