import React, {useEffect, useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {Form, Item, Input, Container, H1, Button} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';

const Edit = ({navigation, route}) => {
  const [sessionName, setSessionName] = useState('');
  const [noOfSessions, setNoOfSessions] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    const {season} = route.params;
    const {id, name, noOfSessions} = season;
    setId(id);
    setSessionName(name);
    setNoOfSessions(noOfSessions);
  }, []);

  const update = async () => {
    try {
      if (!sessionName || !noOfSessions) {
        return Snackbar.show({
          text: 'Values cannot be empty',
          backgroundColor: 'red',
        });
      }

      const seasonToUpdate = {
        id: id,
        name: sessionName,
        noOfSessions,
        isWatched: false,
      };

      const storedValue = await AsyncStorage.getItem('@session_list');
      const list = JSON.parse(storedValue);
      const newArr = list.map((season) => {
        if (season.id === seasonToUpdate.id) {
          season.name = sessionName;
          season.noOfSessions = noOfSessions;
        }
        return season;
      });

      await AsyncStorage.setItem('@session_list', JSON.stringify(newArr));
      navigation.navigate('Home');
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <Container>
      <Form>
        <Item rounded style={styles.formItem}>
          <Input
            placeholder="session name"
            style={{color: '#FFF'}}
            value={sessionName}
            onChangeText={(text) => setSessionName(text)}
          />
        </Item>
        <Item rounded style={styles.formItem}>
          <Input
            placeholder="no of sessions"
            style={{color: '#FFF'}}
            value={noOfSessions}
            onChangeText={(text) => setNoOfSessions(text)}
          />
        </Item>
        <Button rounded block onPress={update}>
          <Text style={{color: '#FFF'}}>Update</Text>
        </Button>
      </Form>
    </Container>
  );
};

export default Edit;

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
