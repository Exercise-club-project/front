import React , {useState, useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import request from '../funtion/request';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyPage_MyClub = () => {

    const [groupdata, setGroupdata] = useState({});
    const getGroupdata = async () => {
        const groupId = await AsyncStorage.getItem('MygroupId');
        const res = await request({
          method: 'GET',
          url: `/group/get/${groupId}`,
        });
      
        if(res.result === "SUCCESS"){
            setGroupdata(res.data);
            //console.log("res.data: ",res.data);
        }
    };
    useEffect(() => {
        getGroupdata(); // api data 수정 된 후 사용
         //setMeeting(TESTDATA)
      }, []);
    // /group/get/{groupId}
    console.log("gropudata: ",groupdata);
    const data = [
        {
          name: "정기모임",
          score: 525,
          color: "#00CFFF",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "번개모임",
          score: 525,
          color: "#046B99",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "총회",
          score: 1050,
          color: "#1C304A",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
      ];
      const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };
      
    return (
        <View style={style.backview}>

            <View style={{flex:1,}}>
                <View style={{flex:1, backgroundColor:'#c4c4c4', marginTop:30, maxHeight:100, flexDirection: 'row'}}>

                    <View style={style.bigbox1}>
                        <Text style={{fontSize: 30,fontWeight: 'bold',}}>{groupdata.clubName}</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <View style={style.box1}>
                            <Text style={{fontSize: 16,}}>{groupdata.school}</Text>
                        </View>
                        <View style={{flex:1}}>
                            <View style={style.box2}>
                                    <Text style={{fontSize:14, paddingRight:20,}}>회원 수</Text>
                                    <Text style={{fontSize:16, fontWeight:'bold', paddingRight: 5,}}>{groupdata.number}</Text>
                                    <Text style={{fontSize:16, }}>명</Text>
                            </View>
                        </View>
                    </View>
                </View>
                
                <View style={style.bigbox2}>
                    <View style={style.box3}>
                        <Text style={{fontSize:20, fontWeight:'bold',}}>랭킹</Text>
                    </View>
                    <View style={style.box4}>
                        <Text style={{fontSize:16,}}>동아리전체</Text>
                    </View>
                    <View style={style.box5}>
                        <View style={style.box6}>
                            <Text style={{fontSize:20, color:'red', paddingHorizontal:5,}}>1</Text>
                            <Text style={{fontSize:16,}}>등</Text>
                        </View>
                    </View>
                </View>

                <View style={style.bigbox3}>
                    <View style={{flex:1, maxHeight:40,}}>
                        <View style={{flex:1,flexDirection:'row',alignItems: 'center', paddingLeft:10,}}>
                            <Text style={{fontSize:20, fontWeight:'bold',}}>점수</Text>
                            <Text style={{fontSize:20, paddingLeft:10,}}>2100</Text>
                        </View>
                    </View>

                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <PieChart
                            data={data}
                            width={150}
                            height={150}
                            chartConfig={chartConfig}
                            accessor={"score"}
                            backgroundColor={"transparent"}
                            paddingLeft={"20"}
                            center={[10, 10]}
                            absolute
                            hasLegend={false}
                            />
                    </View>
                </View>

                <View style={style.bottombox}>
                    <View style={{flexDirection:'row',height:30, justifyContent:'space-around',}}>
                        <Text style={{fontSize:16, fontWeight: 'bold', paddingRight: '20%'}}>종류</Text>
                        <Text style={{fontSize:16, fontWeight: 'bold', paddingRight: '10%'}}>점수</Text>
                    </View>

                    <View style={{flexDirection:'row',height:40, justifyContent:'center',}}>
                    <View style={{flex:0.6, justifyContent:'center',alignItems: 'flex-start',}}><View style={{height:20, width:20, backgroundColor:'#00CFFF'}}></View></View>
                    <View style={{flex:2,justifyContent:'center'}}><Text style={{fontSize:14}}>정기모임</Text></View>
                    <View style={{flex:1,justifyContent:'center'}}><Text style={{fontSize:14}}>525</Text></View>
                    <View style={{flex:1,justifyContent:'center'}}><Text style={{fontSize:14, color:'gray'}}>25.00%</Text></View>
                    </View>

                    <View style={{flexDirection:'row',height:40, justifyContent:'center',}}>
                    <View style={{flex:0.6, justifyContent:'center',alignItems: 'flex-start',}}><View style={{height:20, width:20, backgroundColor:'#046B99'}}></View></View>
                    <View style={{flex:2,justifyContent:'center'}}><Text style={{fontSize:14}}>번개모임</Text></View>
                    <View style={{flex:1,justifyContent:'center'}}><Text style={{fontSize:14}}>525</Text></View>
                    <View style={{flex:1,justifyContent:'center'}}><Text style={{fontSize:14, color:'gray'}}>25.00%</Text></View>
                    </View>

                    <View style={{flexDirection:'row',height:40, justifyContent:'center',}}>
                    <View style={{flex:0.6, justifyContent:'center',alignItems: 'flex-start',}}><View style={{height:20, width:20, backgroundColor:'#1C304A'}}></View></View>
                    <View style={{flex:2,justifyContent:'center'}}><Text style={{fontSize:14}}>총회</Text></View>
                    <View style={{flex:1,justifyContent:'center'}}><Text style={{fontSize:14}}>1050</Text></View>
                    <View style={{flex:1,justifyContent:'center'}}><Text style={{fontSize:14, color:'gray'}}>50.00%</Text></View>
                    </View>
                </View>
            </View>

        </View>
        
    );
}

const style = StyleSheet.create({
    backview: {
        flex:1, 
        flexDirection: 'row',
        paddingHorizontal: 30,
    },
    bigbox1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 20,
    },
    box2: {
        flex:1, 
        flexDirection: 'row', //flexDirection에 따라서, justfyContent와, alignItems 의 가로 세로가 다름 
        justifyContent:'flex-end',
        alignItems:'center',
        paddingRight: 20,
    },
    bigbox2: {
        flex:1,
        borderWidth: 2,
        maxHeight: 140,
        marginTop: 20, 
        marginBottom:20,
    },
    box3: {
        flex:1, 
        maxHeight:40, 
        justifyContent: 'center', 
        paddingLeft:10,
    },
    box4:{
        flex:1,
        maxHeight:30, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    box5: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box6: {
        flex:1,
        maxHeight: 30,
        flexDirection: 'row', 
        alignItems: 'baseline', 
    },
    bigbox3: {
        flex:2,
        maxHeight:300,
        borderWidth: 2,
        backgroundColor: '#ededed'
    },
    bottombox: {
        flex:2,
        maxHeight:150,
        marginTop:20,
        marginBottom: 20,
    }
});

export default MyPage_MyClub;