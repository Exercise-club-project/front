import React , {useState, useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import request from '../funtion/request';

const Rank_Mem_club = ({route}) => {

    const userId = route.params.id;
    const rank = route.params.rank;
    // 개인(전체)에서 누를 경우 rank_whole이 오고 rank_Club은 undefined뜸
    // 개인(전체)에서 누를 경우 rank_Club이 오고 rank_whole은 undefined뜸
    
    const [userdata, setUserdata] = useState({});
    const [opPer,setopPer] = useState(0);
    const [regPer,setregPer] = useState(0);
    const [impPer,setimpPer] = useState(0);
    const getUserdata = async () => {
        const res = await request({
          method: 'GET',
          url: `/user/history/${userId}`,
        });
      
        if(res.result === "SUCCESS"){
            setUserdata(res.data);
            console.log(res.data);
            if(total !== 0){
                setopPer(((op / total)*100).toFixed(3));
                setimpPer(((imp / total)*100).toFixed(3));
                setregPer(((reg / total)*100).toFixed(3));
            }
            //console.log("res.data: ",res.data);
        }
    };
    useEffect(() => {
        getUserdata(); // api data 수정 된 후 사용
         //setMeeting(TESTDATA)
      }, []);
    const imp = userdata.impromptuScore;
    const op = userdata.openScore;
    const reg = userdata.regularScore;
    const total = userdata.totalScore;

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
              <View style={style.box1}>
              <View style={style.nameTextbox}>
                  <Text style={style.nameText}>{userdata.userName}</Text>
              </View>
              <View style={style.clubschoolbox}>
              <View style={style.clubnamebox}>
                  <Text style={style.clubnameText}>{userdata.clubName}</Text>
              </View>
              <View style={style.schoolnamebox}>
                  <Text style={style.schoolnameText}>{userdata.schoolName}</Text>
              </View>
              </View>
          </View>
                
                <View style={style.bigbox2}>
                    <View style={style.box3}>
                        <Text style={{fontSize:20, fontWeight:'bold',}}>랭킹</Text>
                    </View>

                    <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                    
                    <View style={{flex:1}}>
                    <View style={style.box4}>
                        <Text style={{fontSize:16,}}>동아리내</Text>
                    </View>
                    <View style={style.box5}>
                        <View style={style.box6}>
                            <Text style={{fontSize:20, color:'red',paddingHorizontal:5,}}>{rank}</Text>
                            <Text style={{fontSize:16,}}>등</Text>
                        </View>
                    </View>  
                    </View>
                    </View>
                </View>

                <View style={style.bigbox3}>
                    <View style={{flex:1, maxHeight:40,}}>
                        <View style={{flex:1,flexDirection:'row',alignItems: 'center', paddingLeft:10,}}>
                            <Text style={{fontSize:20, fontWeight:'bold',}}>점수</Text>
                            <Text style={{fontSize:20, paddingLeft:10,}}>{total}</Text>
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
                    <View style={{flex:1,justifyContent:'center'}}><Text style={{fontSize:14}}>{reg}</Text></View>
                    <View style={{flex:1,justifyContent:'center'}}><Text style={{fontSize:14, color:'gray'}}>{regPer}%</Text></View>
                    </View>

                    <View style={{flexDirection:'row',height:40, justifyContent:'center',}}>
                    <View style={{flex:0.6, justifyContent:'center',alignItems: 'flex-start',}}><View style={{height:20, width:20, backgroundColor:'#046B99'}}></View></View>
                    <View style={{flex:2,justifyContent:'center'}}><Text style={{fontSize:14}}>번개모임</Text></View>
                    <View style={{flex:1,justifyContent:'center'}}><Text style={{fontSize:14}}>{imp}</Text></View>
                    <View style={{flex:1,justifyContent:'center'}}><Text style={{fontSize:14, color:'gray'}}>{impPer}%</Text></View>
                    </View>

                    <View style={{flexDirection:'row',height:40, justifyContent:'center',}}>
                    <View style={{flex:0.6, justifyContent:'center',alignItems: 'flex-start',}}><View style={{height:20, width:20, backgroundColor:'#1C304A'}}></View></View>
                    <View style={{flex:2,justifyContent:'center'}}><Text style={{fontSize:14}}>총회</Text></View>
                    <View style={{flex:1,justifyContent:'center'}}><Text style={{fontSize:14}}>{op}</Text></View>
                    <View style={{flex:1,justifyContent:'center'}}><Text style={{fontSize:14, color:'gray'}}>{opPer}%</Text></View>
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
    box1:{
      flexDirection:'row', 
      height: 80,
      marginTop: 20,
      backgroundColor:'#ededed'
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

export default Rank_Mem_club;