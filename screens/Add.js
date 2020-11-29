import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';

import {Form, Item, Input, Container, H1, Button} from 'native-base';
import Snackbar from 'react-native-snackbar';
import shortid from 'shortid';
import AsyncStorage from '@react-native-community/async-storage';

const Add = ({navigation}) => {
  const [sessionName, setSessionName] = useState('');
  const [noOfSessions, setNoOfSessions] = useState('');

  const addToList = async () => {
    try {
      if (sessionName === '' || noOfSessions === '') {
        return Snackbar.show({
          text: 'Values cannot be empty',
          backgroundColor: 'red',
        });
      }

      const sessionObject = {
        id: shortid.generate(),
        name: sessionName,
        noOfSessions,
        isWatched: false,
      };

      const storedValue = await AsyncStorage.getItem('@session_list');
      const prevList = await JSON.parse(storedValue);
      if (!prevList) {
        const newList = [sessionObject];
        await AsyncStorage.setItem('@session_list', JSON.stringify(newList));
      } else {
        prevList.push(sessionObject);
        await AsyncStorage.setItem('@session_list', JSON.stringify(prevList));
      }
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
      return Snackbar.show({
        text: 'Local Storage data is not fetched',
        backgroundColor: 'red',
      });
    }
  };
  return (
    <Container style={styles.container}>
      <H1 style={styles.heading}>Add to watch list</H1>
      <Form>
        <Item rounded style={styles.formItem}>
          <Input
            placeholder="season name"
            style={{color: '#FFF'}}
            name={sessionName}
            onChangeText={(text) => setSessionName(text)}
          />
        </Item>
        <Item rounded style={styles.formItem}>
          <Input
            placeholder="no of sessions"
            style={{color: '#FFF'}}
            name={noOfSessions}
            onChangeText={(text) => setNoOfSessions(text)}
          />
        </Item>
        <Button rounded block onPress={addToList}>
          <Text style={{color: '#FFF'}}>Add</Text>
        </Button>
      </Form>
    </Container>
  );
};

export default Add;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginHorizontal: 5,
    marginTop: 50,
    marginBottom: 20,
  },
  formItem: {
    marginBottom: 20,
  },
});
