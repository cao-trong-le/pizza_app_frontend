/* eslint-disable no-unused-vars */
/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { BaseFormComponent } from "components/form";

const MultiFuncComponent = (props) => {
    // create later

    const sources = [
        {
            name: "product",
            link: "http://127.0.0.1:8000/product/all/"
        },
        {
            name: "base",
            link: "http://127.0.0.1:8000/product/base/all/"
        }
    ]

    const buttons = {
        refresh: false,
        select: false,
        select_all: false,
        delete: false,
        cancel: false,
    }

    const [fbuttons, setFButtons] = useState(buttons)
    const [dataset, setDataset] = useState([])
    const [selectedMode, setSelectedMode] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [selectAll, setSelectAll] = useState(false)
    const [selectedItems, setSelectedItems] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const [searchedItems, setSearchedItems] = useState([])
    const [edittingItem, setEdittingItem] = useState(null)

    useEffect(() => {
        const idx = identifySectionThroughUrL()
        fetchData(sources[idx].link)
    }, [])

    const identifySectionThroughUrL = () => {
        const section = props.match.params.section
        const findSection = (sec) => sec.name === section
        const idx = sources.findIndex(findSection)
        return idx
    }
    // fetch base data
    const fetchData = (link) => {
        axios
            .get(link)
            .then((res) => {
                console.log(res.data.data.data)
                const return_data = res.data.data.data
                setDataset([...return_data])
                setSearchedItems([...return_data])
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const selectItems = (e) => {
        const id = parseInt(e.target.id)
        const checked = e.target.checked

        // find in searched items

        const item = searchedItems[id]
        const key = findKeyWithACertainSub(item, "code")
        const item_code = item[key]
        const idx = selectedItems.indexOf(item_code)

        if (checked)
            if (idx === -1)
                setSelectedItems([...selectedItems, item_code])

        if (!checked) {
            if (idx !== -1) {
                const copiedItems = [...selectedItems]
                copiedItems.splice(idx, 1)
                setSelectedItems([...copiedItems])
            }
        }
    }

    const selectAllItems = (e) => {
        const data = []
        for (let item of searchedItems) {
            const key = findKeyWithACertainSub(item, "code")
            const item_code = item[key]
            data.push(item_code)
        }

        setSelectedItems([...data])
        setSelectedMode((selectedMode) => {
            if (!selectedMode) return true
        })
    }

    const editItem = (e) => {
        const item = searchedItems[e.target.id]
        console.log("edit mode activate")
        console.log(item)
        setEditMode(true)
        setEdittingItem({ ...item })
    }

    const deleteItem = (e) => {
        console.log(searchedItems[e.target.id])
        const item = searchedItems[e.target.id]
        const key = findKeyWithACertainSub(item, "code")
        const item_code = item[key]
        let url = null
        const section = props.match.params.section
        let request_event = null

        switch (section) {
            case "base":
                request_event = "delete_single_base"
                url = `http://127.0.0.1:8000/product/base/${item_code}/`
                break
            case "product":
                request_event = "delete_single_product"
                url = `http://127.0.0.1:8000/product/${item_code}/`
                break
            default:
                break
        }

        const data = {
            request_event: request_event,
            item_code: item_code
        }
        axios
            .post(url, data)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {

            })


    }

    const deleteItems = (e) => {
        let url = null
        const section = props.match.params.section
        let request_event = null

        switch (section) {
            case "base":
                request_event = "delete_many_bases"
                url = `http://127.0.0.1:8000/product/base/`
                break
            case "product":
                request_event = "delete_many_products"
                url = `http://127.0.0.1:8000/product/`
                break
            default:
                break
        }

        const data = {
            request_event: request_event,
            item_codes: [...selectedItems]
        }
        axios
            .post(url, data)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {

            })
    }

    const deleteAllItems = (e) => {

    }

    const findKeyWithACertainSub = (obj, sub) => {
        const keys = Object.keys(obj)
        const findKey = (key) => key.includes(sub)
        const idx = keys.findIndex(findKey)
        return keys[idx]
    }

    const searchItemsByName = (e) => {
        const key = e.target.value

        setSearchKey(key)

        let foundList = []
        const _found = (item) => (
            item[findKeyWithACertainSub(item, "name")].toLowerCase().includes(key.toLowerCase())
            || item[findKeyWithACertainSub(item, "name")].includes(key)
        )

        for (let item of dataset) {
            if (_found(item))
                foundList.push(item)
        }

        setSearchedItems([...foundList])
    }

    const baseContent = (item) => {
        const renderedContent = [
            {
                name: "base_name",
                display: "Name",
                value: item.base_name
            },
            {
                name: "base_group",
                display: "Group",
                value: item.base_group
            },
            {
                name: "base_type",
                display: "Type",
                value: item.base_type === "" ? "None" : item.base_type
            },
            {
                name: "base_price",
                display: "Price",
                value: item.base_price
            },
            {
                name: "base_medium_only",
                display: "Medium Only",
                value: item.base_medium_only ? "True" : "False"
            },
            {
                name: "base_description",
                display: "Description",
                value: item.base_description === "" ? "None" : item.base_description
            },
            {
                name: "base_note",
                display: "Note",
                value: item.base_note === "" ? "None" : item.base_note
            },
        ]

        return (
            <React.Fragment>
                <div className="base_image">
                    <img src={`http://127.0.0.1:8000${item.base_image}/`} alt="image" />
                </div>

                <div className="base_description">
                    {renderedContent.map((obj, index) => {
                        return (
                            <React.Fragment>
                                <p className="title" key={index}>
                                    <b>{obj.display}</b>
                                </p>
                                <p className="content">
                                    {obj.value}
                                </p>
                            </React.Fragment>
                        )
                    })}
                </div>
            </React.Fragment>
        )
    }

    const productContent = (item) => {
        const renderedContent = [
            {
                name: "base_name",
                display: "Name",
                value: item.base_name
            },
            {
                name: "base_price",
                display: "Price",
                value: item.base_price
            },
            {
                name: "base_medium_only",
                display: "Medium Only",
                value: item.base_medium_only ? "True" : "False"
            },
            {
                name: "base_description",
                display: "Description",
                value: item.base_description === "" ? "None" : item.base_description
            },
            {
                name: "base_note",
                display: "Note",
                value: item.base_note === "" ? "None" : item.base_note
            },
        ]

        return (
            <React.Fragment>
                <div className="base_image">
                    <img src={`http://127.0.0.1:8000${item.base_image}/`} alt="base image" />
                </div>

                <div className="base_description">
                    {renderedContent.map((obj, index) => {
                        return (
                            <React.Fragment>
                                <p className="title" key={index}>
                                    <b>{obj.display}</b>
                                </p>
                                <p className="content">
                                    {obj.value}
                                </p>
                            </React.Fragment>
                        )
                    })}
                </div>
            </React.Fragment>
        )
    }

    const content = () => {
        const section = props.match.params.section
        let renderContent = null

        switch (section) {
            case "base":
                renderContent = baseContent
                break
            case "product":
                renderContent = productContent
                break
            default:
                break
        }

        return renderContent
    }

    const renderContent = () => {
        return searchedItems.map((item, index) => {
            return (
                <ItemWrapper key={index}>
                    {selectedMode &&
                        <input
                            type="checkbox"
                            id={index}
                            data-item-code={(() => {
                                const key = findKeyWithACertainSub(item, "code")
                                const item_code = item[key]
                                return item_code
                            })()}
                            defaultChecked={(() => {
                                const key = findKeyWithACertainSub(item, "code")
                                const item_code = item[key]
                                const idx = selectedItems.indexOf(item_code)
                                if (idx !== -1)
                                    return true
                                else
                                    return false
                            })()}
                            onClick={selectItems} />}

                    {content()(item)}

                    <div className="base_functions">
                        <input
                            className="base_edit"
                            id={index}
                            type="button"
                            value="Edit"
                            onClick={(e) => { editItem(e) }} />
                        <input
                            className="base_delete"
                            id={index}
                            type="button"
                            value="Delete"
                            onClick={(e) => { deleteItem(e) }} />
                    </div>
                </ItemWrapper>
            )
        })
    }

    const excludedButtons = (excludes) => {
        const copieds = { ...fbuttons }
        const keys = Object.keys(copieds)

        if (excludes.length === 0) {
            for (let key of keys)
                copieds[key] = false
        } else {
            for (let key of keys) {
                if (excludes.indexOf(key) !== -1)
                    copieds[key] = false
                else
                    copieds[key] = true
            }
        }

        setFButtons({ ...copieds })
    }

    return (
        <MultiFuncComponentWrapper>
            {console.log(selectedItems)}
            {console.log(fbuttons)}
            {editMode && <EditSectionWrapper>
                <div className="upper">
                    <p className="upper-title"></p>
                    <input
                        className="cancel-edit"
                        type="button"
                        value="Cancel"
                        onClick={() => { setEditMode(false) }} />
                </div>
                <div className="lower">
                    <div className="content">
                        <BaseFormComponent edit={editMode} item={edittingItem} />
                    </div>
                </div>
            </EditSectionWrapper>}

            <h1>Pizza Ingredients</h1>
            <SearchBarWrapper>
                <div className="search-bar">
                    <div className="search-icon-wrapper"></div>
                    <div className="search-input-wrapper">
                        <input
                            type="text"
                            placeholder="..."
                            value={searchKey}
                            onChange={searchItemsByName}
                            className="search-input" />
                    </div>
                </div>

            </SearchBarWrapper>
            <MultiFunctions>
                <input
                    className="refresh"
                    type="button"
                    value="Refresh"
                    disabled={fbuttons["refresh"]}
                    onClick={() => {
                        const idx = identifySectionThroughUrL()
                        const link = sources[idx].link
                        fetchData(link)
                    }} />
                <input
                    className="select"
                    type="button"
                    value="Select"
                    disabled={fbuttons["select"]}
                    onClick={() => {
                        setSelectedMode(!selectedMode)
                        excludedButtons(["delete", "cancel"])
                    }} />
                <input
                    className="select_all"
                    type="button"
                    value="Select All"
                    disabled={fbuttons["select_all"]}
                    onClick={() => {
                        selectAllItems()
                        excludedButtons(["delete", "cancel"])
                    }} />
                {selectedMode && <input
                    className="delete"
                    type="button"
                    value="Delete"
                    disabled={fbuttons["delete"]}
                    onClick={() => {
                        deleteItems()
                        excludedButtons([])
                    }} />}
                {selectedMode && <input
                    className="cancel"
                    type="button"
                    value="Cancel"
                    disabled={fbuttons["cancel"]}
                    onClick={() => {
                        setSelectedItems([])
                        setSelectedMode(false)
                        excludedButtons([])
                    }} />}
            </MultiFunctions>
            <MultiFuncContent>
                {renderContent()}
            </MultiFuncContent>
        </MultiFuncComponentWrapper>
    )
}

export { MultiFuncComponent }

const MultiFuncComponentWrapper = styled.div`
    height: auto;
    width: 100%;
    border: 2px solid firebrick;
`;

const EditSectionWrapper = styled.div``;

const SearchBarWrapper = styled.div``;

const MultiFuncContent = styled.div``;

const MultiFunctions = styled.div``;

const ItemWrapper = styled.div`
    height: auto;
    display: flex;
    flex-direction: row;
    background-color: aqua;
    margin: 5px;

    .base_image {
        img {
            height: 150px;
            width: 150px;
        }
    }
`;



