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
const Input = styled.TextInput`
  width: 95%;
  padding: 5px 10px;
  border: 1px solid;
  margin-top: 20px;
  font-size: 20px;
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
export default class Update extends Component {
  constructor(props) {
    super(props);
    // console.log(
    //   'in undate item index',
    //   this.props.navigation.getParam('itemIndex'),
    // );
    this.pullData();
  }
  itemArr = [];
  targetIndex = this.props.navigation.getParam('itemIndex');
  state = {
    text: '',
  };
  // getting value of the array i'm targetting
  pullData = async () => {
    const listItems = await AsyncStorage.getItem('mylist');
    const dataParse = JSON.parse(listItems);
    const flaten = dataParse.flat(Infinity);
    this.itemArr.push(flaten);
    const taskName = this.itemArr[0][this.targetIndex].data;
    this.setState({text: taskName});
  };
  // save the changes back to AsyncStorage, before direct back to list screen
  // re-render the component first
  save = async () => {
    const transform = JSON.stringify(this.itemArr);
    await AsyncStorage.setItem('mylist', transform);
    let refreshFunction = this.props.navigation.state.params.refreshFunction;
    refreshFunction();
    this.props.navigation.navigate('listScreen');
  };
  // make completed = true and save()
  markComplete = () => {
    console.log(this.itemArr);
    let targetItem = this.itemArr[0][this.targetIndex];
    targetItem.completed = true;
    this.save();
  };
  // updating the text and save()
  update = () => {
    let taskDetail = this.itemArr[0][this.targetIndex];
    taskDetail.data = this.state.text;
    this.save();
  };
  render() {
    return (
      <SafeAreaView>
        <Container>
          <Title>Edit task</Title>
          <Input
            value={this.state.text}
            onChangeText={(text) => {
              this.setState({text});
            }}
          />
          <CatContainer>
            <CategoriesBtn onPress={() => this.update()}>
              <CatBtnTitle>Update</CatBtnTitle>
            </CategoriesBtn>
            <CategoriesBtn onPress={() => this.markComplete()}>
              <CatBtnTitle>Mark As Complete</CatBtnTitle>
            </CategoriesBtn>
            <CategoriesBtn
              onPress={() => this.props.navigation.navigate('listScreen')}>
              <CatBtnTitle>Go Back</CatBtnTitle>
            </CategoriesBtn>
          </CatContainer>
        </Container>
      </SafeAreaView>
    );
  }
}
