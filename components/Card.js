import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Card = ({ children, style }) => {
	return (
		<View style={{...styles.card, ...style}}>
			{children}
		</View>
	)
}

export default Card

const styles = StyleSheet.create({
	card: {
		// shadow props for ios
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		shadowOpacity: 0.26,
		//shadow props for android
		elevation: 5,
		backgroundColor: '#fff',
		padding: 20,
		borderRadius: 10
	},
});
