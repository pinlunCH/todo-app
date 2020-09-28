import React, {Component} from 'react';
import {
  Text,
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';
import AsyncStorage from '@react-native-community/async-storage';

const Container = styled.View`
  height: 100%;
  align-items: center;
  padding: 0px 20px;
  margin-top: 60px;
`;
const Title = styled.Text`
  font-size: 26px;
  text-align: center;
  font-weight: bold;
  margin-top: 30px;
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
const New = styled.TouchableOpacity`
  padding: 10px 10px;
  border: 1px solid;
  background-color: #000;
  width: 85%;
`;
const CatBtnTitle = styled.Text``;
const NewTitle = styled.Text`
  color: #fff;
  text-align: center;
`;
const TaskItem = styled.Text`
  font-size: 20px;
  margin-bottom: 20px;
`;
const TaskContainer = styled.View`
  width: 100%;
  padding: 0px 30px;
  margin-top: 40px;
`;
const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: #000;
  margin-bottom: 20px;
`;
const ActionBTN = styled.TouchableOpacity`
  border: 1px solid;
  width: 30%;
  height: 30px;
  align-items: center;
  padding: 4px 0px;
  margin-right: 5px;
`;
const ActionCon = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;
const Pack = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
const ActionTitle = styled.Text``;
export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      filter: 'all',
    };
    console.log(this.state.items);
    this.restoreData();
  }
  // puting what i had in the list back to this.state.items
  restoreData = async () => {
    const exitingData = await AsyncStorage.getItem('mylist');
    if (exitingData) {
      const exitingParse = JSON.parse(exitingData);
      const flattenData = exitingParse.flat(Infinity);
      this.setState({
        items: flattenData,
      });
    }
    console.log('in the state', this.state.items);
  };
  // passing task i clicked on to updateScreen, give access to update screen of refresh fn
  view = (index) => {
    this.props.navigation.navigate('updateScreen', {
      itemIndex: index,
      refreshFunction: this.refresh,
    });
  };
  // delete the task
  remove = (index) => {
    this.state.items.splice(index, 1);
    this.save();
  };
  // save the changes i made to the AsyncStorage
  save = async () => {
    const transform = JSON.stringify(this.state.items);
    await AsyncStorage.setItem('mylist', transform);
    console.log('in save list', transform);
    this.restoreData();
  };
  // before navigate back this screen re-render the component first
  refresh = () => {
    this.restoreData();
  };
  // give access to create screen of refresh fn
  create = () => {
    this.props.navigation.navigate('createScreen', {
      refreshFunction: this.refresh,
    });
  };
  cate = () => {
    let filter = this.state.filter;
    if (filter === 'all') {
      console.log('inside all');
      return this.state.items;
    }
    if (filter === 'pending') {
      let results = this.state.items.filter((item) => item.completed === false);
      console.log('pending', results);
      return results;
    }
    if (filter === 'completed') {
      let results = this.state.items.filter((item) => item.completed === true);
      return results;
    }
  };
  all = () => {
    this.setState({filter: 'all'});
  };
  pending = () => {
    this.setState({filter: 'pending'});
  };
  completed = () => {
    this.setState({filter: 'completed'});
  };
  render() {
    return (
      <Container>
        <Title>To-do List</Title>
        <CatContainer>
          <CategoriesBtn onPress={() => this.all()}>
            <CatBtnTitle>View All</CatBtnTitle>
          </CategoriesBtn>
          <CategoriesBtn onPress={() => this.pending()}>
            <CatBtnTitle>Pending</CatBtnTitle>
          </CategoriesBtn>
          <CategoriesBtn onPress={() => this.completed()}>
            <CatBtnTitle>Completed</CatBtnTitle>
          </CategoriesBtn>
        </CatContainer>
        <New onPress={() => this.create()}>
          <NewTitle>Add New Task</NewTitle>
        </New>
        <TaskContainer>
          <FlatList
            data={this.cate()}
            renderItem={({item, index}) => (
              <>
                <Pack>
                  <TaskItem key={index}>{item.data}</TaskItem>
                  <ActionCon>
                    <ActionBTN onPress={() => this.view(index)}>
                      <ActionTitle>View</ActionTitle>
                    </ActionBTN>
                    <ActionBTN onPress={() => this.remove(index)}>
                      <ActionTitle>Delete</ActionTitle>
                    </ActionBTN>
                  </ActionCon>
                </Pack>
                <Divider />
              </>
            )}
          />
        </TaskContainer>
      </Container>
    );
  }
}
