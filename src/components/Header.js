import React from "react";

import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";

const Header = props => {
  const {
    navigationState,
    navigation,
    activeTintColor,
    inactiveTintColor
  } = props;
  const activeTabIndex = navigation.state.index;

  return (
    <View style={styles.containerHeader}>
      <View style={styles.textContainer}>
        <Text style={styles.textWhite}>Holi</Text>
        <Text style={styles.textWhite}>1,004 tweets</Text>
      </View>
      <View style={styles.tabContainer}>
        {navigationState.routes.map((route, index) => {
          const isRouteActive = index === activeTabIndex;
          const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

          return (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate(route.routeName)}
              key={route.routeName}
            >
              <View>
                <Text
                  style={{
                    fontSize: 17,
                    textTransform: "uppercase",
                    color: `${tintColor}`,
                    fontWeight: `${isRouteActive ? "bold" : "normal"}`
                  }}
                >
                  {route.routeName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "cyan",
    height: 150
  },
  textContainer: {
    marginVertical: 30,
    paddingTop: 30
  },
  textWhite: {
    color: "black"
  },
  tabContainer: {
    backgroundColor: "white",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
    height: 40
  }
});
export default Header;
