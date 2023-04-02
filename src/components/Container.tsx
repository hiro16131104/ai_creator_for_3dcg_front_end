/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react"


// 型定義
type Size = {
    height: string,
    minHeight?: string,
    width: string,
    maxWidth?: string,
}
type Props = {
    id?: string,
    children: React.ReactNode,
    size: Size,
    bgColor?: string,
    justifyContent?: string,
    alignItem?: string,
    flexDirection?: string,
    borderRadius?: string,
    padding?: string,
    margin?: string,
}
// スタイル定義
const containerStyle = (
    size: Size,
    bgColor?: string,
    justifyContent?: string,
    alignItem?: string,
    flexDirection?: string,
    borderRadius?: string,
    padding?: string,
    margin?: string,
) => {
    const fadeIn = keyframes`
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    `
    return css`
        margin-left: auto;
        margin-right: auto;
        position: relative;
        display: flex;
        flex-direction: ${flexDirection ? flexDirection : "row"};
        justify-content: ${justifyContent ? justifyContent : "center"};
        align-items: ${alignItem ? alignItem : "center"};
        min-height: ${size.minHeight ? size.minHeight : "none"};
        height: ${size.height};
        max-width: ${size.maxWidth ? size.maxWidth : "none"};
        width: ${size.width};
        background: ${bgColor ? bgColor : "transparent"};
        border-radius: ${borderRadius ? borderRadius : "0"};
        animation: ${fadeIn} 2s ease 0s 1 normal backwards;
        padding: ${padding ? padding : "0"};
        margin: ${margin ? margin : "0"};
    `
}
// コンポーネント定義
export const Container = (props: Props) => {
    const {
        id, children, size, bgColor, justifyContent,
        alignItem, flexDirection, borderRadius, padding, margin
    } = props
    return (
        <div
            id={id}
            css={containerStyle(
                size, bgColor, justifyContent, alignItem,
                flexDirection, borderRadius, padding, margin
            )}>
            {children}
        </div>
    )
}
