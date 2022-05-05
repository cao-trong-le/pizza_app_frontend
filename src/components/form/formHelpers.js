import React from "react"

class FormHelpers {
    constructor() {
        this.defaultNames = []
    }

    renderOptionList = (
        optionsList,
        inputType,
        commonName,
        sectionName,
        defaultNames = null,
        eventHandler = null) => {

        if (defaultNames !== null)
            this.defaultNames = [...defaultNames]

        return optionsList.map((option, index) => {
            return (
                <React.Fragment key={index}>
                    <input
                        key={index}
                        data-option-name={option.name}
                        type={inputType}
                        name={inputType === "checkbox" ? option.name : commonName}
                        id={index}
                        defaultChecked={(() => {
                            if (this.defaultNames.indexOf(sectionName) !== -1)
                                return option.default
                            else
                                return false
                        })()}
                        onClick={((e) => { eventHandler(inputType, sectionName, e) })}
                    />
                    <label for={option.name}>{option.display}</label>
                </React.Fragment>
            )
        })
    }

    renderImage = (
        inputImgName,
        eventHandler,
        cancelHandler,
        image = null) => {
        return (
            <React.Fragment>
                <input
                    type="file"
                    name={inputImgName}
                    id={inputImgName}
                    onChange={eventHandler}
                />
                <div className="preview-section">
                    {image !== null && <img src={(() => {
                        if (image !== null)
                            return URL.createObjectURL(image)
                        else
                            return ""
                    })()} alt={inputImgName} />}
                </div>
                {image !== null && <input
                    type="button"
                    value="Clear"
                    data-id={inputImgName}
                    onClick={(e) => { cancelHandler(e) }} />}
            </React.Fragment>
        )
    }
}

export { FormHelpers }