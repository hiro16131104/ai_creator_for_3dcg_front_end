/** @jsxImportSource @emotion/react */
import { Container } from "./Container"


// 型定義
type Props = {
    id?: string,
    children: React.ReactNode,
}
// コンポーネント定義
export const ContainerInner = (props: Props) => {
    const { id, children } = props
    const size = {
        height: "fit-content",
        width: "95%",
        maxWidth: "1200px",
    }
    return (
        <Container
            id={id}
            size={size}
            bgColor="#ffffff"
            flexDirection="column"
            borderRadius="5px"
            padding="10px 15px 15px 15px">
            {children}
        </Container>
    )
}