import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

const StarRating = ({ onRate } : any) => {
  const [rating, setRating] = useState(0);

  const handlePress = (value :any) => {
    setRating(value);
    onRate(value); // send rating to parent
  };

  return (
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((item) => (
        <TouchableOpacity
          key={item}
          onPress={() => handlePress(item)}
        >
          <MaterialIcons
            name={
              item <= rating
                ? "star"
                : "star-border"
            }
            size={28}
            color="#FFD700"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default StarRating;