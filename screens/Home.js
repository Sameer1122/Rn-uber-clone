import React, { useRef } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SUPER_SECRET_KEY } from "@env";
import { setDestination, setOrigin } from "../slices/navSlice";
import { useDispatch } from "react-redux";
import NavFavorite from "../components/Favourite";

const HomeScreen = () => {
	const inputRef = useRef(null);
	const dispatch = useDispatch();

	return (
		<SafeAreaView style={tw`bg-white h-full`}>
			<View style={tw`p-5`}>
				<Image
					style={{
						width: 100,
						height: 100,
						resizeMode: "contain",
					}}
					source={{
						uri: "https://links.papareact.com/gzs",
					}}
				/>
				<GooglePlacesAutocomplete
					placeholder="Where From?"
					ref={inputRef}
					styles={{ container: { flex: 0 }, textInput: { fontSize: 18 } }}
					query={{ key: SUPER_SECRET_KEY, language: "en", components: "country:pk" }}
					nearbyPlacesAPI="GooglePlacesSearch"
					debounce={400}
					minLength={2}
					enablePoweredByContainer={false}
					fetchDetails={true}
					returnKeyType={"search"}
					onPress={(data, details = null) => {
						dispatch(setOrigin({ location: details.geometry.location, description: data.description }));
						dispatch(setDestination(null));
					}}
				/>
				<NavOptions />
				<NavFavorite
					onPress={({ description, location }) => {
						dispatch(setOrigin({ location, description }));
						dispatch(setDestination(null));
						inputRef.current.setAddressText(description);
					}}
				/>
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});