// Components/Test.js

import React , { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, Platform, Text, Animated, Easing } from 'react-native'

const Test = (props: any) => {

  const [topPosition, setTopPosition] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(topPosition,{toValue: 100 ,duration: 3000000, easing: Easing.linear, useNativeDriver : false}
    ).start() 
  },[])

  return (
    <View style={styles.main_container}>
      <View style={styles.subview_container}>
        <Animated.View style={[styles.animation_view, { top : topPosition }]} />
      </View>
	  <View>
      	{ Platform.OS === 'ios' ? <Text>iOS</Text> : <Text>Android</Text> }    
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
  subview_container: {
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
        height: 100,
        width: 50
      },
      android: {
        backgroundColor: 'blue',
        height: 100,
        width: 100
      }
    })
  },
  animation_view:{

  }
})

export default Test
