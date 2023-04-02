/** @jsxImportSource @emotion/react */
import { Container } from "./Container"


// 型定義
type Props = {
    id?: string,
    minHeight: string,
    bgColor?: string,
    children: React.ReactNode,
}
// コンポーネント定義
export const ContainerOuter = (props: Props) => {
    const { id, minHeight, bgColor, children } = props
    const size = {
        height: "fit-content",
        minHeight,
        width: "100%",
    }
    return (
        <Container
            id={id}
            size={size}
            bgColor={bgColor}
            justifyContent="flex-start"
            flexDirection="column"
            padding="0 0 20px 0">
            {children}
        </Container>
    )
}