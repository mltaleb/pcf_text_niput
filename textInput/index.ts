import { IInputs, IOutputs } from "./generated/ManifestTypes"

export class CustomTextInput
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  private _container: HTMLDivElement
  private _inputWrapper: HTMLDivElement
  private _input: HTMLInputElement
  private _label: HTMLLabelElement
  private _notifyOutputChanged: () => void
  private _inputType: string = "text"
  private _value: string | undefined

  // Style properties
  private _textFontSize: string = "16px"
  private _textColor: string = "#000"
  private _labelColor: string = "#888"
  private _borderColor: string = "#ccc"
  private _focusBorderColor: string = "#4b39ef"
  private _backgroundColor: string = "transparent"
  private _borderRadius: string = "8px"
  private _padding: string = "14px 16px"
  private _labelFontSize: string = "16px"

  constructor() {}

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this._container = container
    this._notifyOutputChanged = notifyOutputChanged

    this._inputType = context.parameters.inputType.raw || "text"
    const labelText = context.parameters.LabelText.raw || "Label"

    // Create wrapper div
    this._inputWrapper = document.createElement("div")
    this._inputWrapper.classList.add("custom-input-wrapper")

    // Create label
    this._label = document.createElement("label")
    this._label.textContent = labelText
    this._label.classList.add("custom-input-label")

    // Create input element
    this._input = document.createElement("input")
    this._input.type = this._inputType
    this._input.classList.add("custom-input")

    // Apply initial styles
    this.applyStyles()

    // Handle input change
    this._input.addEventListener("input", () => {
      this._value = this._input.value
      this._notifyOutputChanged()
    })

    // Append elements
    this._inputWrapper.appendChild(this._label)
    this._inputWrapper.appendChild(this._input)
    this._container.appendChild(this._inputWrapper)
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    const newLabelText = context.parameters.LabelText.raw || "Label"
    if (this._label.textContent !== newLabelText) {
      this._label.textContent = newLabelText
    }

    const newInputType = context.parameters.inputType.raw || "text"
    if (this._inputType !== newInputType) {
      this._inputType = newInputType
      this._input.type = this._inputType
    }

    let shouldUpdateStyles = false

    const newTextFontSize = context.parameters.textFontSize.raw
      ? `${context.parameters.textFontSize.raw}px`
      : "16px"
    if (this._textFontSize !== newTextFontSize) {
      this._textFontSize = newTextFontSize
      shouldUpdateStyles = true
    }

    // Update label font size
    const newLabelFontSize = context.parameters.labelFontSize.raw
      ? `${context.parameters.labelFontSize.raw}px`
      : "16px"
    if (this._labelFontSize !== newLabelFontSize) {
      this._labelFontSize = newLabelFontSize
      shouldUpdateStyles = true
    }

    const newTextColor = context.parameters.textColor.raw || "#000"
    if (this._textColor !== newTextColor) {
      this._textColor = newTextColor
      shouldUpdateStyles = true
    }

    const newBackgroundColor =
      context.parameters.backgroundColor.raw || "transparent"
    if (this._backgroundColor !== newBackgroundColor) {
      this._backgroundColor = newBackgroundColor
      shouldUpdateStyles = true
    }

    const newBorderColor = context.parameters.borderColor.raw || "#ccc"
    if (this._borderColor !== newBorderColor) {
      this._borderColor = newBorderColor
      shouldUpdateStyles = true
    }

    const newBorderRadius = context.parameters.borderRadius.raw
      ? `${context.parameters.borderRadius.raw}px`
      : "8px"
    if (this._borderRadius !== newBorderRadius) {
      this._borderRadius = newBorderRadius
      shouldUpdateStyles = true
    }

    const newPadding = context.parameters.padding.raw
      ? `${context.parameters.padding.raw}px`
      : "16px"
    if (this._padding !== newPadding) {
      this._padding = newPadding
      shouldUpdateStyles = true
    }

    const newLabelColor = context.parameters.labelColor.raw || "#888"
    if (this._labelColor !== newLabelColor) {
      this._labelColor = newLabelColor
      shouldUpdateStyles = true
    }

    const newFocusBorderColor =
      context.parameters.focusBorderColor.raw || "#4b39ef"
    if (this._focusBorderColor !== newFocusBorderColor) {
      this._focusBorderColor = newFocusBorderColor
      shouldUpdateStyles = true
    }

    if (shouldUpdateStyles) {
      this.applyStyles()
    }
  }

  public getOutputs(): IOutputs {
    return { inputValue: this._value }
  }

  public destroy(): void {
    this._input.remove()
  }

  private applyStyles(): void {
    this._input.style.color = this._textColor
    this._input.style.fontSize = this._textFontSize
    this._input.style.borderColor = this._borderColor
    this._input.style.backgroundColor = this._backgroundColor
    this._input.style.borderRadius = this._borderRadius
    this._input.style.padding = this._padding

    // Apply label styles separately
    this._label.style.color = this._labelColor
    this._label.style.fontSize = this._labelFontSize
  }
}
