import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, ScrollView } from 'react-native'
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import TitleText from '../components/TitleText';
import colors from '../constants/colors';

const GameOverScreen = (props) => {
	return (
		<ScrollView style={{marginTop: 30}}>
			<View style={styles.screen}>
				<TitleText>The Game is Over!</TitleText>
				<View style={styles.imageContainer}>
					<Image 
						fadeDuration={1000}
						style={styles.image} 
						source={require('../assets/success.png')}
						// source={{uri: 'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_1280.jpg'}}
						resizeMode="cover"
					/>
				</View>
				<View style={styles.resultContainer}>
					<BodyText style={styles.resultText}>
						Your phone needed <Text style={styles.highlight}>
							{props.roundNumbers}
						</Text> rounds to guess the number <Text style={styles.highlight}>
							{props.userNumber}
						</Text>.
					</BodyText>
				</View>
				<MainButton onPress={props.onRestart}>NEW GAME</MainButton>
			</View>
		</ScrollView>
	)
}

export default GameOverScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10
	},
	imageContainer: {
		width: Dimensions.get('window').height * 0.35,
		height: Dimensions.get('window').height * 0.35,
		borderRadius: Dimensions.get('window').height * 0.35 / 2,
		borderWidth: 3,
		borderColor: 'black',
		overflow: 'hidden',
		margin: Dimensions.get('window').width > 350 ? 30 : 10
	},
	resultContainer: {
		marginHorizontal: 30,
		marginVertical: Dimensions.get('window').width > 350 ? 30 : 10
	},
	resultText: {
		textAlign: 'center',
		fontSize: Dimensions.get('window').height < 600 ? 18 : 20
	},
	image: {
		width: '100%',
		height: '100%',
	},
	highlight: {
		color: colors.primary,
		fontFamily: 'open-sans-bold',
	}
});
