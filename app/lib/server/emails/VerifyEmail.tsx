import { Html, Body, Container, Text, Button } from "@react-email/components"
import Layout from "./components/layout"

interface Props {
    displayName: string;
    verifyURL: string
}

export default function VerifyEmail({displayName, verifyURL}: Props) {
    return (
        <Html>
            <Body>
                <Layout>
                    <Container>
                        <Text>Hello {displayName},</Text>
                        <Text>This email address has been linked to an Omni account. To verify this was you, please click the button below to complete the process.</Text>
                        <Button href={verifyURL}>Verify Email</Button>
                        <Text>If this was not you, please ignore this email. We apologise for any inconvenience.</Text>
                    </Container>
                </Layout>
            </Body>
        </Html>
    )
}