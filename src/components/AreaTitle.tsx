/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { Container } from "./Container"


// 型定義
type Props = {
    id?: string,
    text: string,
    fontColor?: string,
    shadowColor?: string,
}
// スタイル定義
const titleStyle = (fontColor?: string, shadowColor?: string) => {
    return css`
        font-size: 24px;
        font-weight: 300;
        color: ${fontColor ? fontColor : "#ffffff"};
        text-shadow: 0 0 16px ${shadowColor ? shadowColor : "#666666"};
        margin: 10px 0 10px 0;
        letter-spacing: 2px;
    `
}
// コンポーネント定義
export const AreaTitle = (props: Props) => {
    const { id, text, fontColor, shadowColor } = props
    const size = {
        height: "fit-content",
        width: "100%",
    }
    return (
        <Container
            id={id}
            size={size}>
            <h1 css={titleStyle(fontColor, shadowColor)}>
                {text}
            </h1>
        </Container>
    )
}