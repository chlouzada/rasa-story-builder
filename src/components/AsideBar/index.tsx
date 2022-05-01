import { Aside, SimpleGrid, Text } from "@mantine/core";
import React, { useState } from "react";
import { useActions } from "../../contexts/ActionsContext";
import { useNlu } from "../../contexts/NluContext";

export default function AsideBar() {
  const { actions } = useActions();
  const { nlu } = useNlu();

  const [actionTab, setActionTab] = useState(0);
  const [nluTab, setNluTab] = useState(0);

  return (
    <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      <SimpleGrid
        cols={1}
        sx={(theme) => ({
          height: "100%",
          overflowY: "auto",
        })}
      >
        <div className="overflow-y-auto">
          {actionTab == 0 && (
            <div>
              <div className="grid grid-flow-col gap-2">
                <Text
                  size="xl"
                  weight={500}
                  className="shadow-md text-center rounded p-1"
                >
                  Responses
                </Text>
                <Text
                  className="cursor-pointer text-center"
                  size="xl"
                  weight={500}
                  onClick={() => {
                    setActionTab(1);
                  }}
                >
                  Custom Actions
                </Text>
              </div>
              <div className="">
                {actions?.responses?.map((action) => (
                  <div>{action.name}</div>
                ))}
              </div>
            </div>
          )}
          {actionTab == 1 && (
            <div>
              <div className="grid grid-flow-col gap-2">
                <Text
                  className="cursor-pointer text-center"
                  size="xl"
                  weight={500}
                  onClick={() => {
                    setActionTab(0);
                  }}
                >
                  Responses
                </Text>
                <Text
                  size="xl"
                  weight={500}
                  className="shadow-md text-center rounded p-1"
                >
                  Custom Actions
                </Text>
              </div>
              {actions?.customActions?.map((action) => (
                <div>{action.name}</div>
              ))}
            </div>
          )}
        </div>
        <div className="border-t-2 pt-2">
          {nluTab == 0 && (
            <div>
              <div className="grid grid-cols-3 grid-flow-col gap-2">
                <Text
                  className="shadow-md text-center rounded p-1"
                  size="xl"
                  weight={500}
                >
                  Intents
                </Text>
                <Text
                  size="xl"
                  weight={500}
                  className="cursor-pointer text-center"
                  onClick={() => {
                    setNluTab(1);
                  }}
                >
                  Lookup
                </Text>
                <Text
                  size="xl"
                  weight={500}
                  className="cursor-pointer text-center"
                  onClick={() => {
                    setNluTab(2);
                  }}
                >
                  Regex
                </Text>
              </div>
              {nlu?.intents?.map((entry) => (
                <div>{entry.name}</div>
              ))}
            </div>
          )}
          {nluTab == 1 && (
            <div>
              <div className="grid grid-cols-3 grid-flow-col gap-2">
                <Text
                  className="cursor-pointer text-center"
                  size="xl"
                  weight={500}
                  onClick={() => {
                    setNluTab(0);
                  }}
                >
                  Intents
                </Text>
                <Text
                  size="xl"
                  weight={500}
                  className="shadow-md text-center rounded p-1"
                >
                  Lookup
                </Text>
                <Text
                  size="xl"
                  weight={500}
                  className="cursor-pointer text-center"
                  onClick={() => {
                    setNluTab(2);
                  }}
                >
                  Regex
                </Text>
              </div>
              {nlu?.lookups?.map((entry) => (
                <div>{entry.name}</div>
              ))}
            </div>
          )}
          {nluTab == 2 && (
            <div>
              <div className="grid grid-cols-3 grid-flow-col gap-2">
                <Text
                  className="cursor-pointer text-center"
                  size="xl"
                  weight={500}
                  onClick={() => {
                    setNluTab(0);
                  }}
                >
                  Intents
                </Text>
                <Text
                  size="xl"
                  weight={500}
                  className="cursor-pointer text-center"
                  onClick={() => {
                    setNluTab(1);
                  }}
                >
                  Lookup
                </Text>
                <Text
                  size="xl"
                  weight={500}
                  className="shadow-md text-center rounded p-1"
                >
                  Regex
                </Text>
              </div>
              {nlu?.regexs?.map((entry) => (
                <div>{entry.name}</div>
              ))}
            </div>
          )}
        </div>
      </SimpleGrid>
    </Aside>
  );
}
