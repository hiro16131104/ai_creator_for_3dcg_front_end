/** @jsxImportSource @emotion/react */
import { Container } from "./Container"
import { CustomButton } from "./CustomButton"


// 型定義
type Button = {
    text: string,
    width: string,
    onClick: () => void,
}
type Props = {
    id?: string,
    leftButton: Button & { bgColor: string },
    rightButton: Button & { borderColor: string },
    isLoading?: boolean,
    margin?: string,
}
// コンポーネント定義
export const AreaButton = (props: Props) => {
    const { id, leftButton, rightButton, isLoading, margin } = props
    const buttonHeight = "42px"
    const fontWeight = 600
    const button = {
        left: {
            box: {
                height: buttonHeight,
                width: leftButton.width,
                bgColor: leftButton.bgColor,
                shadowColor: "#333333",
            },
            font: {
                color: "#ffffff",
                weight: fontWeight,
            },
        },
        right: {
            box: {
                height: buttonHeight,
                width: rightButton.width,
                bgColor: "#ffffff",
                borderColor: rightButton.borderColor,
                shadowColor: "#777777",
            },
            font: {
                color: rightButton.borderColor,
                weight: fontWeight,
                shadowColor: "transparent",
            }
        }
    }

    return (
        <Container
            id={id}
            size={{
                height: "fit-content",
                width: "100%",
            }}
            margin={margin}>
            <CustomButton
                id={id ? `${id}LeftButton` : undefined}
                text={leftButton.text}
                box={button.left.box}
                font={button.left.font}
                onClick={leftButton.onClick}
                isLoading={isLoading}
            />
            <CustomButton
                id={id ? `${id}RightButton` : undefined}
                text={rightButton.text}
                box={button.right.box}
                font={button.right.font}
                onClick={rightButton.onClick}
                margin="0 0 0 24px"
                isLoading={isLoading}
            />
        </Container>
    )
}

