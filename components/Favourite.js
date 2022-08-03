import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

const data = [
	{
		id: "123",
		icon: "home",
		label: "Home",
		description: "Jalan Sengkurong 'B', Brunei",
		location: {
			lat: 4.8997664,
			lng: 114.8498147,
		},
	},
	{
		id: "456",
		icon: "work",
		label: "Work",
		description: "AIA, Kianggeh Road, Bandar Seri Begawan, Brunei",
		location: {
			lat: 4.890898000000001,
			lng: 114.9442796,
		},
	},
];

const NavFavorite = (props) => {
	return (
		<FlatList
			data={data}
			keyExtractor={(item) => item.id}
			ItemSeparatorComponent={() => <View style={(tw`bg-gray-200`, { height: 0.5 })} />}
			renderItem={({ item: { label, description, icon, location } }) => (
				<TouchableOpacity style={tw`flex-row items-center p-5`} onPress={() => props.onPress({ description, location })}>
					<Icon style={tw`mr-4 rounded-full bg-gray-300 p-3`} name={icon} />
					<View>
						<Text style={tw`font-semibold text-lg`}>{label}</Text>
						<Text style={tw`text-gray-500`}>{description}</Text>
					</View>
				</TouchableOpacity>
			)}
		/>
	);
};

export default NavFavorite;