import { StyleSheet,Dimensions,width } from 'react-native';


const GlobalStyle = StyleSheet.create({
    input: {
        //height: 45,
        paddingHorizontal: 12,
        borderRadius: 23,
        //borderWidth: 0.5,
        //borderColor: '#888787',
        marginBottom: 7,
        paddingLeft:0,
        paddingRight:0 ,
        backgroundColor: '#ffffff',
    },
    inputStyle: 
    { 
        fontSize: 14,
        color: '#000000',
        paddingLeft:0,
        paddingRight:0 
    },
    labelStyle: {
        fontSize: 12,
        position: 'absolute',
        top: -10,
        backgroundColor: 'white',
        paddingHorizontal: 4,
        marginLeft: -4,
        color: '#2182c5',
        
    },
    placeholderStyle:{
        color:'grey'


    },
     bg_purple:{
         backgroundColor:'#5d285e',
     },
     bg_pink:{
        backgroundColor: "#e7327c",
     },
     headercurve:{
        borderBottomLeftRadius: 15,
        borderBottomRightRadius:15,
        overflow:'hidden',
     },
     cardsubtitle:{
        //fontWeight:'bold',
        fontSize:15,
        color:'#ffffff',
        letterSpacing:0,
     },
     cardsubtitlewallfeed:{
        //fontWeight:'bold',
        fontSize:16,
        color:'#f6be18',
        letterSpacing:0,
        marginLeft:-12,
        
     },
     dtext:{
         color:'#f6be18',
         fontSize:18,
         fontWeight:'400',
     },
     chatview:{ paddingLeft: 8,paddingRight:8,marginBottom:10,},
     avatarlabel:{
         backgroundColor:'#d8d8d8',
         color:'#000000',
     },
     cardcustom:{
        //backgroundColor:'#ffffff',
        backgroundColor:'#491849',
        borderRadius:12,
        //borderBottomColor:'#000000',
        //borderBottomWidth:3,
        marginBottom:4,
        justifyContent:'center',
     },
     fabimage:{
         width:70,
         height:70,
         position:'absolute',
         right:14,
         bottom:72,
         elevation:2,
     },
})
 

export default GlobalStyle;