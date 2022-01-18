import React from 'react';
import{
    View,
    Text, 
    StyleSheet
} from 'react-native';
import { Switch } from 'react-native-web';


function Toggle(props){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{props.value?'ON':'OFF'}</Text>
            <Switch style={styles.text} value={props.value} onValueChange={props.onValueChange}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical:15,
        flexDirection:'row' 
    },
    text: {
        marginLeft:10,
        fontSize:20,
        fontWeight:'bold',
        flex:1
    },
    switch:{
        width:50
    }

})

export default Toggle