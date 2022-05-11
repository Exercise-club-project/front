import React,{useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, Text, View } from "react-native";
import axios from 'axios';



const Ranking_Club = ({navigation}) =>{
  const [clubdata, setclubdata] = useState([]);
  const getRank = async() =>{
    try{
      const response = await axios.get(
        `http://23.23.240.178:8080/rank/group`,
      );
      if(response.data.result === "SUCCESS"){
        console.log('result : ', response.data.result);
        console.log('data : ',response.data.data);
        setclubdata(response.data.data);
      }
    }
    catch(e){
      console.log(e);
    }
  };
  useEffect(() => {
    getRank(); // api data 수정 된 후 사용
    //setMeeting(TESTDATA)
 }, []);

    return (
    <View style={style.container}>
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

        {clubdata.map((club)=>{
          return (
          <TouchableOpacity style={style.tablerow} key={club.num} 
          onPress = {() => navigation.navigate('Ranking_ClubDetail')}
          >

            <View style={style.tablenum}>
              <Text>{club.num}</Text>
            </View>
            <View style={style.tablename}>
              <Text>{club.club}</Text>
            </View>
            <View style={style.tableschool}>
              <Text>{club.school}</Text>
            </View>
            <View style={style.tablescore}>
              <Text>{club.score}</Text>
            </View>
          </TouchableOpacity>
          );
        })}
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

export default Ranking_Club;