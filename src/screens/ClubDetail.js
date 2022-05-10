import react from "react";
import { StyleSheet, Text, View } from "react-native";
import { PieChart } from 'react-minimal-pie-chart';

const ClubDetail = () => {

    return (
        <View style={style.backview}>
            <View style={{flex:1,marginTop:10,}}>
                <View style={{flex:1, backgroundColor:'#c4c4c4', maxHeight:80, flexDirection: 'row'}}>

                    <View style={style.bigbox1}>
                        <Text style={{fontSize: 30,fontWeight: 'bold',}}>FLY</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <View style={style.box1}>
                            <Text style={{fontSize: 16,}}>단국대학교 죽전캠퍼스</Text>
                        </View>
                        <View style={{flex:1}}>
                            <View style={style.box2}>
                                    <Text style={{fontSize:14, paddingRight:20,}}>회원 수</Text>
                                    <Text style={{fontSize:16, fontWeight:'bold', paddingRight: 5,}}>66</Text>
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
                            <Text style={{fontSize:20, fontWeight:'bold',marginHorizontal:10, color:'red'}}>1</Text>
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

                    <View style={{flex:1, alignItems:'center', justifyContent:'center', paddingTop:'5%',paddingBottom:'10%',}}>
                        <PieChart
                            data={[
                                { title: '정기모임', value: 525, color: 'red' },
                                { title: '번개모임', value: 525, color: 'blue' },
                                { title: '총회', value: 1050, color: 'green' },
                            ]}
                            />
                            {/* npm install react-minimal-pie-chart 필요함 */}
                    </View>
                </View>

                <View style={style.bottombox}>
                    <View style={{flexDirection:'row',height:40, justifyContent:'space-around',}}>
                        <Text style={{fontSize:16, fontWeight: 'bold', paddingRight: '20%'}}>종류</Text>
                        <Text style={{fontSize:16, fontWeight: 'bold', paddingRight: '10%'}}>점수</Text>
                    </View>

                    <View style={{flexDirection:'row',height:40, justifyContent:'center',}}>
                    <View style={{flex:0.6, justifyContent:'center',alignItems: 'flex-start',}}><View style={{height:20, width:20, backgroundColor:'red'}}></View></View>
                    <View style={{flex:2,justifyContent:'center'}}><Text style={{fontSize:14}}>정기모임</Text></View>
                    <View style={{flex:1,justifyContent:'center'}}><Text style={{fontSize:14}}>525</Text></View>
                    <View style={{flex:1,justifyContent:'center'}}><Text style={{fontSize:14, color:'gray'}}>25.00%</Text></View>
                    </View>

                    <View style={{flexDirection:'row',height:40, justifyContent:'center',}}>
                    <View style={{flex:0.6, justifyContent:'center',alignItems: 'flex-start',}}><View style={{height:20, width:20, backgroundColor:'blue'}}></View></View>
                    <View style={{flex:2,justifyContent:'center'}}><Text style={{fontSize:14}}>번개모임</Text></View>
                    <View style={{flex:1,justifyContent:'center'}}><Text style={{fontSize:14}}>525</Text></View>
                    <View style={{flex:1,justifyContent:'center'}}><Text style={{fontSize:14, color:'gray'}}>25.00%</Text></View>
                    </View>

                    <View style={{flexDirection:'row',height:40, justifyContent:'center',}}>
                    <View style={{flex:0.6, justifyContent:'center',alignItems: 'flex-start',}}><View style={{height:20, width:20, backgroundColor:'green'}}></View></View>
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
        maxHeight: 110,
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
        backgroundColor:'#c4c4c4',
    },
    bottombox: {
        marginTop:20,
    },
});

export default ClubDetail;