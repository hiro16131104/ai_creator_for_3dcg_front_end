/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect } from "react"


// 型定義
type Box = {
    height: number,
    width: number,
    bgColor: string,
    borderColor: string,
    shadowColor?: string,
}
type Props = {
    id: string,
    box: Box,
    sourceCode: string,
    margin?: string,
}
// スタイル定義
const divStyle = (box: Box, margin?: string) => {
    const { height, width, borderColor, shadowColor } = box

    return css`
        width: ${width}px;
        height: ${height}px;
        border: 1px solid ${borderColor};
        border-radius: 7px;
        box-shadow: ${shadowColor ? `0 2px 4px ${shadowColor}` : "none"};
        position: relative;
        overflow: auto;
        margin: ${margin ?? "0"};
    `
}
// コンポーネント定義
export const ThreeJSRenderer = (props: Props) => {
    const { id, box, sourceCode, margin } = props
    const IMPORT_STATEMENTS = [
        "import * as THREE from 'three';",
    ]
    // ソースコードを一部置換する
    const replaceSourceCode = (sourceCode: string) => {
        const codeRenderer = [
            `const renderer = new THREE.WebGLRenderer();`,
            `renderer.setClearColor("${box.bgColor}");`
        ]
        // import文を削除する
        let result = (
            sourceCode
                .split(";")
                .filter((str) => !str.startsWith("import"))
                .join(";")
        )

        // 高さと横幅は、borderの分を引く
        // rendererに背景色を設定する
        result = (
            result
                .replace(/window.innerHeight/g, (box.height - 2).toString())
                .replace(/window.innerWidth/g, (box.width - 2).toString())
                .replace(/document.body/g, `document.querySelector("#${id}")`)
                .replace(codeRenderer[0], codeRenderer.join(" "))
        )
        return result
    }
    // マウント時に実行
    useEffect(() => {
        const divElem = document.querySelector(`#${id}`)
        const scriptThreeJS = document.createElement("script")
        const scriptRemoveSecondCanvas = document.createElement("script")
        const errorMsg = "3DCGを描画する際にエラーが発生しました。"

        // div要素が取得できない場合はエラーを発生させる
        if (!divElem) {
            throw new Error(errorMsg)
        }
        // div要素に子要素が存在する場合は、一旦子要素を削除する（script、canvasなど）
        else if (divElem.childElementCount > 0) {
            divElem.innerHTML = ""
        }
        // script要素の設定
        scriptThreeJS.type = "module"
        scriptRemoveSecondCanvas.type = "module"
        // script要素にimport文を追加
        IMPORT_STATEMENTS.forEach((statement) => {
            scriptThreeJS.innerHTML += statement
        })
        scriptThreeJS.innerHTML += (
            `try { ${replaceSourceCode(sourceCode)} }` +
            `catch (error) { console.log(error); alert('${errorMsg}'); }`
        )
        scriptRemoveSecondCanvas.innerHTML = (
            // idのないcanvas要素が2つ以上存在する場合は、2つ目以降を削除する
            `const canvasList = document.querySelectorAll("canvas");` +
            `if (canvasList.length > 1) {` +
            `    canvasList.forEach((canvas, index) => {` +
            `        if (index > 0) { canvas.remove(); }` +
            `    });` +
            `}`
        )
        // div要素にscript要素を追加
        divElem.appendChild(scriptThreeJS)
        divElem.appendChild(scriptRemoveSecondCanvas)
    }, [box.height, box.width, sourceCode])

    return (
        <div id={id} css={divStyle(box, margin)}></div>
    )
}
