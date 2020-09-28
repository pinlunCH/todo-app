import React, {Component} from 'react';
import {Text, SafeAreaView} from 'react-native';
import styled from 'styled-components';
import AsyncStorage from '@react-native-community/async-storage';

const Container = styled.View`
  height: 100%;
  padding-right: 20px;
  padding-left: 20px;
  align-items: center;
`;
const Title = styled.Text`
  font-size: 26px;
  text-align: center;
  font-weight: bold;
  margin-top: 30px;
`;
const TextDetail = styled.TextInput`
  width: 100%;
  height: 50px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  margin-top: 20px;
`;
const CatContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin: 30px 0px;
  width: 100%;
`;
const CategoriesBtn = styled.TouchableOpacity`
  padding: 10px 10px;
  border: 1px solid;
`;
const CatBtnTitle = styled.Text``;
export default class Create extends Component {
  taskarr = [];
  state = {
    text: '',
  };
  // checking if the list is already exist, if yes push to task array first
  isListExist = async () => {
    const oldData = await AsyncStorage.getItem('mylist');
    if (this.taskarr.length === 0 && oldData) {
      const dataParse = JSON.parse(oldData);
      this.taskarr.push(dataParse);
      this.taskarr.flat(Infinity);
    }
    this.storeData();
  };
  // store the new task in to task array and AsyncStorage
  storeData = async () => {
    this.taskarr.push({data: this.state.text, completed: false});
    const transform = JSON.stringify(this.taskarr);
    await AsyncStorage.setItem('mylist', transform);
    this.clearText();
  };
  // after add btn, clear the input text
  clearText = () => {
    this.setState({text: ''});
  };
  // before go back to list screen, re-render the component first
  goBack = () => {
    let refreshFunction = this.props.navigation.state.params.refreshFunction;
    refreshFunction();
    this.props.navigation.navigate('listScreen');
  };
  render() {
    return (
      <SafeAreaView>
        <Container>
          <Title>Add New Task</Title>
          <TextDetail
            placeholder="enter task"
            value={this.state.text}
            onChangeText={(text) => {
              this.setState({text});
            }}
          />
          <CatContainer>
            <CategoriesBtn onPress={() => this.isListExist()}>
              <CatBtnTitle>Add To To-do List</CatBtnTitle>
            </CategoriesBtn>
            <CategoriesBtn onPress={() => this.goBack()}>
              <CatBtnTitle>Go Back</CatBtnTitle>
            </CategoriesBtn>
          </CatContainer>
        </Container>
      </SafeAreaView>
    );
  }
}
