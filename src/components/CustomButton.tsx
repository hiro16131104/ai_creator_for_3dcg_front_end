/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react"

import { Utility } from "../models/Utility"


// 型定義
type Box = {
    height: string,
    width: string,
    bgColor: string,
    shadowColor?: string,
    borderColor?: string,
    borderRadius?: string,
}
type Font = {
    size?: string,
    weight?: number,
    color: string,
    shadowColor?: string,
}
type Props = {
    id?: string,
    text: string,
    box: Box,
    font: Font,
    onClick: () => void,
    isLoading?: boolean,
    margin?: string,
}
// スタイル定義
const boxStyle = (box: Box) => {
    const { height, width, bgColor, shadowColor, borderColor, borderRadius } = box
    // 数値と単位に分ける
    const boxHeight = Utility.splitNumberAndUnit(height)
    const boxWidth = Utility.splitNumberAndUnit(width)
    const borderWidth = { num: borderColor ? 1 : 0, unit: "px" }
    const borderStyle = { normal: "none", disabled: "none" }

    if (borderColor) {
        borderStyle.normal = `${borderWidth.num}${borderWidth.unit} solid ${borderColor}`
        borderStyle.disabled = `${borderWidth.num}${borderWidth.unit} solid #dddddd`
    }
    // widthとheightからborder分を引く
    boxHeight.num -= borderWidth.num * 2
    boxWidth.num -= borderWidth.num * 2

    return css`
        height: ${boxHeight.num}${boxHeight.unit};
        width: ${boxWidth.num}${boxWidth.unit};
        background: ${bgColor};
        box-shadow: 0 2px 4px ${shadowColor ? shadowColor : "#666666"};
        border: ${borderStyle.normal};
        border-radius: ${borderRadius ? borderRadius : "7px"};
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &:disabled {
            background: #dddddd;
            border: ${borderStyle.disabled};
            cursor: default;
        }
    `
}
const fontStyle = (font: Font) => {
    const { size, weight, color, shadowColor } = font

    return css`
        font-size: ${size ? size : "16px"};
        font-weight: ${weight ? weight : 300};
        color: ${color};
        text-shadow: 1px 1px 2px ${shadowColor ? shadowColor : "#666666"};
    `
}
const spinnerStyle = (font: Font) => {
    // font.sizeがある場合、数値と単位に分ける
    const { num, unit } = Utility.splitNumberAndUnit(font.size ? font.size : "16px")
    // keyframes定義
    const spin = keyframes`
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    `
    return css`
        border: 3px solid #f3f3f3;
        border-top-color: #ffffff;
        border-radius: 50%;
        height: ${num * 1.3}${unit};
        width: ${num * 1.3}${unit};
        animation: ${spin} 1s linear infinite;
    `
}
const marginStyle = (margin?: string) => {
    return css`
        margin: ${margin ? margin : "0"};
    `
}
// コンポーネント定義
export const CustomButton = (props: Props) => {
    const { id, text, box, font, onClick, isLoading, margin } = props

    return (
        <button
            id={id}
            css={[boxStyle(box), marginStyle(margin)]}
            onClick={onClick}
            disabled={isLoading}>
            {isLoading ? (
                <div css={spinnerStyle(font)}></div>
            ) : (
                <span css={fontStyle(font)}>{text}</span>
            )}
        </button>
    )
}
