/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react"

import { ContainerOuter } from "./ContainerOuter"
import { ContainerInner } from "./ContainerInner"
import { AreaTitle } from "./AreaTitle"
import { AreaInput } from "./AreaInput"
import { AreaButton } from "./AreaButton"
import { WebApiCall } from "../models/WebApiCall"
import { CodeBlock } from "./CodeBlock"
import { CustomAccordion } from "./CustomAccordion"
import { ThreeJSRenderer } from "./ThreeJSRenderer"
import AppConfig from "../appconfig.json"


// 設定ファイルの読み込み
const appConfig = AppConfig as Record<string, unknown>
const environment = (appConfig.environment as Record<string, string>).value
const getAppConfig: Record<string, () => string> = {
  environment: () => { return environment },
  backEndApiUrl: () => {
    return (appConfig.backEndApiUrl as Record<string, string>)[environment]
  },
  initCGCode: () => {
    return (appConfig.initCGCode as Record<string, string>).value
  },
}
// 共通項目
// 色
const themeColors = ["#ff6e7f", "#bfe9ff"]
const getGradient = (): string => {
  return `linear-gradient(to right, ${themeColors[0]}, ${themeColors[1]})`
}
const borderColor = "#0ED2F7"
const bgColor = "#f8f8f8"
const shadowColor = "#cccccc"
const buttonWidth = "40%"
// テキストボックス
const textBox = {
  borderColor,
  bgColor,
  shadowColor,
}
// ボタン
const sendButton = {
  text: "送信",
  width: buttonWidth,
  bgColor: getGradient(),
  onClick: async () => { },
}
const resetButton = {
  text: "リセット",
  width: buttonWidth,
  borderColor,
  onClick: () => { },
}
// javascriptの表示領域
const codeBlock = {
  font: { color: "inherit", size: "13px" },
  box: {
    width: "100%",
    bgColor,
    borderColor: "transparent",
    shadowColor,
  },
}
// 表示用ソースコードを格納するアコーディオン
const accordion = {
  font: { color: borderColor, size: "16px" },
  box: {
    width: "100%",
    bgColor: "#ffffff",
    borderColor,
    shadowColor,
  },
}
// Three.jsの表示領域のサイズを計算する
const calcRendererSize = (windowWidth: number): number => {
  return (windowWidth < 1200 ? windowWidth * 0.95 : 1200) - 15 - 15
}
// テキストボックスの文字数制限
const maxLength = {
  input: 50,
  textArea: 300,
}
// コンポーネント定義
export const App = () => {
  // stateの定義
  // ブラウザのサイズ
  const [windiwSize, setWindowSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })
  // テキストボックスの値
  const [inputValue, setInputValue] = useState("")
  const [textAreaValue, setTextAreaValue] = useState("")
  // ローディング中はtrue
  const [isLoading, setIsLoading] = useState(false)
  // APIから取得したjavascriptのソースコード
  const [sourceCode, setSourceCode] = useState({
    display: "",
    execution: getAppConfig.initCGCode()
  })
  // Three.jsの表示領域
  const [renderer, setRenderer] = useState({
    box: {
      height: calcRendererSize(windiwSize.width),
      width: calcRendererSize(windiwSize.width),
      bgColor: "#434343",
      borderColor,
      shadowColor,
    },
  })
  const [userId, setUserId] = useState("")

  // イベントの定義
  // リサイズ時の処理
  const handleResize = () => {
    // ブラウザのサイズをstateに反映
    setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth,
    })
    // Three.jsの表示領域のサイズをstateに反映
    setRenderer({
      box: {
        height: calcRendererSize(window.innerWidth),
        width: calcRendererSize(window.innerWidth),
        bgColor: "#434343",
        borderColor,
        shadowColor,
      },
    })
  }
  // テキストボックスの値をstateに反映
  const handleInputValueChange = (value: string) => {
    setInputValue(value)
  }
  const handleTextAreaValueChange = (value: string) => {
    setTextAreaValue(value)
  }

  // 送信ボタンのイベント
  sendButton.onClick = async () => {
    // APIに最初のメッセージを送信
    try {
      let webApiCall = new WebApiCall("")

      // テキストボックスの値が空の場合は処理を中断
      if (!inputValue && !textAreaValue) {
        alert("テキストボックスに値を入力してください")
        return
      }
      // 文字数制限を超えている場合は処理を中断
      else if (inputValue.length > maxLength.input) {
        alert(`テキストボックスの文字数は${maxLength.input}文字以内にしてください`)
        return
      }
      else if (textAreaValue.length > maxLength.textArea) {
        alert(`テキストエリアの文字数は${maxLength.textArea}文字以内にしてください`)
        return
      }
      setIsLoading(true)

      if (!userId) {
        // ユーザーIDがない場合は最初のメッセージを送信
        webApiCall = new WebApiCall(
          `${getAppConfig.backEndApiUrl()}/sendFirstMessage`
        )
        // テキストボックスの値をpayloadに設定
        webApiCall.setFormData([
          { name: "content", value: inputValue }
        ])
      }
      else {
        // ユーザーIDがある場合は追加のメッセージを送信
        webApiCall = new WebApiCall(
          `${getAppConfig.backEndApiUrl()}/sendMessage`
        )
        // テキストボックスの値をpayloadに設定
        webApiCall.setFormData([
          { name: "userId", value: userId },
          { name: "content", value: textAreaValue }
        ])
      }
      // POSTメソッドでAPIを呼び出し
      await webApiCall.callApiPost()
      // javascriptのソースコードをstateに反映
      setSourceCode({
        display: (
          // 2023.12.24 バージョンアップ（@0.132.0 → @0.160.0）
          `// バージョンr160のThree.jsを使用\n` +
          (webApiCall.responseData.content as string)
        ),
        execution: webApiCall.responseData.sourceCode as string,
      })
      // ユーザーIDをstateに反映
      setUserId(webApiCall.responseData.userId as string)
      // テキストボックスの値をリセット
      setInputValue("")
      setTextAreaValue("")
    }
    catch (error) {
      console.log(error)
      alert("エラーが発生しました。")
    }
    finally {
      setIsLoading(false)
    }
  }
  // リセットボタンのイベント
  resetButton.onClick = () => {
    setInputValue("")
    setTextAreaValue("")
    setSourceCode({ display: "", execution: "" })
    setUserId("")
  }
  // マウント時に実行
  useEffect(() => {
    // ブラウザのサイズを取得（リサイズ時）
    window.addEventListener("resize", handleResize)

    // アンマウント時に実行（リソースの解放）
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <ContainerOuter
      id="containerOuter"
      minHeight={`${windiwSize.height}px`}
      bgColor={getGradient()}>
      <AreaTitle
        id="areaTitle"
        text="AI Creator for 3DCG"
      />
      <ContainerInner
        id="containerInner">
        {!userId && (
          <AreaInput
            id="areaInputFirst"
            description={
              !isLoading ?
                "何を創りますか？" :
                "CGを作成中です。しばらくお待ち下さい..."
            }
            textBox={{ ...textBox, width: "60%", }}
            placeholder={`（例）森林（${maxLength.input}文字以内）`}
            afterText="のCGを創る"
            maxLength={maxLength.input}
            value={inputValue}
            onChange={handleInputValueChange}
          />
        )}
        {userId && (
          <AreaInput
            id="areaInputSecond"
            description={
              !isLoading ?
                "どのようにカスタマイズしますか？" :
                "カスタマイズ中です。しばらくお待ち下さい..."
            }
            textBox={{ ...textBox, width: "100%", }}
            placeholder={
              "（例）\n" +
              "・〇〇のサイズを2倍にしてください。\n" +
              "・〇〇の色をカラフルにしてください。\n" +
              `（${maxLength.textArea}文字以内）`
            }
            multiline={true}
            rowCount={4}
            maxLength={maxLength.textArea}
            value={textAreaValue}
            onChange={handleTextAreaValueChange}
          />
        )}
        <AreaButton
          id="areaButton"
          leftButton={sendButton}
          rightButton={resetButton}
          margin="20px 0 0 0"
          isLoading={isLoading}
        />
        {sourceCode.execution && (
          <ThreeJSRenderer
            id="threeJSRenderer"
            box={renderer.box}
            sourceCode={sourceCode.execution}
            margin="20px 0 0 0"
          />
        )}
        {sourceCode.display && (
          <CustomAccordion
            id="customAccordion"
            title="javascriptの表示"
            box={accordion.box}
            font={accordion.font}
            margin="20px 0 0 0"
          >
            <CodeBlock
              id="codeBlock"
              sourceCode={sourceCode.display}
              font={codeBlock.font}
              box={codeBlock.box}
            />
          </CustomAccordion>
        )}
      </ContainerInner>
    </ContainerOuter>
  )
}
