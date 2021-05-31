import * as React from 'react';
import {Text,View,StyleSheet,TextInput,TouchableOpacity,Alert,KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class SignupLoginScreen extends React.Component{
    constructor(){
        super();
        this.state={
          emailId : '',
          password: ''
        }
      }
    
      userLogin = (emailId, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId, password)
        .then(()=>{
          return Alert.alert("Successfully Loged In")
        })
        .catch((error)=> {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage)
        })
      }
    
      userSignUp = (emailId, password) =>{
        firebase.auth().createUserWithEmailAndPassword(emailId, password)
        .then((response)=>{
          return Alert.alert("User Added Successfully")
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage)
        });
      }
    
    
      render(){
        return(
          <View style={styles.container}>
              <KeyboardAvoidingView>
              <View>
              <Text style={styles.title}>Barter App</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TextInput
              style={styles.loginBox}
              placeholder="example@barter.com"
              keyboardType ='email-address'
              onChangeText={(text)=>{
                this.setState({
                  emailId: text
                })
              }}
            />
    
            <TextInput
              style={styles.loginBox}
              secureTextEntry = {true}
              placeholder="password"
              onChangeText={(text)=>{
                this.setState({
                  password: text
                })
              }}
            />
              <TouchableOpacity
                style={[styles.button,{ marginTop:20, marginBottom:20}]}
                onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
                >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.userSignUp(this.state.emailId, this.state.password)}}
                >
                <Text style={styles.buttonText}>SignUp</Text>
              </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
          </View>
        )
      }
    }
    
    
    const styles = StyleSheet.create({
      container:{
        flex:1,
        backgroundColor:'#b4edeb'
      },
      title :{
        fontSize:40,
        fontWeight:'500',
        margin:50,
        color : '#8b0eeb'
      },
      loginBox:{
        width: 300,
        height: 40,
        borderBottomWidth: 2,
        borderColor : '#000000',
        fontSize: 20,
        margin:15,
        paddingLeft:10
      },
      button:{
        width:130,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"#1b0f4d",
      },
      buttonText:{
        fontWeight:'300',
        fontSize:20,
        color:'white'
      },
      buttonContainer:{
        flex:1,
        alignItems:'center',
        margin:60,
      }
    })
    