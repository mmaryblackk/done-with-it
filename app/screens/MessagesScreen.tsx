import React, { useState } from "react";
import { FlatList, ImageSourcePropType } from "react-native";

import SafeScreen from "../components/SafeScreen";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";

interface IMessage {
  id: number;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

const initialMessages: IMessage[] = [
  {
    id: 1,
    title: "Lorem ipsum.",
    description: "Lorem ipsum",
    image: require("../assets/Maryna.jpg"),
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ipsa assumenda vitae dignissimos omnis nam sapiente corrupti quas commodi praesentium.",
    image: require("../assets/Maryna.jpg"),
  },
  {
    id: 3,
    title: "Quick brown fox.",
    description: "The quick brown fox jumps over the lazy dog.",
    image: require("../assets/Maryna.jpg"),
  },
  {
    id: 4,
    title: "React Native tips.",
    description: "Build cross-platform apps with a single codebase.",
    image: require("../assets/Maryna.jpg"),
  },
  {
    id: 5,
    title: "Exploring Expo.",
    description:
      "Expo makes it easier to start a React Native project without worrying about native build configuration.",
    image: require("../assets/Maryna.jpg"),
  },
  {
    id: 6,
    title: "A day in the life.",
    description:
      "Morning coffee, a good playlist, and lines of code flowing until sunset.",
    image: require("../assets/Maryna.jpg"),
  },
  {
    id: 7,
    title: "Minimalism in UI.",
    description:
      "Less is more — clean interfaces improve user focus and experience.",
    image: require("../assets/Maryna.jpg"),
  },
  {
    id: 8,
    title: "Debugging journey.",
    description:
      "Some bugs are stubborn. Some bugs are just typos. Either way, debugging is a skill worth mastering.",
    image: require("../assets/Maryna.jpg"),
  },
  {
    id: 9,
    title: "TypeScript love.",
    description:
      "Once you go TypeScript, you rarely go back — type safety is addictive.",
    image: require("../assets/Maryna.jpg"),
  },
  {
    id: 10,
    title: "Design patterns.",
    description:
      "Patterns like MVC, MVVM, and Observer can help structure your code for scalability.",
    image: require("../assets/Maryna.jpg"),
  },
  {
    id: 11,
    title: "Performance tweaks.",
    description:
      "Memoization, PureComponent, and avoiding unnecessary re-renders can greatly improve performance.",
    image: require("../assets/Maryna.jpg"),
  },
  {
    id: 12,
    title: "Future of mobile dev.",
    description:
      "With advances in tooling and frameworks, the line between native and cross-platform apps is blurring.",
    image: require("../assets/Maryna.jpg"),
  },
];

function MessagesScreen() {
  const [messages, setMessages] = useState<IMessage[]>(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message: IMessage) => {
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <SafeScreen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => {}}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => setMessages(initialMessages)}
      />
    </SafeScreen>
  );
}

export default MessagesScreen;
