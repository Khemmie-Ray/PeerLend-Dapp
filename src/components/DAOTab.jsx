import { Tabs, Box, Text } from "@radix-ui/themes"

const DAOTab = () => {
  return (
    <Tabs.Root defaultValue="account">
  <Tabs.List>
    <Tabs.Trigger value="account">Active</Tabs.Trigger>
    <Tabs.Trigger value="documents">Ended</Tabs.Trigger>
  </Tabs.List>

  <Box pt="3">
    <Tabs.Content value="account">
      <Text size="2">Make changes to your account.</Text>
    </Tabs.Content>

    <Tabs.Content value="documents">
      <Text size="2">Access and update your documents.</Text>
    </Tabs.Content>
  </Box>
</Tabs.Root>
  )
}

export default DAOTab