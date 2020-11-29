import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, Image} from 'react-native';
import {
  Fab,
  Icon,
  List,
  ListItem,
  Left,
  Right,
  Body,
  CheckBox,
  Container,
  H1,
  Button,
  Title,
  Text,
  Spinner,
} from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';

const Home = ({navigation, route}) => {
  const [seasons, setSeasons] = useState([]);

  const isFocused = useIsFocused();

  const getSeasonList = async () => {
    const storedValue = await AsyncStorage.getItem('@session_list');
    if (!storedValue) {
      setSeasons([]);
    }
    const list = JSON.parse(storedValue);

    setSeasons(list);
  };

  const deleteSeason = async (id) => {
    const newArr = seasons.filter((season) => season.id !== id);
    //console.log(newArr);
    await AsyncStorage.setItem('@session_list', JSON.stringify(newArr));
    setSeasons(newArr);
  };

  const markComplete = async (id) => {
    const newArr = seasons.map((season) => {
      if (season.id === id) {
        season.isWatched = !season.isWatched;
      }
      return season;
    });
    newArr;
    await AsyncStorage.setItem('@season_list', JSON.stringify(newArr));
    setSeasons(newArr);
  };

  useEffect(() => {
    getSeasonList();
  }, [isFocused]);

  return (
    <ScrollView
      vertical={true}
      contentContainerStyle={{flexGrow: 1, backgroundColor: '#1b262c'}}>
      {seasons.length == 0 ? (
        <Container style={styles.container}>
          <H1 style={styles.heading}>Watchlist is empty.Please add to watch</H1>
        </Container>
      ) : (
        <>
          <H1 style={styles.heading}>Next series to watch</H1>
          {seasons.map((season) => (
            <List key={season.id}>
              <ListItem style={styles.listItem} noBorder>
                <Left>
                  <Button
                    style={styles.actionButton}
                    danger
                    onPress={() => deleteSeason(season.id)}>
                    <Icon name="trash" />
                  </Button>
                  <Button style={styles.actionButton}>
                    <Icon
                      name="edit"
                      type="Feather"
                      onPress={() => navigation.navigate('Edit', {season})}
                    />
                  </Button>
                </Left>
                <Body>
                  <Title style={styles.seasonName}>{season.name}</Title>
                  <Text note>{season.noOfSessions}</Text>
                </Body>
                <Right>
                  <CheckBox
                    checked={season.isWatched}
                    onPress={() => markComplete(season.id)}
                  />
                </Right>
              </ListItem>
            </List>
          ))}
        </>
      )}

      <Fab
        style={{backgroundColor: '#5067FF'}}
        position="bottomRight"
        onPress={() => navigation.navigate('Add')}>
        <Icon name="add" />
      </Fab>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginVertical: 15,
    marginHorizontal: 5,
  },
  actionButton: {
    marginLeft: 5,
  },
  seasonName: {
    color: '#fdcb9e',
    textAlign: 'justify',
  },
  listItem: {
    marginLeft: 0,
    marginBottom: 20,
  },
});
