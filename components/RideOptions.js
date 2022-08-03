import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectTravelTimee } from "../slices/navSlice";
import "intl";
import "intl/locale-data/jsonp/en-SG";
import SafeViewAndroid from "../util/SafeViewAndroid";

const data = [
	{
		id: "Uber-X-123",
		title: "UberX",
		multiplier: 1,
		image: "https://links.papareact.com/3pn",
	},
	{
		id: "Uber-XL-456",
		title: "Uber XL",
		multiplier: 1.2,
		image: "https://links.papareact.com/5w8",
	},
	{
		id: "Uber-LUX-789",
		title: "Uber LUX",
		multiplier: 1.75,
		image: "https://links.papareact.com/7pf",
	},
];

// If we have SURGE PRICING, this goes up
const SURGE_CHARGE_RATE = 1.5;

const RideOptions = () => {
	const navigation = useNavigation();
	const [selected, setSelected] = useState(null);
	const travelTimeInformation = useSelector(selectTravelTimee);

	return (
		<SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
			<View>
				<TouchableOpacity
					style={tw`absolute top-3 left-5 p-3 z-50 rounded-full`}
					onPress={() => {
						navigation.navigate("NavigateCard");
					}}
				>
					<Icon name="chevron-left" type="fontawesome" />
				</TouchableOpacity>
				<Text style={tw`text-center py-5 text-xl`}>Select a Ride - {travelTimeInformation?.distance?.text}</Text>
			</View>
			<View style={tw`flex-grow h-1`}>
				<FlatList
					data={data}
					keyExtractor={(item) => item.id}
					renderItem={({ item: { id, title, multiplier, image }, item }) => (
						<TouchableOpacity
							style={tw`flex-row items-center justify-between ${id === selected?.id && "bg-gray-200"}`}
							onPress={() => {
								setSelected(item);
							}}
						>
							<Image style={{ width: 100, height: 100, resizeMode: "contain" }} source={{ uri: image }} />
							<View style={tw`-ml-6`}>
								<Text style={tw`text-xl font-semibold`}>{title}</Text>
								<Text>{travelTimeInformation?.duration.text} Travel Time</Text>
							</View>
							<Text style={tw`text-xl`}>
								{new Intl.NumberFormat("en-SG", {
									style: "currency",
									currency: "sgd",
								}).format((travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier) / 100)}
							</Text>
						</TouchableOpacity>
					)}
				/>
			</View>
			<View style={tw`mt-auto border-t border-gray-200`}>
				<TouchableOpacity style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`} disabled={!selected}>
					<Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default RideOptions;

const styles = StyleSheet.create({});