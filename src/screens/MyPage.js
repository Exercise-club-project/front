import React from 'react';
import styled from 'styled-components/native';
import {
    StyleSheet,
    View,
    Text,
  } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Container = styled.View`
flex: 1;
background-color: ${({theme}) => theme.background};
`;

const MyPage = ({navigation}) => {
    return (
    <Container>
    <View>
        <View style={style.box1}>
            <View style={style.nameTextbox}>
                <Text style={style.nameText}>홍길동</Text>
            </View>
            <View style={style.clubschoolbox}>
            <View style={style.clubnamebox}>
                <Text style={style.clubnameText}>FLY</Text>
            </View>
            <View style={style.schoolnamebox}>
                <Text style={style.schoolnameText}>단국대학교 죽전캠퍼스</Text>
            </View>
            </View>
        </View>
    </View>
    <View style={style.box2}>
    <TouchableOpacity style={style.mypagebutton} onPress = {() => navigation.navigate('MyPage_MyInfo')}>
        <Text style={style.buttontext}>내 정보</Text>
    </TouchableOpacity>
    <TouchableOpacity style={style.mypagebutton} onPress = {() => navigation.navigate('MyPage_Act')}>
        <Text style={style.buttontext}>활동 내역</Text>
    </TouchableOpacity>
    <TouchableOpacity style={style.mypagebutton} onPress = {() => navigation.navigate('MyPage_MyClub')}>
        <Text style={style.buttontext}>나의 동아리</Text>
    </TouchableOpacity>
    </View>
    </Container>
    );
};

const style= StyleSheet.create({
    box1:{
        flexDirection:'row', 
        height: 80,
        marginTop: 20,
        marginHorizontal: 30,
        backgroundColor:'#ededed'
    },
    nameTextbox:{
        flex:1, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    clubschoolbox:{
        flex:3, 
        flexDirection:'column', 
        justifyContent:'center',
        alignContent:'center',
    },
    clubnamebox:{
        flex:1,
        paddingLeft:'15%',
        paddingBottom:5,
        justifyContent:'flex-end',
    },
    schoolnamebox: {
        flex:1,
        paddingLeft:'15%',
        paddingTop:5,
        justifyContent:'flex-start',
    },
    nameText: {
        fontSize:20,
        fontWeight: 'bold',
    },
    clubnameText: {
        fontSize:16,
        fontWeight: 'bold',
    },
    schoolnameText: {
        fontSize:16,
    },
    box2: {
        borderWidth:2,
        marginTop:20,
        marginHorizontal:30,
        paddingHorizontal:10,
        paddingBottom:10,
    },
    mypagebutton: {
        height:50,
        width:'100%', 
        justifyContent:'center',
        marginTop:10,
        paddingLeft:'5%',
    },
    buttontext: {
        fontSize:20,
        fontWeight: 'bold',
    },
})
export default MyPage;