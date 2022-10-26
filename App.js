import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, ScrollView, Text } from 'react-native';
import { db } from './config/firebase';
import { collection, addDoc } from "firebase/firestore";

export default function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleAddUser (){

    if (name != '' && email != ''){
      try {
        const docRef = await addDoc(collection(db, "Users"), {
          Name: name,
          Email: email,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    else{
      alert('Complete all fields!');
    }
  }

  return (
      <ScrollView  style={styles.container}>
        <View style={styles.input}>
          <TextInput placeholder='User Name:' onChangeText={ (value) => setName(value)}/>
        </View>
        <View style={styles.input}>
          <TextInput placeholder='User email:' onChangeText={ (value) => setEmail(value)}/>
        </View>
        <TouchableOpacity onPress={ () => {handleAddUser()}}>
          <Text style={styles.button}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    marginTop: '50%',
  },

  input: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },

  button:{
    fontWeight: 'bold', 
    color: 'black', 
    borderColor: 'black', 
    borderStyle: 'solid',
    textAlign: 'center',
    borderWidth: 2,
    padding: 2,
    borderRadius: 4,
    fontSize: 20
  }
});
