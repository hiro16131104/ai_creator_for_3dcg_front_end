export class Utility {
    // 数値と単位に分割する
    static splitNumberAndUnit(value: string): { num: number, unit: string } {
        const num = parseFloat(value)
        const unit = value.replace(num.toString(), "")
        return { num, unit }
    }
}