import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native'
import colors from '../constants/colors'

const MainButton = props => {
	let ButtonComponent = TouchableOpacity;

	return (
		<ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
			<View style={styles.button}>
				<Text style={styles.buttonText}>
					{props.children}
				</Text>
			</View>
		</ButtonComponent>
	)
}

export default MainButton

const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.primary,
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 25
	},
	buttonText: {
		color: 'white',
		fontFamily: 'open-sans',
		fontSize: 18
	}
})
