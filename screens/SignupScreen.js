import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TouchableOpacity, ScrollView } from 'react-native';
// import * as firebase from 'firebase'
import { db, auth } from '../firebase'
import { Form, Item, Input, Label, Button } from 'native-base'

export default class SignupScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      name: ""
    }
  }

  static navigationOptions = {
    title: "SignUp",
    header: null,
    //headerShown: false
  };

  signupUser = (name, email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authenticate => {
        return authenticate.user
          .updateProfile({
            displayName: name
          })
          .then(() => {
            this.props.navigation.replace("Home")
          })
      })
      .catch( error => {
        alert(error.message)
      })
  }

  render(){
    return (
      <KeyboardAvoidingView style={styles.container} enabled>
        <ScrollView>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/logo.png')} />
            <Text>FoodReviewSystem</Text>
          </View>
          <Form style={styles.form}>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="name-phone-pad"
                onChangeText={name => this.setState({ name })}
              />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={email => this.setState({ email })}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={password => this.setState({ password })}
              />
            </Item>
            <Button
              style={styles.button}
              full
              rounded
              onPress={() => {
                this.signupUser(
                  this.state.name,
                  this.state.email,
                  this.state.password
                )
              }}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </Button>
          </Form>
          <View style={styles.footer}>
            <Text>OR</Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("SignIn")
              }}
            >
              <Text>already having an account ?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -15,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 90,
    marginBottom: 90
  },
  form: {
    padding: 20,
    width: "100%"
  },
  button: {
    marginTop: 20
  },
  buttonText: {
    color: "#fff"
  },
  footer: {
    alignItems: "center"
  }
});
