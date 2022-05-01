import { Burger, Header, MediaQuery, useMantineTheme } from "@mantine/core";
import React from "react";

export default function AppBar({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: (opened: boolean) => void;
}) {
  const theme = useMantineTheme();
  return (
    <Header height={70} p="md" className="bg-primary shadow">
      <div className="flex items-center h-full text-2xl font-bold text-white">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened(!opened)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        Rasa Story Builder
      </div>
    </Header>
  );
}
