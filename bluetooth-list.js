import React, { useEffect, useState } from 'react'
import{
    View,
    Text,
    FlatList,
    InteractionManager
} from 'react-native'
import Layout from './components/bluetooth-list-layout'
import Empty from './components/empty'
import Toggle from './components/toggle'
import Subtitle from './components/subtitle'
import BluetoothSerial from './node_modules/@config-plugins/react-native-ble-plx' 
import Device from './components/device'

function BluetoothList(props){
    console.log('entrou');
    const [lista, setLista] = useState([]);
    const [bolEnable, setBolEnable] = useState(false);
    const renderEmpty = () => <Empty text={'Nenhum dispositivo Encontrado'}/>
   

    const renderItem = ({item}) => {
        return <Device {...item} 
        iconLeft={require('./icones/ic_laptop.png')}
        iconRight={require('./icones/ic_settings.png')}
        />
    };

    useEffect(() =>{
        async function init(){
            console.log('chegou');
            const enable = await BluetoothSerial.requestEnable();
            const lista = await BluetoothSerial.list();
            setLista(lista);
            setBolEnable(enable);
        }
        init();

        return() =>{
            async function remove(){
                console.log('saiu');
                await BluetoothSerial.stopScanning();
                console.log('terminou !!!');
            }
        remove();
        }
    },[]);

    const enableBluetooth = async () => {
        try{
            await BluetoothSerial.requestEnable();
            const lista = await BluetoothSerial.list();
            await BluetoothSerial.stopScanning;
            setBolEnable(true);
            setLista(lista);
        } catch (error){
            console.log(error);
        }
    };

    const disableBluetooth = async () => {
        try{
            await BluetoothSerial.disable();
            await BluetoothSerial.stopScanning;
            setBolEnable(false);
            setLista([]);
        } catch (error){
            console.log(error);
        }
    };

    return(
        <Layout title='Bluetooth'>
            <Toggle value={bolEnable} onValueChange={toggleBluetooth} />
            <Subtitle title='Lista de dispositivos'/>
            <FlatList
                data={lista}
                ListEmptyComponent={renderEmpty}
                renderItem={renderItem}
            />
        </Layout>
    );
}
export default BluetoothList
