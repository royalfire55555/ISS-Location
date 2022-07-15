import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar, Alert } from "react-native";
import axios from "axios";

export default class Meteor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meteors: {},
        };
    }

    componentDidMount() {
        this.getMeteorsLocation();
    }

    getMeteorsLocation = () => {
        axios
            .get(
                "https://api.nasa.gov/neo/rest/v1/feed?api_key=ofAzdsrP3yjqgICItsvY6lTjY91HOWSGqQ3novwP"
            )
            .then((response) => {
                this.setState({ meteors: response.data.near_earth_objects });
            })
            .catch((error) => {
                Alert.alert(error.message);
            });
    };

    render() {
        if (Object.keys(this.state.meteors).length === 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text>Loading...</Text>
                </View>
            );
        } else {
            let meteorArr = Object.keys(this.state.meteors).map(
                (meteorDate) => {
                    return this.state.meteors[meteorDate];
                }
            );

            let meteors = [].concat.apply([], meteorArr);
            meteors.forEach(function (element) {
                let diameter =
                    (element.estimated_diameter.kilometers
                        .estimated_diameter_min +
                        element.estimated_diameter.kilometers
                            .estimated_diameter_max) /
                    2;
                let threatScore =
                    (diameter /
                        element.close_approach_data[0].miss_distance
                            .kilometers) *
                    1000000000;
                element.threat_score = threatScore;
            });

            return (
                <View style={styles.container}>
                    <Text>Meteor Screen</Text>
                    <StatusBar style="auto" />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
