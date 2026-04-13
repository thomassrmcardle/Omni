import { Html, Body, Container, Text, Button } from "@react-email/components"
import Layout from "./components/layout"

interface Props {
    displayName: string;
    URL: string
}

export function VerifyEmail({displayName, URL}: Props) {
    return (
        <Layout>
            <Container>
                <Text>Hello {displayName},</Text>
                <Text>This email address has been linked to an Omni account. To verify this was you, please click the button below to complete the process.</Text>
                <Button href={URL}>Verify Email</Button>
                <Text>If this was not you, please ignore this email. We apologise for any inconvenience.</Text>
            </Container>
        </Layout>
    )
}