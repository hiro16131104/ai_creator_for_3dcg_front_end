/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

import { Container } from "./Container"


// 型定義
type TextBox = {
    width: string,
    borderColor: string,
    bgColor?: string,
    shadowColor?: string,
}
type Props = {
    id?: string,
    description: string,
    textBox: TextBox,
    placeholder: string,
    afterText?: string,
    multiline?: boolean,
    maxLength?: number,
    rowCount?: number,
    value: string,
    onChange: (value: string) => void,
}
// スタイル定義
const textBoxStyle = (textBox: TextBox) => {
    const { width, borderColor, bgColor, shadowColor } = textBox

    return css`
        width: ${width};
        text-align: start;
        padding: 8px 10px;
        font-size: 16px;
        border: 1px solid ${borderColor};
        border-radius: 7px;
        box-shadow:${shadowColor ? `0 2px 4px ${shadowColor}` : "none"};
        background: ${bgColor ? bgColor : "ffffff"};
        &:focus {
            outline: none;
        }
    `
}
const afterTextStyle = css`
    margin-left: 10px;
`
const fontRed = css`
    color: #FC5C7D;
`
// コンポーネント定義
export const AreaInput = (props: Props) => {
    const {
        id, description, textBox, placeholder, afterText,
        multiline, maxLength, rowCount, value, onChange,
    } = props
    const idTextBox = id ? `${id}TextBox` : undefined
    // テキストボックスの値を変更
    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        // テキストボックスの値でstateを更新
        onChange(event.target.value)
    }
    return (
        <Container
            id={id}
            size={{
                height: "fit-content",
                width: "100%",
            }}
            flexDirection="column">
            {description.includes("...") && (
                <span css={fontRed}>{description}</span>
            )}
            {!description.includes("...") && (
                <p>{description}</p>
            )}
            <Container
                size={{
                    height: "fit-content",
                    width: "100%",
                }}
                margin="10px 0 0 0">
                {multiline ? (
                    <textarea
                        id={idTextBox}
                        css={textBoxStyle(textBox)}
                        rows={rowCount ? rowCount : 2}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        value={value}
                        onChange={handleChange} />
                ) : (
                    <input
                        id={idTextBox}
                        css={textBoxStyle(textBox)}
                        type="text"
                        placeholder={placeholder}
                        maxLength={maxLength}
                        value={value}
                        onChange={handleChange} />
                )}
                {afterText && (
                    <p css={afterTextStyle}>
                        {afterText}
                    </p>
                )}
            </Container>
        </Container>
    )
}