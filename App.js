import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App() {
  const [numero, setNumero] = useState(0);
  const [botao, setBotao] = useState('Vai');
  const [ultimo, setUltimo] = useState(null);

  function iniciarCronometro(){
    if (timer !== null){
      //Aqui vai parar
      clearInterval(timer);
      timer = null;
      setBotao('Vai');
    } else{
      ///Comercar a girar o timer
      timer = setInterval(() => {
        ss++;
        if (ss == 60){
          ss = 0;
          mm++;
        }
        if (mm == 60){
          mm = 0;
          hh++;
        }

        let format = 
        (hh < 10 ? '0' + hh : hh) + ':' + 
        (mm < 10 ? '0' + mm : mm) + ':' +
        (ss < 10 ? '0' + ss : ss);
        
        setNumero(format);
      }, 1000);
      setBotao('Parar');
    }
  }
  function limparCronometro(){
    if (timer !== null){
      clearInterval(timer);
      timer = null;
    }
    setBotao('Vai');
    setUltimo(numero);
    setNumero(0);
    ss= 0,
    mm = 0;
    hh = 0;
  }

  return (
    <View style={styles.container}>
      <Image
      source={require('./src/crono.png')}
      /> 
       <Text style={styles.textTimer}>{numero}</Text>
       <View style={styles.btnArea} >
         <TouchableOpacity style={styles.btn} onPress={iniciarCronometro}>
           <Text style={styles.btnText}>{botao}</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.btn} onPress={limparCronometro}>
           <Text style={styles.btnText}>Limpar</Text>
         </TouchableOpacity>
       </View>

       <View style={styles.areaUltima}>
         <Text style={styles.textCorrida}>
           {ultimo ? `Ultimo tempo ${ultimo}` : ''}
         </Text>
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeef'
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40
  },
  textTimer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff'
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    margin: 17,
    borderRadius: 9
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef'
  },
  areaUltima:{
    marginTop: 40
  },
  textCorrida:{
    fontSize: 30,
    color: '#fff',
    fontStyle: 'italic'
  }
});
