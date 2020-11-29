import React from 'react';
import {Text, StyleSheet} from 'react-native';

import {Form, Item, Input, Container, H1, Button} from 'native-base';

const Add = () => {
  return (
    <Container style={styles.container}>
      <H1 style={styles.heading}>Add to watch list</H1>
      <Form>
        <Item rounded style={styles.formItem}>
          <Input placeholder="season name" style={{color: '#FFF'}} />
        </Item>
        <Item rounded style={styles.formItem}>
          <Input placeholder="no of sessions" style={{color: '#FFF'}} />
        </Item>
        <Button rounded block>
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
