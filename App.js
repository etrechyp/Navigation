import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from '@expo/vector-icons'

const Logo = () => <Text>A logo</Text>;

console.log(Ionicons)

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <Button
                title="Details"
                onPress={() =>
                    navigation.navigate("Details", {
                        data: `'I'm a data`,
                        id: 2,
                    })
                }
            />
            <StatusBar style="auto" />
        </View>
    );
};

HomeScreen.navigationOptions = {
    headerTitle: <Logo />,
};

const DetailsScreen = ({ navigation }) => {
    const [cont, setCont] = useState(0);
    const increment = () => setCont(cont + 1);
    useEffect(() => {
        navigation.setParams({ increment });
    }, [cont]);
    const data = navigation.getParam("data", "default data");
    return (
        <View style={styles.container}>
            <Text>Details screen: {cont}</Text>
            <Button
                title="Back"
                onPress={() => navigation.setParams({ title: "New_User" })}
            />
            <StatusBar style="auto" />
        </View>
    );
};

DetailsScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam("title", "loading..."),
        headerRight: (
            <Button
                onPress={navigation.navigate("ThisModal")}
                title=" Add 1"
                color="#555"
            />
        ),
    };
};

const AppNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        Details: {
            screen: DetailsScreen,
        },
    },
    {
        initialRouteName: "Home",
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor}) => {
              const {routeName} = navigation.state
              let iconName
              if (routeName === "Home") {
                iconName = `information-circle${focused ? '' : '-outline'}`
              } else {
                iconName = `options`
              }

              return <Ionicons name={iconName} size={20}tintColor={tintColor} />
            },
            tabBarOptions: {
                activeTintColor:
                    navigation.state.routeName == "Home" ? "red" : "green",
                inactiveTintColor: "#ccc",
                labelStyle: {
                    fontSize: 16,
                },
                style: {
                    backgroundColor: "#fec",
                },
            },
        }),
    }
);

const RootStack = createStackNavigator(
    {
        Main: AppNavigator,
        // ThisModal: () => <Text>this is a modal</Text>
    },
    {
        mode: "modal",
        headerMode: "none",
    }
);

export default createAppContainer(RootStack);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
