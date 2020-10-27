import React, {useEffect, useState} from 'react';
import { Animated, Dimensions, View, StyleSheet } from 'react-native';

const FadeIn =(props: any) =>{

	const [leftPosition, setLeftPosition] = useState(new Animated.Value(Dimensions.get("window").width))
	
	useEffect(()=>{
		Animated.spring(leftPosition,{
			toValue:0,
			useNativeDriver : false
		}).start()
	},[])
	return (
		<View style={styles.main_container}>
			<Animated.View style={[styles.animation_container, {left: leftPosition}]}>
				{props.children}
			</Animated.View>
		</View>

	)
}

const styles=StyleSheet.create({
	main_container : {
		flex:1
	},
	animation_container:{

	}
})

export default FadeIn;