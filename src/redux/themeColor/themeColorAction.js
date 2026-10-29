import theme_color from "../../data/theme-color-data.json"
import CHANGE_COLOR from "./themeColorType"

export const changeColor = (colors, id) => {
    return {
        type: CHANGE_COLOR,
        colorPalette: colors,
        id: id
    }
}

export const setColor = (colorId) => {
    const data = theme_color.filter(color => color.id === colorId)
    return (dispatch) => {
        dispatch(changeColor(
            {background: data.background, text: data.text}, 
            data.id
        ))
    }
} 

