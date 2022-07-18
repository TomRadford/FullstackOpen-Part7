import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import HeaderContent from './HeaderContent'
import NavigationContent from './NavigationContent'
import Notification from './Notification'

import {
    AppShell,
    Navbar,
    Header,
    Footer,
    Title,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
    Container,
} from '@mantine/core'

const Layout = () => {
    const theme = useMantineTheme()
    const [opened, setOpened] = useState(false)
    const user = useSelector(({ user }) => user)
    return (
        <AppShell
            styles={{
                main: {
                    background:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            fixed
            navbar={
                user && (
                    <Navbar
                        p="md"
                        hiddenBreakpoint="sm"
                        hidden={!opened}
                        width={{ sm: 200, lg: 300 }}
                    >
                        <NavigationContent />
                    </Navbar>
                )
            }
            footer={
                <Footer height={60} p="md">
                    <Text align="right">
                        Made by&nbsp;
                        <Text
                            variant="link"
                            component="a"
                            href="https://github.com/TomRadford"
                        >
                            Tom Radford
                        </Text>
                        ✨
                    </Text>
                </Footer>
            }
            header={
                <Header height={70} p="md">
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'centre',
                            justifyContent: 'space-between',
                        }}
                    >
                        <MediaQuery
                            largerThan="sm"
                            styles={{ display: 'none' }}
                        >
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>
                        <HeaderContent />
                    </div>
                </Header>
            }
        >
            <Container size="xs" px="xs">
                <Notification />
                <Outlet />
            </Container>
        </AppShell>
    )
}

export default Layout
