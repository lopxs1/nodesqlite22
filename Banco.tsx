import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Icon, MD3Colors } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { Conexao, createTable, inserirUsuario, selectUsuario, selectUsuarioId, dropTable , deleteUsuario} from './Conf/Banco';
export default function App() {

  // ---- HOOK
  useEffect(()=>{
     async function Main(){
        let db =  await Conexao();
       // await createTable(db);
       // await dropTable(db, 'USUARIO');
      // inserirUsuario(db,"Ricardo","@Giovanna");

       const registro = await selectUsuario(db);

        for( const linhas of registro as {ID_US:number, NOME_US:string, EMAIL_US :string } ){
             
              console.log(linhas.ID_US, linhas.NOME_US, linhas.EMAIL_US);
          }
    console.log("/------------------------------------------------------")
        const nome  = await selectUsuarioId(db,5);       
     console.log(nome.ID_US, nome.NOME_US,nome.EMAIL_US,)
        
    console.log("/------------------------------------------------------");
       // await deleteUsuario(db, 3);
      
       
     }
      
     Main();
  },[])


  return (
    <View style={styles.container}>
     
      <Button icon="account-alert" mode="contained" onPress={() => console.log('Pressed')}>
        Inserir
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
