import { Html, Body, Container, Text } from "@react-email/components"

function Footer() {
    return (
        <Container style={{backgroundColor: 'rgb(10,10,10)', padding: '12px', width: '100%'}}>
            <Text style={{ fontSize: "12px", color: "#888" }}>
                © {new Date().getFullYear()} Omni. All rights reserved.
            </Text>
        </Container>
    )
}

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <Html>
            <Body style={{fontFamily: "Arial, sans-serif"}}>
                <Container style={{padding: '20px'}}>
                    {children}
                </Container>
                <Footer />
            </Body>
        </Html>
    )
}