import react from "react";
import { StyleSheet, Text, View } from "react-native";


const ClubDetail = () => {

    return (
        <View style={style.backview}>
            <View style={style.sideview}></View>

            <View style={{flex:1,}}>
                <View style={{flex:1, maxHeight:100,}}></View>
                <View style={{flex:1, backgroundColor:'gray', maxHeight:100, flexDirection: 'row'}}>

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
                            <Text style={{fontSize:20, color:'red'}}>1</Text>
                            <Text style={{fontSize:16,}}>등</Text>
                        </View>
                    </View>
                </View>

                <View style={style.bigbox3}>
                    <View style={{flex:1, maxHeight:40,backgroundColor:'green',}}>
                        <View style={{flex:1, backgroundColor:'skyblue',flexDirection:'row',alignItems: 'center', paddingLeft:10,}}>
                            <Text style={{fontSize:20, fontWeight:'bold',}}>점수</Text>
                            <Text style={{fontSize:20, paddingLeft:10,}}>2100</Text>
                        </View>
                    </View>

                    <View style={{flex:1, backgroundColor:'red', alignItems:'center', justifyContent:'center'}}>
                        <View style={{height:80, width:80,backgroundColor:'green'}}></View>
                    </View>
                </View>

                <View style={{flex:2, backgroundColor:'blue', marginTop:20, }}></View>
            </View>

            <View style={style.sideview}></View>
        </View>
        
    );
}

const style = StyleSheet.create({
    backview: {
        flex:1, 
        flexDirection: 'row',
    },
    sideview:{
        width: 30, 
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
        maxHeight:200,
        backgroundColor:'gray',
    },
});

export default ClubDetail;