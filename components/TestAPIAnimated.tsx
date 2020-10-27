// Components/Test.js

import React ,{useEffect, useState} from 'react'
import { StyleSheet, View, Animated, Easing, Button} from 'react-native'

const Test =(props : any) => {
 
  const [topPosition,setTopPosition] = useState(new Animated.Value(0));
  const [leftPosition,setLeftPosition] = useState(new Animated.Value(0));
  const [count, setCount] = useState(1);

  useEffect (() =>{
    Animated.parallel([
      Animated.spring(
        topPosition,
        {
          toValue: 100,
          tension: 8,
          friction: 3,
          useNativeDriver: false
        }
      ),
      Animated.timing(
        leftPosition,
        {
          toValue: 100,
          duration: 1000,
          easing: Easing.elastic(2),
          useNativeDriver: false
        }
      )
    ]).start()
  }, [count])
  
  return (
    <View style={styles.main_container}>
       <Animated.View style={[styles.animation_view, { top: topPosition, left: leftPosition }]}>
        </Animated.View>
        <Button title="Reanimate" onPress={() => {   
          setTopPosition(new Animated.Value(count));
          setCount(count+1);
        }} />
    </View>
  )
  
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  animation_view: {
    backgroundColor: 'red',
    width: 100,
    height: 100
  }
})

export default Test