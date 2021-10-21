import React, { useState, useRef, useEffect } from 'react'
import { 
	StyleSheet, 
	View, 
	Alert, 
	FlatList,
	Dimensions,
} from 'react-native'
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import { Ionicons } from '@expo/vector-icons'
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNum = Math.floor(Math.random() * (max - min)) + min;
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
}

const renderListItem = (listLength, value) => {
	return (
	<View style={styles.listItem}>
		<BodyText>#{listLength - value.index}</BodyText>
		<BodyText>{value.item}</BodyText>
		{/* <BodyText>#{listLength}</BodyText> */}
		{/* <BodyText>{value}</BodyText> */}
	</View>
)}

const GameScreen = (props) => {
	const { userChoice, onGameOver } = props;

	const initialGuess = generateRandomBetween(1, 100, userChoice);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
	const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
	const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	useEffect(() => {
		const updateLayout = () => {
			setAvailableDeviceWidth(Dimensions.get('window').width);
			setAvailableDeviceHeight(Dimensions.get('window').height);
		}

		const dListen = Dimensions.addEventListener('change', updateLayout);
		return () => {
			dListen?.remove();
		}
	})

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length);
		}
	}, [currentGuess, userChoice, onGameOver]);

	const nextGuessHandler = (direction) => {
		if (
			(direction === 'lower' && currentGuess < userChoice) ||
			(direction === 'greater' && currentGuess > userChoice)
			) {
				Alert.alert(
					"Don't Lie!", 
				'You know that this is wrong...',
				[{text: 'Sorry!', style: 'cancel'}]
				);
				return;
			}
			if (direction === 'lower') {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess + 1;
		}
		
		const nextNumber = 
		generateRandomBetween(
			currentLow.current, 
			currentHigh.current, 
			currentGuess
		);
		setCurrentGuess(nextNumber);
		// setRounds(curRounds => curRounds + 1);
		setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
	}

	if (availableDeviceHeight < 500) {
		return (
			<View style={styles.screen}>
				<BodyText>Opponent's Guess</BodyText>
				<View style={styles.controls}>
					<MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
						<Ionicons name="md-remove" size={24} color="white" />
					</MainButton>
					<NumberContainer>{currentGuess}</NumberContainer>
					<MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
						<Ionicons name="md-add" size={24} color="white" />
					</MainButton>
				</View>
				<View style={{ flex: 1, width: '80%' }}>
					<FlatList
						keyExtractor={item => item}
						data={pastGuesses}
						renderItem={renderListItem.bind(this, pastGuesses.length)}
						contentContainerStyle={styles.list}
					/>
				</View>
			</View>
		)
	}

	return (
		<View style={styles.screen}>
			<BodyText>Opponent's Guess</BodyText>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer(availableDeviceHeight)}>
				<MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
					<Ionicons name="md-remove" size={24} color="white" />
				</MainButton>
				<MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
					<Ionicons name="md-add" size={24} color="white" />
				</MainButton>
			</Card>
			<View style={{ flex: 1, width: '60%' }}>
				<FlatList
					keyExtractor={item => item}
					data={pastGuesses}
					renderItem={renderListItem.bind(this, pastGuesses.length)}
					contentContainerStyle={styles.list}
				/>
				{/* <ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, i) => renderListItem(pastGuesses.length - i, guess))}
				</ScrollView> */}
			</View>
		</View>
	)
}

export default GameScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center'
	},
	buttonContainer: (deviceHeight) => ({
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: deviceHeight > 600 ? 20 : 10,
		width: 300,
		maxWidth: '90%'
	}),
	controls: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '80%',
		alignItems: 'center'
	},
	list: {
		flexGrow: 1,
		// alignItems: 'center',
		justifyContent: 'flex-end',
	},
	listItem: {
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'space-between',
		// width: '60%',
	}
});
