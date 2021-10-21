import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import Colors from '../constants/colors'
import TitleText from '../components/TitleText'

const Header = ({ title }) => {
	return (
		<View 
			style={{
				...styles.headerBase, 
				...Platform.select({
					ios: styles.headerIos,
					android: styles.headerAndroid	
				})
			}}
		>
			<TitleText style={styles.title2}>{title}</TitleText>
		</View>
	)
}

const styles = StyleSheet.create({
	// header: {
	// 	width: '100%',
	// 	height: 90,
	// 	paddingTop: 36,
	// 	backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
	// 	alignItems: 'center',
	// 	justifyContent: 'center',
	// 	borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
	// 	borderBottomWidth: Platform.OS === 'ios' ? 1 : 0
	// },
	headerBase: {
		width: '100%',
		height: 90,
		paddingTop: 36,
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerIos: {
		backgroundColor: 'white',
		borderBottomColor: '#ccc',
		borderBottomWidth: 1
	},
	headerAndroid: {
		backgroundColor: Colors.primary,
	},
	title2: {
		color: Platform.OS === 'ios' ? Colors.primary : 'white',
	}
});

export default Header
