// Components/Test.js

import React ,{useEffect, useState} from 'react'
import { StyleSheet, View, Animated, Easing, Button, PanResponder, Dimensions} from 'react-native'

const Test =(props : any) => {
 
  const [topPosition,setTopPosition] = useState(0);
  const [leftPosition,setLeftPosition] = useState(0);
  const [count, setCount] = useState(1);

  let {height, width} = Dimensions.get('window');

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
        let touches = evt.nativeEvent.touches;
        if (touches.length == 1) {
          setTopPosition(touches[0].pageY - height/2) ;
          setLeftPosition(touches[0].pageX - width/2);
        }
    }
})

 
  
return (
  <View style={styles.main_container}>
    <View
      {...panResponder.panHandlers}
      style={[styles.animation_view, { top: topPosition, left: leftPosition }]}>
    </View>
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