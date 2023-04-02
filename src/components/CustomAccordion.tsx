/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"


// 型定義
type Box = {
    width: string,
    bgColor: string,
    borderColor: string,
    shadowColor?: string,
}
type Font = {
    color: string,
    size: string,
}
type Props = {
    id?: string,
    title: string,
    children: React.ReactNode,
    margin?: string,
    box: Box,
    font: Font,
}
// スタイル定義
const accordionStyle = (box: Box, margin?: string) => {
    const { width, bgColor, borderColor, shadowColor } = box

    return css`
        width: ${width};
        background: ${bgColor};
        border: 1px solid ${borderColor};
        border-radius: 7px;
        box-shadow: ${shadowColor ? `0 2px 4px ${shadowColor}` : "none"};
        margin: ${margin ?? "0"} !important;
        svg {
            color: ${borderColor};
        }
    `
}
const summaryStyle = (font: Font) => {
    const { color, size } = font

    return css`
        color: ${color};
        font-size: ${size};
        &:focus {
            outline: none;
        }
    `
}
const detailsStyle = () => {
    return css`
        padding: 0;
        &:focus {
            outline: none;
        }
    `
}
// コンポーネント定義
export const CustomAccordion = (props: Props) => {
    const { id, title, children, margin, box, font } = props

    return (
        <Accordion
            id={id}
            css={accordionStyle(box, margin)}>
            <AccordionSummary id="test"
                expandIcon={<ExpandMoreIcon />}
                css={summaryStyle(font)}>
                {title}
            </AccordionSummary>
            <AccordionDetails
                css={detailsStyle}>
                {children}
            </AccordionDetails>
        </Accordion>
    )
}