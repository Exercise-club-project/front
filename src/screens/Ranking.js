import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, Text, View } from "react-native";
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;
const Ranking = () =>{
    return (
    <View style={style.container}>

      <View style={style.header}>
        <View style={style.headercontainer}>
          <Text style={style.headertext}>동아리</Text>
        </View>
        <View style={style.headercontainer}>
          <Text style={style.headertext}>개인(전체)</Text>
        </View>
        <View style={style.headercontainer}>
          <Text style={style.headertext}>개인(동아리내)</Text>
        </View>
      </View>

      <View style={style.tabletop}>
        <View style={{flex:1,alignItems: 'center', justifyContent: 'center',}}>
          <Text style={style.tabletoptext}>순위</Text>
        </View>
        <View style={{flex:2, alignItems: 'center', justifyContent: 'center',}}>
          <Text style={style.tabletoptext}>동아리</Text>
        </View>
        <View style={{flex:3, alignItems: 'center', justifyContent: 'center',}}>
          <Text style={style.tabletoptext}>학교</Text>
        </View>
        <View style={{flex:2, alignItems: 'center', justifyContent: 'center',}}>
          <Text style={style.tabletoptext}>점수</Text>
        </View>
      </View>

      <ScrollView style={{backgroundColor: 'white',}}>
        <View style={style.tablerow}>
          <View style={style.tablenum}>
            <Text>1</Text>
          </View>
          <View style={style.tablename}>
            <Text>FLY</Text>
          </View>
          <View style={style.tableschool}>
            <Text>단국대학교 죽전캠퍼스</Text>
          </View>
          <View style={style.tablescore}>
            <Text>1000</Text>
          </View>
        </View>
        <View style={style.tablerow}>
          <View style={style.tablenum}>
            <Text>1</Text>
          </View>
          <View style={style.tablename}>
            <Text>FLY</Text>
          </View>
          <View style={style.tableschool}>
            <Text>단국대학교 죽전캠퍼스</Text>
          </View>
          <View style={style.tablescore}>
            <Text>1000</Text>
          </View>
        </View>
      </ScrollView>
    </View>
    );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'space-between'
  },
  header: {
    height: 80,
    flexDirection: 'row',
  },
  headercontainer: {
    flex: 1,
    margin: 0.5,
    marginTop: 1,
    marginBottom: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headertext: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  tabletop: {
    height: 40,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabletopcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabletoptext: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  tablerow: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  tablenum: {
    flex:1, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  tablename: {
    flex:2, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableschool: {
    flex:3, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  tablescore: {
    flex:2, 
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Ranking;