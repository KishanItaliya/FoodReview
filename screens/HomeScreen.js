import React from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Input, Card, Button, Icon } from 'native-base';
import { db, auth } from '../firebase'
import firebase from 'firebase'
import { FlatList } from 'react-native-gesture-handler';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      user: {},
      message: "",
      messageList: []
    }
  }

  // sendMessage = message => {
  //   db
  //     .collection('users')
  //     .doc(this.state.name)
  //     .collection('messages')
  //     .set({
  //       message: message
  //     })
  //     this.setState({
  //       message: ""     
  //     })
  // }

  sendMessage = message => {
    // var messageListRef = firebase.database().ref("message_list");
    // //var newMessageRef = messageListRef.push();
    // messageListRef.push({
    //   text: message,
    //   time: Date.now()
    // })
    firebase.firestore()
    .collection('message_list')
    .add({
      text: message,
      time: Date.now(),
      email: this.state.email
    })
    .then(() => {
      console.log('User added!')
    })
    .catch(error => { 
      console.log('ERROR', error);
    })

    this.setState({
      message: ""
    })
  }

  updateList = messageList => {
    this.setState({ messageList: messageList })
  }

  static navigationOptions = {
    title: "Home",
    header: null,
    //headerShown: false
  };

  componentDidMount() {
    auth.onAuthStateChanged(authenticate => {
      if(authenticate){
        this.setState({
          email: authenticate.email,
          name: authenticate.displayName
        })
      }
      else{
        this.props.navigation.replace("SignIn")
      }
    })


    
    // var self = this;

    // var messageListRef = firebase.database().ref("message_list")

    // messageListRef.on("value", dataSnapshot => {
    //   if(dataSnapshot.val()){
    //     let messageList = Object.values(dataSnapshot.val())
    //     self.updateList(messageList.reverse())
    //   }
    // })
  }

  

  signOutUser = () => {
    auth
      .signOut()
      .then(() => { console.log("signout") })
      .catch( error => alert(error.message))
  }

  render(){
    return (
      <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
        <ScrollView>
          <View style={styles.userDetails}>
            <Text>Hey {this.state.name}</Text>
            <Text>You are signed in as: {this.state.email}</Text>
          </View>

          {/* <View style={styles.header}>
            <Text style={styles.headerText}>Message Board</Text>
          </View>  */}

          {/* <View style={styles.listContainer}>
            <FlatList
              data={this.state.messageList}
              inverted
              keyExtractor={(item, index) => item.time.toString()}
              renderItem = {({item}) => (
                <Card
                  style={styles.listItem}
                >
                  <Text style={styles.messageText}>{item.text}</Text>
                  <Text style={styles.timeText}>{ new Date(item.time).toLocaleDateString}</Text>
                </Card>
              )}
            />
          </View> */}

          <View style={styles.inputContainer}>
            <Input
              onChangeText={text => {
                this.setState({message: text})
              }}
              value={this.state.message}
              placeholder="Enter Message"
            />
            <Button
              onPress={() => {
                this.sendMessage(this.state.message)
              }}
              danger
              rounded
              icon
            >
              <Icon name="arrow-forward" />
            </Button>
          </View>

          <Button
            style={styles.button}
            full
            rounded
            success
            onPress={() => {
              this.signOutUser()
            }}
          >
            <Text style={styles.buttonText}>SignOut</Text>
          </Button>
        </ScrollView> 
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    margin: 2,
    marginTop: 25
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 100,
    marginBottom: 100
  },
  userDetails: {
    alignItems: "center",
  },

  button: {
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  buttonText: {
    color: "#fff"
  },

  //************************* */
  header: {
    backgroundColor: "#2B2B52",
    alignItems: "center",
    height: 40,
    justifyContent: "center"
  },
  headerText: {
    paddingHorizontal: 10,
    color: "#FFF",
    fontSize: 20
  },
  listContainer: {
    flex: 1,
    padding: 5
  },
  listItem: {
    padding: 10
  },
  messageText: {
    fontSize: 20
  },
  timeText: {
    fontSize: 10
  },
  inputContainer: {
    flexDirection: "row",
    padding: 5,
    borderWidth: 5,
    borderRadius: 15,
    borderColor: "#2B2B52",
    color: "#fff"
  }
});

