import { Aside, Text } from "@mantine/core";
import React from "react";

export default function AsideBar() {
  return (
    <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      <Text>Application sidebar</Text>
    </Aside>
  );
}
