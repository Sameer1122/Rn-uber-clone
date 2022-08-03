import React, { useRef } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import tw from "tailwind-react-native-classnames";
import { SUPER_SECRET_KEY } from "@env";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/core";
import { useDispatch } from "react-redux";
import NavFavorite from "./Favourite";
import { Icon } from "react-native-elements";

const NavigateCard = () => {
	const inputRef = useRef(null);
	const dispatch = useDispatch();
	const navigation = useNavigation();
	return (
		<SafeAreaView style={tw`bg-white flex-grow`}>
			<Text style={tw`text-center py-5 text-xl`}>Good Morning, Amirrul</Text>
			<View style={tw`border-t border-gray-200 flex-grow`}>
				<GooglePlacesAutocomplete
					placeholder="Where To?"
					ref={inputRef}
					styles={{
						container: { flex: 0, paddingTop: 20, backgroundColor: "white" },
						textInput: { fontSize: 18, borderRadius: 0, backgroundColor: "#DDDDDF" },
						textInputContainer: { paddingHorizontal: 20, paddingBottom: 0 },
					}}
					query={{ key: SUPER_SECRET_KEY, language: "en", components: "country:pk" }}
					nearbyPlacesAPI="GooglePlacesSearch"
					debounce={400}
					minLength={2}
					enablePoweredByContainer={false}
					fetchDetails={true}
					returnKeyType={"search"}
					onPress={(data, details = null) => {
						dispatch(setDestination({ location: details.geometry.location, description: data.description }));
						navigation.navigate("RideOptionsCard");
					}}
				/>
				<NavFavorite
					onPress={({ description, location }) => {
						dispatch(setDestination({ location, description }));
						inputRef.current.setAddressText(description);
						navigation.navigate("RideOptionsCard");
					}}
				/>
				<View style={tw`flex-row justify-evenly py-2 border-t border-gray-100`}>
					<TouchableOpacity
						style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
						onPress={() => {
							navigation.navigate("RideOptionsCard");
						}}
					>
						<Icon name="car" type="font-awesome" color="white" size={16} />
						<Text style={tw`text-white text-center`}>Rides</Text>
					</TouchableOpacity>
					<TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
						<Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
						<Text style={tw`text-center`}>Eats</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default NavigateCard;

const styles = StyleSheet.create({});