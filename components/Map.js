import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectDestination, selectOrigin, setTravelTimeInFromat } from "../slices/navSlice";
import { SUPER_SECRET_KEY } from "@env";

const Map = () => {
	const origin = useSelector(selectOrigin);
	const destination = useSelector(selectDestination);
	const mapRef = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!origin || !destination) return;

		mapRef.current.fitToSuppliedMarkers(["origin", "destination"], { edgePadding: { top: 50, right: 50, bottom: 50, left: 50 } });
	}, [origin, destination]);

	useEffect(() => {
		if (!origin || !destination) return;
		const getTravelTime = async () => {
			const originCoord = Object.values(origin.location).join(",");
			const destinationCoord = Object.values(destination.location).join(",");
			const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originCoord}&destinations=${destinationCoord}&key=${SUPER_SECRET_KEY}`;

			fetch(URL)
				.then((res) => res.json())
				.then((data) => {
					dispatch(setTravelTimeInFromat(data.rows[0].elements[0]));
				});
		};

		getTravelTime();
	}, [origin, destination, SUPER_SECRET_KEY]);

	return (
		<MapView
			ref={mapRef}
			style={tw`flex-1`}
			initialRegion={{
				longitude: origin?.location.lng,
				latitude: origin?.location.lat,
				longitudeDelta: 0.005,
				latitudeDelta: 0.005,
			}}
		>
			{origin && destination && (
				<MapViewDirections
					origin={{ latitude: origin.location.lat, longitude: origin.location.lng }}
					destination={{ latitude: destination.location.lat, longitude: destination.location.lng }}
					apikey={SUPER_SECRET_KEY}
					strokeColor="black"
					strokeWidth={3}
					lineDashPattern={[0]}
				/>
			)}

			{origin?.location && (
				<Marker
					coordinate={{ latitude: origin.location.lat, longitude: origin.location.lng }}
					title="Origin"
					description={origin.description}
					identifier="origin"
				/>
			)}
			{destination?.location && (
				<Marker
					coordinate={{ latitude: destination.location.lat, longitude: destination.location.lng }}
					title="Destination"
					description={destination.description}
					identifier="destination"
				/>
			)}
		</MapView>
	);
};

export default Map;

const styles = StyleSheet.create({});