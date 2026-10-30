import theme_color from "../../data/theme-color-data.json"
import {CHANGE_COLOR} from "./themeColorType"

export const changeColor = (colors, id) => {
    return {
        type: CHANGE_COLOR,
        colorPalette: colors,
        id: id
    }
}

export const setColor = (colorId) => {
    const data = theme_color.filter(color => color.id === colorId)
    const colorPalette = {background: data[0].background, text: data[0].text}
    localStorage.setItem("colorPalette", JSON.stringify(colorPalette));
    return (dispatch) => {
        dispatch(changeColor(colorPalette, data[0].id));
    }
} 

