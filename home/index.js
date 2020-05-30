import React, { useState, useEffect } from 'react';

//expo install expo-image-picker
import * as ImagePicker from 'expo-image-picker';

import {
  Text, Button, Image
} from 'react-native';

import firebase from '../config/firebase';

import { WrapperView, CorrecaoView, Header, Content, Footer, Avatar } from './styles';


export default function Home() {

  const [imagem, setImagem] = useState(null);

  uploadImagem = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = new Date().getTime();

    var ref = firebase.storage().ref().child('upload/' + filename);

    ref.put(blob).then(function (snapshot) {

      snapshot.ref.getDownloadURL().then(function (downloadURL) {
        setImagem(downloadURL)
      })

    })
  }

  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().languageCode = 'pt';
  provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

  firebase.auth().signInWithRedirect(provider);

  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // ...
    }
    // The signed-in user info.
    var user = result.user;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

  escolherImagem = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        // setImagem(result.uri)
        uploadImagem(result.uri);

      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };


  return (
    <CorrecaoView>
      <WrapperView>
        <Header>
          <Text>Sou texto Um</Text>
        </Header>
        <Content>

          {imagem &&
            <Avatar source={{ uri: imagem }} style={{ width: 200, height: 200 }} />
          }


          <Button title="Escolher Imagem" onPress={() => { escolherImagem() }} />
        </Content>
        <Footer>
          <Text>Sou texto Tres</Text>
        </Footer>
      </WrapperView>
    </CorrecaoView>
  )

}
