/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect } from "react"
import { highlightElement } from "prismjs"
import "prismjs/themes/prism.css"
import "prismjs/components/prism-javascript"


// 型定義
type Font = {
    color: string,
    size: string,
}
type Box = {
    width: string,
    bgColor: string,
    borderColor: string,
    shadowColor?: string,
}
type Props = {
    id: string,
    sourceCode: string,
    font: Font,
    box: Box,
    margin?: string,
}
// スタイル定義
const preStyle = (box: Box) => {
    const { width, borderColor, shadowColor } = box

    return css`
        width: ${width};
        padding: 10px;
        border: 1px solid ${borderColor};
        box-shadow: ${shadowColor ? `0 2px 4px ${shadowColor}` : "none"};
        overflow: auto;
        &:focus {
            outline: none;
        }
    `
}
const overrideStyle = (font: Font, box: Box, margin?: string) => {
    return css`
        background: ${box.bgColor} !important;
        color: ${font.color} !important;
        font-size: ${font.size} !important;
        margin: ${margin ?? "0"} !important;
    `
}
// コンポーネント定義
export const CodeBlock = (props: Props) => {
    const { id, sourceCode, font, box, margin } = props

    // マウント時に実行
    useEffect(() => {
        const preElem = document.querySelector(`#${id}`)

        // pre要素が取得できない場合はエラーを発生させる
        if (!preElem) {
            throw new Error("javascriptのコードを表示する際にエラーが発生しました。")
        }
        preElem.textContent = sourceCode
        // 表示するソースコードに色を付ける
        highlightElement(preElem)
    }, [box.width, sourceCode])

    return (
        <pre
            id={id}
            className="language-javascript"
            css={[preStyle(box), overrideStyle(font, box, margin)]}>
            <code>
                {sourceCode}
            </code>
        </pre>
    )
}
