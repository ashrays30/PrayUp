import { StyleSheet,Dimensions,width } from 'react-native';


const GlobalStyle = StyleSheet.create({
     bg_purple:{
         backgroundColor:'#491849',
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
        fontSize:21,
        color:'#ffffff',
        letterSpacing:0,
     },
     cardsubtitlewallfeed:{
        //fontWeight:'bold',
        fontSize:16,
        color:'#ffffff',
        letterSpacing:0,
        marginLeft:-12,
        
     },
     avatarlabel:{
         backgroundColor:'#ffcc00',
         color:'#ffffff',
     },
     cardcustom:{
        //backgroundColor:'#ffffff',
        backgroundColor:'#784179',
        borderRadius:18,
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
         bottom:70,
         elevation:2,
     },
})
 

export default GlobalStyle;