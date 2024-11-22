import React, { useState } from "react";
import { View, Text, Button, TextInput, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("Home");
  const [menu, setMenu] = useState([
    { id: "1", name: "Cold Shrimp", price: 50, course: "Staters", image: require("Christophs/assets/ColdShrimp.jpg") },
    { id: "2", name: "Chicken Biryani", price: 120, course: "Mains", image: require("Christophs/assets/ChickenBiryani.jpg") },
    { id: "3", name: "Chocolate Cake", price: 60, course: "Desserts", image: require("Christophs/assets/ChocolateCake.jpg") },
    { id: "4", name: "Banoffee Dessert", price: 140, course: "Desserts", image: require("Christophs/assets/BanoffeeDessert.jpg") },
    { id: "5", name: "Shrimp Cayenne", price: 50, course: "Staters", image: require("Christophs/assets/ShrimpCayenne.jpg") },
  ]);
  const [newItem, setNewItem] = useState({ name: "", price: "", course: "", image: "" });

  const getAveragePriceByCourse = () => {
    const courses = {};
    menu.forEach((item) => {
      if (!courses[item.course]) courses[item.course] = { total: 0, count: 0 };
      courses[item.course].total += item.price;
      courses[item.course].count++;
    });

    return Object.entries(courses).map(([course, data]) => `${course}: ${(data.total / data.count).toFixed(2)} R`);
  };

  const addMenuItem = () => {
    if (newItem.name && newItem.price && newItem.course && newItem.image) {
      setMenu([...menu, { ...newItem, id: Math.random().toString() }]);
      setNewItem({ name: "", price: "", course: "", image: "" });
      alert("Item added successfully!");
    } else {
      alert("Please fill in all fields!");
    }
  };

  const removeMenuItem = (id) => {
    setMenu(menu.filter((item) => item.id !== id));
    alert("Item removed successfully!");
  };

  const filterMenu = (course) => {
    return menu.filter((item) => item.course === course);
  };

  const renderHomeScreen = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Christoph's Restaurant</Text>
      <Image source={require("Christophs/assets/Logo.jpg")} style={styles.logo} />
      <Text style={styles.subtitle}>Menu</Text>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text>{item.name} - {item.price} R ({item.course})</Text>
            <Image source={item.image} style={styles.image} />
          </View>
        )}
      />
      <Text style={styles.subtitle}>Average Prices:</Text>
      {getAveragePriceByCourse().map((avg, index) => (
        <Text key={index}>{avg}</Text>
      ))}
      <Button title="Go to Chef Screen" onPress={() => setCurrentScreen("Chef")} />
      <Button title="Go to Filter Page" onPress={() => setCurrentScreen("Filter")} />
    </View>
  );

  const renderChefScreen = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Chef Screen</Text>
      <TextInput
        placeholder="Dish Name"
        value={newItem.name}
        onChangeText={(text) => setNewItem({ ...newItem, name: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={newItem.price}
        onChangeText={(text) => setNewItem({ ...newItem, price: parseFloat(text) || "" })}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Course (Starters, Mains, Desserts)"
        value={newItem.course}
        onChangeText={(text) => setNewItem({ ...newItem, course: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Image Path (e.g., /assets/your-image.png)"
        value={newItem.image}
        onChangeText={(text) => setNewItem({ ...newItem, image: text })}
        style={styles.input}
      />
      <Button title="Add Menu Item" onPress={addMenuItem} />
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text>{item.name}</Text>
            <Button title="Remove" onPress={() => removeMenuItem(item.id)} />
          </View>
        )}
      />
      <Button title="Back to Home" onPress={() => setCurrentScreen("Home")} />
    </View>
  );

  const renderFilterScreen = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Menu</Text>
      {["Starters", "Mains", "Desserts"].map((course) => (
        <TouchableOpacity key={course} onPress={() => alert(`Filtered Items:\n${filterMenu(course).map((item) => item.name).join("\n")}`)}>
          <Text style={styles.filterButton}>{course}</Text>
        </TouchableOpacity>
      ))}
      <Button title="Back to Home" onPress={() => setCurrentScreen("Home")} />
    </View>
  );

  return currentScreen === "Home"
    ? renderHomeScreen()
    : currentScreen === "Chef"
    ? renderChefScreen()
    : renderFilterScreen();
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f8f8" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  logo: { width: 100, height: 100, alignSelf: "center", marginBottom: 20 },
  image: { width: 50, height: 50, marginVertical: 5 },
  menuItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
  filterButton: { fontSize: 18, color: "#007bff", marginVertical: 5 },
});

export default App;
