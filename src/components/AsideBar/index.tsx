import { Aside, SimpleGrid, Text } from "@mantine/core";
import React from "react";
import { useActions } from "../../contexts/ActionsContext";
import { useNlu } from "../../contexts/NluContext";

export default function AsideBar() {
  const { actions } = useActions();
  const { nlu } = useNlu();

  return (
    <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      <SimpleGrid
        cols={1}
        sx={(theme) => ({
          height: "100%",
          overflowY: "auto",
        })}
      >
        <div>
          <div>
            <Text size="xl" weight={500}>
              Custom Actions
            </Text>
            {actions?.customActions.map((action) => action.name)}
          </div>
          <div>
            <Text size="xl" weight={500}>
              Responses
            </Text>
            {actions?.reponses.map((action) => action.name)}
          </div>
        </div>
        <div className="border-t-2 pt-2">
          <div>
            <Text size="xl" weight={500}>
              Intents
            </Text>
            {nlu?.intents.map((intent) => (
              <div>{intent.name}</div>
            ))}
          </div>
        </div>
      </SimpleGrid>
    </Aside>
  );
}
